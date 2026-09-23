"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Translates its child vertically as it passes through the viewport. */
export default function Parallax({
  speed = 0.12,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const centerOffset = r.top + r.height / 2 - window.innerHeight / 2;
      inner.style.transform = `translate3d(0, ${centerOffset * -speed}px, 0) scale(${1 + speed})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="h-full w-full will-change-transform">{children}</div>
    </div>
  );
}
