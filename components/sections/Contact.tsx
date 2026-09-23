import { Fragment } from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Reveal, { Lines } from "@/components/Reveal";
import SectionLabel from "./SectionLabel";
import { agent } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-0 overflow-hidden bg-dusk text-ivory">
      <Image
        src="/images/colonial-dusk.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_40%] opacity-60"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,27,42,0.35)_0%,rgba(20,27,42,0.7)_55%,rgba(20,27,42,0.92)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,42,0.6)_0%,transparent_30%,transparent_70%,rgba(20,27,42,0.8)_100%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-6 py-28 sm:px-10 md:py-36 lg:grid-cols-12 lg:px-16">
        <div className="flex flex-col justify-between gap-12 lg:col-span-6">
          <div>
            <SectionLabel index="07" tone="light">Get in touch</SectionLabel>
            <Reveal variant="lines" as="h2">
              <span id="contact-title" className="mt-6 block font-display text-[clamp(3rem,6.4vw,6rem)] leading-[0.94] font-light">
                <Lines lines={["Let’s talk about", <Fragment key="next-move">your <em className="text-brass-light">next move.</em></Fragment>]} />
              </span>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ivory/80">
                Whether you&rsquo;re a year out or ready this month, a short conversation is the best
                place to start. There&rsquo;s never any pressure — just honest advice.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300} className="grid gap-8 text-sm sm:grid-cols-2">
            <div>
              <p className="eyebrow text-ivory/50">Call or text</p>
              <a href={agent.phoneHref} className="link-underline mt-2 inline-block pb-1 font-display text-2xl tabular-nums">
                {agent.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow text-ivory/50">Email</p>
              <a href={`mailto:${agent.email}`} className="link-underline mt-2 inline-block pb-1 font-display text-2xl">
                {agent.email}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
          <div className="border border-ivory/15 bg-dusk/55 p-7 backdrop-blur-md sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
