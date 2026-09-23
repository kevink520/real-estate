import { Fragment } from "react";
import Image from "next/image";
import Reveal, { Lines } from "@/components/Reveal";
import SectionLabel from "./SectionLabel";
import { testimonials } from "@/lib/content";

export default function Stories() {
  const [feature, ...rest] = testimonials;
  return (
    <section id="stories" aria-labelledby="stories-title" className="scroll-mt-16 bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <SectionLabel index="05">Client Stories</SectionLabel>
        <Reveal variant="lines" as="h2">
          <span id="stories-title" className="mt-6 block font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.96] font-light">
            <Lines lines={["Every move", <Fragment key="story">has a <em className="text-shutter">story.</em></Fragment>]} />
          </span>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal as="figure" className="relative overflow-hidden bg-dusk text-ivory lg:col-span-7">
            <div className="absolute inset-0 opacity-60">
              <Image src="/images/tour-garden-seed.webp" alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </div>
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,27,42,0.9)_15%,rgba(20,27,42,0.35)_100%)]" />
            <div className="relative flex h-full flex-col justify-between gap-16 p-8 sm:p-12 lg:p-14">
              <span className="font-display text-[7rem] leading-[0.6] text-brass-light" aria-hidden>&ldquo;</span>
              <blockquote className="font-display text-[clamp(1.6rem,2.5vw,2.3rem)] leading-[1.22] font-light">
                {feature.quote}
              </blockquote>
              <figcaption className="flex items-center justify-between gap-4 border-t border-ivory/20 pt-6 text-sm">
                <span className="font-medium">{feature.name}</span>
                <span className="eyebrow text-brass-light">{feature.detail}</span>
              </figcaption>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5">
            {rest.map((t, i) => (
              <Reveal as="figure" key={t.name} delay={120 + i * 120} className="flex flex-1 flex-col justify-between border-t border-ink/15 pt-8">
                <blockquote className="font-display text-[1.55rem] leading-[1.3] font-light text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="eyebrow text-brass">{t.detail}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
