"use client";

import { useEffect, useState } from "react";
import { agent } from "@/lib/content";

const links = [
  { href: "#homes", label: "Homes" },
  { href: "#about", label: "About" },
  { href: "#neighborhoods", label: "Neighborhoods" },
  { href: "#stories", label: "Stories" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tour = document.getElementById("tour");
    const onScroll = () => {
      const bottom = tour ? tour.getBoundingClientRect().bottom : 0;
      setSolid(bottom <= 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = !solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-700 ${
        solid && !open ? "border-b border-ink/10 bg-ivory/90 text-ink backdrop-blur-xl" : "border-b border-transparent"
      } ${light ? "text-ivory" : "text-ink"}`}
    >
      <nav className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <a href="#top" className="group flex items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="font-display text-[1.6rem] leading-none tracking-tight">
            Eleanor <em className="font-normal">Hayes</em>
          </span>
          <span className="eyebrow hidden opacity-70 md:inline">{agent.brokerage}</span>
        </a>

        <ul className="hidden items-center gap-9 text-sm lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline pb-1 opacity-90 hover:opacity-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <a href={agent.phoneHref} className="link-underline hidden pb-1 text-sm tabular-nums md:inline">
            {agent.phone}
          </a>
          <a
            href="#contact"
            className={`btn-primary hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:inline-flex ${
              light ? "bg-ivory text-ink hover:text-ivory" : "bg-ink text-ivory"
            }`}
          >
            Schedule a Consultation
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="relative h-10 w-10 lg:hidden"
          >
            <span
              className={`absolute left-2 right-2 h-px bg-current transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-[16px]"}`}
            />
            <span
              className={`absolute left-2 right-2 h-px bg-current transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "top-[24px]"}`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 top-18 -z-10 bg-ivory px-6 pt-10 transition-[opacity,visibility] duration-500 sm:px-10 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
            <li key={l.href} className="border-b border-ink/10">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 font-display text-4xl font-light"
              >
                {l.label}
                <span className="eyebrow text-stone">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-10 flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-sm font-medium text-ivory"
        >
          Schedule a Consultation
        </a>
        <p className="mt-6 text-center text-sm text-stone">
          or call <a href={agent.phoneHref} className="text-ink underline underline-offset-4">{agent.phone}</a>
        </p>
      </div>
    </header>
  );
}
