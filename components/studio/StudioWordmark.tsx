import { cn } from "@/lib/utils";

/** Wordmark that follows the StandexAI logo: ink for Standex, brand gradient for Studio. */
export function StudioWordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-bold tracking-tight",
        compact ? "text-[15px] sm:text-[17px]" : "text-[17px] sm:text-[19px]",
        className,
      )}
    >
      <span>Standex</span>
      <span className="landing-text-brand-gradient ml-[0.18em]">Studio</span>
    </span>
  );
}
