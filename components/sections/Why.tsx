import Reveal, { Lines } from "@/components/Reveal";
import SectionLabel from "./SectionLabel";
import { advantages } from "@/lib/content";

export default function Why() {
  return (
    <section aria-labelledby="why-title" className="bg-shutter text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="02" tone="light">Why work with Eleanor</SectionLabel>
            <Reveal variant="lines" as="h2">
              <span id="why-title" className="mt-6 block font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] font-light">
                <Lines lines={["Local knowledge,", "personal attention,", <em key="e" className="text-brass-light">beautiful work.</em>]} />
              </span>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-8 max-w-sm leading-relaxed text-ivory/70">
                I keep a deliberately small client list so every buyer and seller receives the
                same care I&rsquo;d want for my own family.
              </p>
            </Reveal>
          </div>

          <ol className="divide-y divide-ivory/15 border-y border-ivory/15">
            {advantages.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 80} className="group grid gap-6 py-10 sm:grid-cols-[5rem_1fr] md:py-12">
                <span className="font-display text-5xl leading-none font-light text-brass-light/80 italic transition-colors duration-500 group-hover:text-brass-light">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[2.1rem] leading-tight">{a.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-ivory/75">{a.body}</p>
                  <p className="mt-6 flex max-w-xl gap-3 text-sm leading-relaxed">
                    <span className="eyebrow shrink-0 pt-0.5 text-brass-light">You receive</span>
                    <span className="text-ivory/90">{a.receive}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
