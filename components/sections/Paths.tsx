import Image from "next/image";
import IntentLink from "@/components/IntentLink";
import Reveal from "@/components/Reveal";

const paths = [
  {
    intent: "buying" as const,
    kicker: "For buyers",
    title: "Find Your Next Home",
    body: "Early access to homes before they're listed, candid notes on every street, and an offer strategy that wins without overpaying.",
    cta: "Start your search",
    image: "/images/colonial-interior.webp",
    alt: "Sunlit foyer opening into a living room with a fireplace",
  },
  {
    intent: "selling" as const,
    kicker: "For sellers",
    title: "Discover Your Home's Value",
    body: "A thoughtful, data-backed valuation within 48 hours — plus the three improvements most likely to raise your sale price.",
    cta: "Request a valuation",
    image: "/images/colonial-dusk.webp",
    alt: "Colonial home glowing with warm light at dusk",
  },
];

export default function Paths() {
  return (
    <section aria-label="Buying and selling" className="bg-ivory">
      <div className="mx-auto grid max-w-[1400px] gap-5 px-6 py-20 sm:px-10 md:grid-cols-2 md:py-28 lg:px-16">
        {paths.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <IntentLink
              intent={p.intent}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2px] p-8 text-ivory sm:aspect-[5/6] md:p-10 lg:aspect-[4/4.4]"
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,42,0)_25%,rgba(20,27,42,0.35)_55%,rgba(20,27,42,0.88)_100%)]" />
              <div className="relative">
                <p className="eyebrow mb-4 text-brass-light">{p.kicker}</p>
                <h2 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.98] font-light">{p.title}</h2>
                <p className="mt-4 max-w-sm leading-relaxed text-ivory/80">{p.body}</p>
                <span className="mt-8 inline-flex items-center gap-4 text-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:border-ivory group-hover:bg-ivory group-hover:text-ink">
                    →
                  </span>
                  {p.cta}
                </span>
              </div>
            </IntentLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
