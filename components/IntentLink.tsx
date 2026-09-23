"use client";

import type { ReactNode } from "react";
import type { Intent } from "@/app/actions";
import { INTENT_EVENT } from "./ContactForm";

/** Jumps to the contact form and preselects buying/selling. */
export default function IntentLink({
  intent,
  className,
  children,
}: {
  intent: Intent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(INTENT_EVENT, { detail: intent }))}
    >
      {children}
    </a>
  );
}
