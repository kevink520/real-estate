"use client";

import { startTransition, useActionState, useEffect, useState, type FormEvent } from "react";
import { requestConsultation, type ConsultationState, type Intent } from "@/app/actions";

export const INTENT_EVENT = "consultation:intent";

const intents: { value: Intent; label: string }[] = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "both", label: "Both" },
];

const initialState: ConsultationState = { status: "idle" };

const field =
  "peer w-full border-0 border-b border-ivory/25 bg-transparent px-0 pt-6 pb-3 text-[1.05rem] text-ivory placeholder-transparent outline-none transition-colors focus:border-brass-light";
const label =
  "pointer-events-none absolute left-0 top-6 origin-left text-[1.05rem] text-ivory/55 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-[0.18em] peer-focus:uppercase peer-focus:text-brass-light peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:uppercase";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(requestConsultation, initialState);
  const [intent, setIntent] = useState<Intent | "">("");

  // Dispatch manually instead of <form action> so React doesn't reset the fields
  // after a validation error.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  };

  useEffect(() => {
    const onIntent = (e: Event) => setIntent((e as CustomEvent<Intent>).detail);
    window.addEventListener(INTENT_EVENT, onIntent);
    return () => window.removeEventListener(INTENT_EVENT, onIntent);
  }, []);

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col justify-center">
        <p className="eyebrow mb-5 text-brass-light">Request received</p>
        <p className="font-display text-5xl leading-[1.02] font-light text-ivory">
          Thank you, {state.firstName}.
        </p>
        <p className="mt-6 max-w-sm leading-relaxed text-ivory/75">
          I&rsquo;ll be in touch within one business day to find a time that suits you.
          In the meantime, feel free to call me directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-4 text-ivory/60">I&rsquo;m interested in</legend>
        <div className="grid grid-cols-3 rounded-full border border-ivory/20 p-1">
          {intents.map((opt) => (
            <label key={opt.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="intent"
                value={opt.value}
                checked={intent === opt.value}
                onChange={() => setIntent(opt.value)}
                className="peer sr-only"
              />
              <span className="block rounded-full py-2.5 text-center text-sm text-ivory/70 transition-colors duration-300 peer-checked:bg-ivory peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-brass-light hover:text-ivory peer-checked:hover:text-ink">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
        {state.errors?.intent && <p className="mt-2 text-sm text-[#e8b4a0]">{state.errors.intent}</p>}
      </fieldset>

      <div className="relative">
        <input id="name" name="name" autoComplete="name" placeholder="Full name" className={field} aria-invalid={!!state.errors?.name} />
        <label htmlFor="name" className={label}>Full name</label>
        {state.errors?.name && <p className="mt-2 text-sm text-[#e8b4a0]">{state.errors.name}</p>}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative">
          <input id="email" name="email" type="email" autoComplete="email" placeholder="Email" className={field} aria-invalid={!!state.errors?.contact} />
          <label htmlFor="email" className={label}>Email</label>
        </div>
        <div className="relative">
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={field} />
          <label htmlFor="phone" className={label}>Phone</label>
        </div>
      </div>
      {state.errors?.contact && <p className="-mt-5 text-sm text-[#e8b4a0]">{state.errors.contact}</p>}

      <div className="relative">
        <textarea id="message" name="message" rows={3} placeholder="Tell me a little about your plans" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>Tell me a little about your plans (optional)</label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-primary group flex w-full items-center justify-between rounded-full bg-ivory px-7 py-4 text-sm font-medium text-ink transition-colors hover:text-ivory disabled:opacity-70"
      >
        {pending ? "Sending…" : "Schedule a Consultation"}
        <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </button>
      <p className="text-xs leading-relaxed text-ivory/45">
        No obligation, no mailing list. Your details go only to Eleanor.
      </p>
    </form>
  );
}
