import { agent } from "@/lib/content";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory/70">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-10 sm:px-10 lg:px-16">
        <div className="grid gap-12 border-b border-ivory/10 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-5xl leading-none text-ivory">
              Eleanor <em>Hayes</em>
            </p>
            <p className="eyebrow mt-4 text-brass-light">
              {agent.title} · {agent.brokerage}
            </p>
            <a
              href="#contact"
              className="btn-primary mt-10 inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-4 text-sm font-medium text-ink transition-colors hover:text-ivory"
            >
              Schedule a Consultation <span aria-hidden>→</span>
            </a>
          </div>

          <div className="text-sm leading-relaxed lg:col-span-3">
            <p className="eyebrow mb-4 text-ivory/40">Office</p>
            <address className="not-italic">
              {agent.brokerage}
              <br />
              {agent.office[0]}
              <br />
              {agent.office[1]}
            </address>
          </div>

          <div className="text-sm lg:col-span-2">
            <p className="eyebrow mb-4 text-ivory/40">Contact</p>
            <p><a href={agent.phoneHref} className="link-underline pb-0.5 tabular-nums text-ivory">{agent.phone}</a></p>
            <p className="mt-2"><a href={`mailto:${agent.email}`} className="link-underline pb-0.5 break-all text-ivory">{agent.email}</a></p>
          </div>

          <div className="text-sm lg:col-span-2">
            <p className="eyebrow mb-4 text-ivory/40">Follow</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-underline pb-0.5 text-ivory">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-8 pt-10 text-xs leading-relaxed text-ivory/45 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="flex items-start gap-4">
            <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0 fill-none stroke-ivory/60" aria-label="Equal Housing Opportunity">
              <path d="M4 18 20 5l16 13" strokeWidth="2" />
              <path d="M8 16v19h24V16" strokeWidth="2" />
              <path d="M14 22h12M14 27h12" strokeWidth="2.5" />
            </svg>
            <div className="space-y-1">
              <p>{agent.license}</p>
              <p>{agent.brokerageId}</p>
            </div>
          </div>
          <div className="space-y-3">
            <p>
              {agent.brokerage} fully supports the principles of the Fair Housing Act and the Equal
              Opportunity Act. Information deemed reliable but not guaranteed; listing details,
              prices and availability are subject to change. *Rankings based on internal brokerage
              closed-volume data.
            </p>
            <p>
              This is a fictional agent, brokerage and set of listings created for demonstration
              purposes. Any resemblance to real people or properties is coincidental.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-ivory/40">
          <p>© 2026 {agent.brokerage}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li><a href="#" className="link-underline pb-0.5">Privacy Policy</a></li>
            <li><a href="#" className="link-underline pb-0.5">Terms of Use</a></li>
            <li><a href="#" className="link-underline pb-0.5">Accessibility</a></li>
            <li><a href="#" className="link-underline pb-0.5">Fair Housing Notice</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
