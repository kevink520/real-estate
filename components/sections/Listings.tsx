import Image from "next/image";
import Reveal, { Lines } from "@/components/Reveal";
import SectionLabel from "./SectionLabel";
import { listings } from "@/lib/content";

const statusStyle: Record<string, string> = {
  "Just Listed": "bg-brass text-ivory",
  "For Sale": "bg-ivory text-ink",
  "Under Contract": "bg-ink/80 text-ivory backdrop-blur",
  "Coming Soon": "bg-shutter text-ivory",
};

export default function Listings() {
  return (
    <section id="homes" aria-labelledby="homes-title" className="scroll-mt-16 bg-linen">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="01">Featured Homes</SectionLabel>
            <Reveal variant="lines" as="h2">
              <span id="homes-title" className="mt-6 block font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.96] font-light">
                <Lines lines={["Currently on", <em key="e" className="text-shutter">my desk.</em>]} />
              </span>
            </Reveal>
          </div>
          <Reveal className="max-w-sm text-stone" delay={150}>
            <p className="leading-relaxed">
              A small, carefully chosen set of homes. Availability updated September 2026 —
              ask me about private and off-market opportunities.
            </p>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-6 mt-16 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:px-0">
          {listings.map((l, i) => {
            // Editorial rhythm: wide, narrow / narrow, wide
            const span = i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5";
            const aspect = "lg:aspect-auto lg:h-[min(36rem,40vw)]";
            return (
              <li key={l.address} className={`w-[82vw] shrink-0 snap-start sm:w-[58vw] lg:w-auto ${span}`}>
                <article className="group">
                  <div className="relative">
                    <Reveal variant="image" delay={(i % 2) * 120} className={`relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] ${aspect}`}>
                      <Image
                        src={l.image}
                        alt={l.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 82vw"
                        className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </Reveal>
                    <span className={`eyebrow absolute top-4 left-4 rounded-full px-3 py-1.5 text-[0.65rem] ${statusStyle[l.status]}`}>
                      {l.status}
                    </span>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6 border-t border-ink/15 pt-5">
                    <div>
                      <h3 className="font-display text-[1.75rem] leading-tight">{l.address}</h3>
                      <p className="mt-1 text-sm text-stone">{l.town}</p>
                    </div>
                    <p className="font-display text-[1.75rem] leading-tight whitespace-nowrap text-shutter [font-variant-numeric:lining-nums]">{l.price}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-stone">
                    <p className="flex gap-4 tabular-nums">
                      <span>{l.beds} bd</span>
                      <span className="text-ink/20">/</span>
                      <span>{l.baths} ba</span>
                      <span className="text-ink/20">/</span>
                      <span>{l.sqft} sq ft</span>
                    </p>
                    <p className="italic">{l.note}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-16 flex justify-center">
          <a href="#contact" className="link-underline pb-1 text-sm">
            Ask about a private showing →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
