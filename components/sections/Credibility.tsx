import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { agent, stats } from "@/lib/content";

export default function Credibility() {
  return (
    <section aria-label="Experience and reviews" className="relative border-b border-ink/10 bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-1 text-brass" aria-label="Five out of five stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-6 font-display text-[clamp(1.7rem,2.6vw,2.35rem)] leading-[1.18] font-light text-ink">
              &ldquo;Eleanor knew our street better than we did after thirty years on it. She priced it
              right, staged it beautifully, and we closed in <em className="text-shutter">eleven days</em>.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-stone">
              — The Calloway family, sold on Front Street, Marblehead
            </p>
          </Reveal>

          <div className="flex flex-col justify-between gap-12">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-12">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 90} className="flex flex-col-reverse border-t border-ink/15 pt-6">
                  <dt className="mt-3 text-sm text-stone">{s.label}</dt>
                  <dd className="font-display text-[clamp(2.8rem,5vw,4.4rem)] leading-none font-light text-ink">
                    <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                    {s.mark && <span className="ml-2 align-[0.35em] text-[0.4em] text-brass">{s.mark}</span>}
                  </dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={300} className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone">
              <span className="eyebrow text-ink">Affiliated with</span>
              <span className="font-display text-xl text-ink italic">{agent.brokerage}</span>
              <span className="hidden h-4 w-px bg-ink/20 sm:block" />
              <span>Top 1% North Shore agent, 2021–2025*</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
