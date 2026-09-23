export default function SectionLabel({
  index,
  children,
  tone = "dark",
}: {
  index: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${tone === "dark" ? "text-stone" : "text-ivory/60"}`}>
      <span className={`font-display text-lg tracking-normal normal-case italic ${tone === "dark" ? "text-brass" : "text-brass-light"}`}>
        {index}
      </span>
      <span className={`h-px w-10 ${tone === "dark" ? "bg-brass/60" : "bg-brass-light/60"}`} />
      {children}
    </p>
  );
}
