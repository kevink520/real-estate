"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  variant?: "fade" | "image" | "lines";
  delay?: number;
  className?: string;
  children: ReactNode;
  threshold?: number;
};

/** Adds `is-in` once the element scrolls into view; styles live in globals.css. */
export default function Reveal({
  as: Tag = "div",
  variant = "fade",
  delay = 0,
  className = "",
  threshold = 0.18,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const base = variant === "image" ? "reveal-img" : variant === "fade" ? "reveal" : "";
  return (
    <Tag
      ref={ref}
      className={`${base} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** A headline whose lines slide up from a mask. Wrap in <Reveal variant="lines">. */
export function Lines({ lines, stagger = 110 }: { lines: ReactNode[]; stagger?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span style={{ "--delay": `${i * stagger}ms` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </>
  );
}
