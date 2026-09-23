"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { tourChapters } from "@/lib/content";

const FRAME_COUNT = 286;
const FRAME_CACHE_LIMIT = 48;
const frameSrc = (set: "desktop" | "mobile", i: number) =>
  `/frames/${set}/f_${String(i + 1).padStart(4, "0")}.webp`;

// Share of the section's scroll spent scrubbing video (rest is a short hold on the garden).
const SCRUB_END = 0.94;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
// 0 → 1 → 0 window around `center`, with soft edges
function windowed(p: number, center: number, half = 0.075, fade = 0.035) {
  const d = Math.abs(p - center);
  return clamp(1 - (d - (half - fade)) / fade);
}

export default function ScrollTour() {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const set: "desktop" | "mobile" = window.matchMedia("(max-width: 767px)").matches
      ? "mobile"
      : "desktop";
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let cancelled = false;

    // Keep nearby full-resolution frames plus coarse fallbacks for large jumps.
    // Retaining all 286 decoded 1080p frames would take roughly 2.2 GiB.
    const anchors = new Set<number>([FRAME_COUNT - 1]);
    for (let i = 0; i < FRAME_COUNT; i += 16) anchors.add(i);
    const pending = new Map<number, HTMLImageElement>();
    const failed = new Set<number>();
    let focus = -1;
    let order: number[] = [];
    const trimCache = () => {
      const loaded = frames.flatMap((img, i) => img ? [i] : []);
      const removable = loaded.filter((i) => !anchors.has(i))
        .sort((a, b) => Math.abs(b - focus) - Math.abs(a - focus));
      for (let n = loaded.length - FRAME_CACHE_LIMIT; n > 0; n--) {
        frames[removable.shift()!] = null;
      }
    };
    const loadNext = () => {
      if (cancelled) return;
      while (pending.size < 6) {
        const i = order.find((index) => !frames[index] && !pending.has(index) && !failed.has(index));
        if (i === undefined) return;
        const img = new window.Image();
        img.decoding = "async";
        pending.set(i, img);
        img.onload = () => {
          pending.delete(i);
          if (cancelled) return;
          frames[i] = img;
          trimCache();
          needsDraw = true;
          loadNext();
        };
        img.onerror = () => {
          pending.delete(i);
          failed.add(i);
          loadNext();
        };
        img.src = frameSrc(set, i);
      }
    };
    const requestFrames = (center: number) => {
      if (center === focus) return;
      focus = center;
      const wanted = new Set<number>([center]);
      for (let d = 1; d <= 12; d++) {
        if (center + d < FRAME_COUNT) wanted.add(center + d);
        if (center - d >= 0) wanted.add(center - d);
      }
      for (const i of anchors) wanted.add(i);
      order = [...wanted];
      loadNext();
    };

    const nearestLoaded = (i: number) => {
      if (frames[i]) return frames[i];
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    };

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = "high";
      needsDraw = true;
    };

    const draw = (img: HTMLImageElement, zoom: number) => {
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight) * zoom;
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
    };

    let target = 0;
    let smooth = 0;
    let currentFrame = -1;
    let needsDraw = true;
    let raf = 0;

    const readScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      target = clamp(-rect.top / Math.max(total, 1));
    };

    const tick = () => {
      smooth += (target - smooth) * 0.12;
      if (Math.abs(target - smooth) < 0.0002) smooth = target;
      const p = smooth;

      const frame = Math.round(clamp(p / SCRUB_END) * (FRAME_COUNT - 1));
      requestFrames(frame);
      if (frame !== currentFrame || needsDraw) {
        const img = nearestLoaded(frame);
        if (img) {
          // A gentle push-in during the final hold keeps the garden alive.
          const zoom = 1 + clamp((p - SCRUB_END) / (1 - SCRUB_END)) * 0.04;
          draw(img, zoom);
          currentFrame = frame;
          needsDraw = !frames[frame];
        }
      }

      if (introRef.current) {
        const o = 1 - clamp((p - 0.02) / 0.07);
        introRef.current.style.opacity = String(o);
        introRef.current.style.transform = `translate3d(0, ${(1 - o) * -40}px, 0)`;
        introRef.current.style.visibility = o <= 0 ? "hidden" : "visible";
      }
      chapterRefs.current.forEach((el, idx) => {
        if (!el) return;
        const o = windowed(p, tourChapters[idx].at);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 24}px, 0)`;
        el.style.visibility = o <= 0 ? "hidden" : "visible";
      });
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      if (shadeRef.current) {
        // Heavier shade under the intro headline, lighter while touring rooms.
        shadeRef.current.style.opacity = String(0.55 + (1 - clamp(p / 0.1)) * 0.45);
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    readScroll();
    smooth = target;
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", readScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      for (const img of pending.values()) {
        img.onload = null;
        img.onerror = null;
        img.removeAttribute("src");
      }
      pending.clear();
      frames.fill(null);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="tour"
      aria-label="Introduction and a scroll-guided tour of a North Shore colonial"
      className={`relative bg-ink ${reducedMotion ? "h-svh" : "h-[640vh]"}`}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Poster doubles as LCP image and reduced-motion fallback */}
        <Image
          src="/frames/poster.webp"
          alt="A cream center-hall colonial with green shutters at golden hour"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        {!reducedMotion && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />}

        {/* Legibility shades */}
        <div
          ref={shadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,42,0.55)_0%,rgba(20,27,42,0)_28%,rgba(20,27,42,0)_45%,rgba(20,27,42,0.75)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,27,42,0.5)_0%,rgba(20,27,42,0.15)_45%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_55%,rgba(10,12,14,0.45)_100%)]"
        />

        {/* Intro */}
        <div
          ref={introRef}
          className="[text-shadow:0_1px_24px_rgba(10,12,20,0.3)] absolute inset-x-0 bottom-0 px-6 pb-16 sm:px-10 md:pb-20 lg:px-16"
        >
          <div className="mx-auto grid max-w-[1400px] items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="eyebrow rise mb-6 flex items-center gap-3 text-brass-light" style={{ ["--delay" as string]: "200ms" }}>
                <span className="h-px w-10 bg-brass-light" />
                Eleanor Hayes · North Shore, Massachusetts
              </p>
              <h1 className="font-display text-[clamp(2.9rem,7.4vw,7.2rem)] leading-[0.92] font-light tracking-[-0.02em] text-ivory">
                <span className="rise block" style={{ ["--delay" as string]: "350ms" }}>
                  Buy and sell
                </span>
                <span className="rise block" style={{ ["--delay" as string]: "500ms" }}>
                  with <em className="font-normal text-brass-light">confidence</em>
                </span>
                <span className="rise block" style={{ ["--delay" as string]: "650ms" }}>
                  on the North Shore.
                </span>
              </h1>
            </div>
            <div className="rise max-w-md lg:pb-3" style={{ ["--delay" as string]: "850ms" }}>
              <p className="text-[1.05rem] leading-relaxed text-ivory/85">
                For nineteen years I&rsquo;ve helped families find — and part with — the
                homes of Marblehead, Salem, Beverly Farms and Manchester-by-the-Sea. Honest
                advice, beautiful marketing, and a steady hand from first call to closing.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#contact"
                  className="btn-primary inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-4 text-sm font-medium text-ink transition-colors hover:text-ivory"
                >
                  Schedule a Consultation
                  <span aria-hidden>→</span>
                </a>
                <a href="#homes" className="link-underline pb-1 text-sm text-ivory/90">
                  View featured homes
                </a>
              </div>
            </div>
          </div>
          {!reducedMotion && (
            <div className="mx-auto mt-14 flex max-w-[1400px] items-center gap-4 text-ivory/70">
              <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
                <span className="scroll-cue absolute inset-0 bg-ivory" />
              </span>
              <span className="eyebrow">Scroll to step inside</span>
            </div>
          )}
        </div>

        {/* Room chapters */}
        {!reducedMotion &&
          tourChapters.map((c, i) => (
            <div
              key={c.eyebrow}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className="invisible absolute inset-x-0 bottom-0 px-6 pb-24 opacity-0 [text-shadow:0_1px_24px_rgba(10,12,20,0.35)] sm:px-10 lg:px-16"
            >
              <div className="mx-auto max-w-[1400px]">
                <div className="max-w-xl">
                  <p className="eyebrow mb-4 flex items-center gap-3 text-brass-light">
                    <span className="font-display text-base tracking-normal normal-case italic">
                      0{i + 1}
                    </span>
                    <span className="h-px w-8 bg-brass-light/70" />
                    {c.eyebrow}
                  </p>
                  <h2 className="font-display text-[clamp(2.1rem,4.6vw,4.1rem)] leading-[1] font-light text-ivory">
                    {c.title}
                  </h2>
                  <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ivory/85">{c.body}</p>
                </div>
              </div>
            </div>
          ))}

        {/* Progress rail */}
        {!reducedMotion && (
          <div className="absolute inset-x-6 bottom-8 sm:inset-x-10 lg:inset-x-16">
            <div className="mx-auto max-w-[1400px]">
              <div className="relative h-px w-full bg-ivory/20">
                <div ref={progressRef} className="absolute inset-0 origin-left bg-brass-light"
                  style={{ transform: "scaleX(0)" }} />
                {/*tourChapters.map((c) => (
                  <span
                    key={c.eyebrow}
                    className="absolute top-1/2 hidden h-1.5 w-1.5 -translate-1/2 rounded-full bg-ivory/60 sm:block"
                    style={{ left: `${c.at * 100}%` }}
                  />
                ))*/}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
