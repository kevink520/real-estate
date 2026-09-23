import { Fragment } from "react";
import Reveal, { Lines } from "@/components/Reveal";
import SectionLabel from "./SectionLabel";
import { steps } from "@/lib/content";

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="border-t border-ink/10 bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="06">How it works</SectionLabel>
          </div>
          <Reveal variant="lines" as="h2">
            <span id="process-title" className="mt-6 block font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.96] font-light">
              <Lines lines={["Three simple steps", <Fragment key="next-move">to <em className="text-shutter">your next move.</em></Fragment>]} />
            </span>
          </Reveal>
        </div>

        <Reveal className="relative mt-20">
          {/* Brass line draws across as the steps enter */}
          <div aria-hidden className="absolute top-[1.75rem] right-[16.66%] left-[16.66%] hidden h-px bg-ink/10 md:block">
            <div className="h-full origin-left scale-x-0 bg-brass transition-transform delay-300 duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] [.is-in_&]:scale-x-100" />
          </div>
          <ol className="grid gap-14 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <li key={s.title} className="relative text-center">
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border border-brass/50 bg-ivory font-display text-2xl text-brass italic">
                  {i + 1}
                </span>
                <h3 className="mt-8 font-display text-[2rem] leading-tight">{s.title}</h3>
                <p className="mx-auto mt-4 max-w-xs leading-relaxed text-stone">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
