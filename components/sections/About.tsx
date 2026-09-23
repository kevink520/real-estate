import { Fragment } from "react";
import Image from "next/image";
import Parallax from "@/components/Parallax";
import Reveal, { Lines } from "@/components/Reveal";
import SectionLabel from "./SectionLabel";
import { agent } from "@/lib/content";

const areas = ["Marblehead", "Salem", "Beverly Farms", "Manchester-by-the-Sea", "Swampscott", "Hamilton & Wenham"];
const specialties = ["Historic & antique homes", "Waterfront property", "Relocation to the North Shore", "Downsizing & estate sales"];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 bg-ivory">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="relative lg:col-span-5">
          <Reveal variant="image" className="relative aspect-[4/5]">
            <Parallax speed={0.08} className="absolute inset-0">
              <Image
                src="/images/eleanor-hayes-portrait.webp"
                alt="Eleanor Hayes standing in front of a shingled cottage with hydrangeas"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </Parallax>
          </Reveal>
          <p className="mt-4 flex justify-between text-xs text-stone">
            <span>Eleanor on Marblehead Neck</span>
            <span>{agent.license}</span>
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionLabel index="03">Meet Eleanor</SectionLabel>
          <Reveal variant="lines" as="h2">
            <span id="about-title" className="mt-6 block font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] font-light">
              <Lines lines={["I grew up four streets", <Fragment key="harbor">from the <em className="text-shutter">harbor.</em></Fragment>]} />
            </span>
          </Reveal>

          <Reveal delay={200} className="mt-10 space-y-5 text-[1.06rem] leading-relaxed text-ink/80">
            <p>
              I&rsquo;m Eleanor Hayes — a Marblehead native, a former architectural historian, and
              for the last nineteen years, a real estate advisor to families across the North Shore.
            </p>
            <p>
              My background means I can tell you whether that &ldquo;original&rdquo; wide-pine floor is
              1790 or 1990, what the historic commission will approve, and how to present an old house
              so buyers fall for its character rather than worry about its age. When I&rsquo;m not
              showing homes you&rsquo;ll find me sailing out of Little Harbor or walking our spaniel,
              Pip, along Devereux Beach.
            </p>
          </Reveal>

          <p className="mt-8 font-display text-4xl text-shutter italic" aria-hidden>
            Eleanor
          </p>

          <div className="mt-12 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-2">
            <Reveal>
              <h3 className="eyebrow text-stone">Areas served</h3>
              <ul className="mt-4 space-y-2">
                {areas.map((a) => (
                  <li key={a} className="font-display text-xl">{a}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="eyebrow text-stone">Specialties</h3>
              <ul className="mt-4 space-y-2">
                {specialties.map((s) => (
                  <li key={s} className="flex items-baseline gap-3 font-display text-xl">
                    <span className="h-1 w-1 translate-y-[-0.3em] rounded-full bg-brass" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-ivory"
            >
              Schedule a Consultation <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
