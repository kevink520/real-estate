import { Fragment } from "react";
import Image from "next/image";
import Reveal, { Lines } from "@/components/Reveal";
import SectionLabel from "./SectionLabel";
import { neighborhoods } from "@/lib/content";

export default function Neighborhoods() {
  return (
    <section id="neighborhoods" aria-labelledby="hoods-title" className="scroll-mt-16 bg-linen">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="04">Neighborhood Guides</SectionLabel>
            <Reveal variant="lines" as="h2">
              <span id="hoods-title" className="mt-6 block font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.96] font-light">
                <Lines lines={["Know the town", <Fragment key="tour-the-house">before you <em className="text-shutter">tour the house.</em></Fragment>]} />
              </span>
            </Reveal>
          </div>
          <Reveal className="max-w-sm text-stone" delay={150}>
            <p className="leading-relaxed">
              Firsthand notes on schools, commutes, flood zones and the corner bakery — written by
              someone who lives here.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoods.map((n, i) => (
            <Reveal key={n.name} delay={i * 100} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <a href="#contact" className="group block" aria-label={`Request the ${n.name} neighborhood guide`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={n.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,42,0)_55%,rgba(20,27,42,0.7)_100%)]" />
                  <p className="eyebrow absolute bottom-5 left-5 text-ivory">{n.median}</p>
                </div>
                <p className="eyebrow mt-6 text-brass">{n.tagline}</p>
                <h3 className="mt-2 font-display text-[1.9rem] leading-tight">{n.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{n.detail}</p>
                <span className="link-underline mt-5 inline-block pb-1 text-sm">Read the guide →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
