import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Layout primitives for the public marketing site (light theme).      */
/* ------------------------------------------------------------------ */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  tone?: "white" | "muted" | "mint" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    white: "bg-white text-zinc-950",
    muted: "bg-zinc-50 text-zinc-950 border-y border-zinc-100",
    mint: "bg-emerald-50/60 text-zinc-950 border-y border-emerald-100/70",
    dark: "bg-zinc-950 text-white",
  } as const;
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-24", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700", className)}>
      <span className="h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cn(dark && "text-emerald-400", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <h2 className={cn("mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]", dark ? "text-white" : "text-zinc-950")}>{title}</h2>
      {intro && <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-zinc-300" : "text-zinc-600")}>{intro}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "ghost" | "white";
  className?: string;
}) {
  const variants = {
    primary: "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 hover:bg-emerald-700",
    dark: "bg-zinc-950 text-white hover:bg-zinc-800",
    outline: "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50",
    ghost: "text-zinc-900 hover:text-emerald-700",
    white: "bg-white text-zinc-950 hover:bg-emerald-50",
  } as const;
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        variants[variant],
        variant === "ghost" && "min-h-0 px-0",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function CheckList({ items, className, dark = false }: { items: readonly string[]; className?: string; dark?: boolean }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex gap-3 text-[15px] leading-relaxed", dark ? "text-zinc-200" : "text-zinc-700")}>
          <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", dark ? "bg-emerald-400/15 text-emerald-400" : "bg-emerald-100 text-emerald-700")}>
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function IconCard({
  icon: Icon,
  title,
  text,
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <article className={cn("rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-200 hover:shadow-[0_12px_40px_-20px_rgba(16,24,40,0.25)]", className)}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-zinc-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{text}</p>
    </article>
  );
}

export function ProcessSteps({ steps, dark = false }: { steps: readonly { title: string; text: string; duration?: string }[]; dark?: boolean }) {
  return (
    <ol className={cn("grid gap-4 md:grid-cols-2", steps.length === 4 ? "lg:grid-cols-4" : steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-5")}>
      {steps.map((step, index) => (
        <li key={step.title} className={cn("relative rounded-2xl border p-6", dark ? "border-white/10 bg-white/[0.03]" : "border-zinc-200 bg-white")}>
          <div className="flex items-center justify-between">
            <span className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold", dark ? "bg-emerald-400 text-zinc-950" : "bg-zinc-950 text-white")}>{index + 1}</span>
            {step.duration && <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", dark ? "bg-white/10 text-zinc-300" : "bg-emerald-50 text-emerald-800")}>{step.duration}</span>}
          </div>
          <h3 className={cn("mt-5 text-base font-semibold", dark ? "text-white" : "text-zinc-950")}>{step.title}</h3>
          <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-zinc-400" : "text-zinc-600")}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function FAQList({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
      {faqs.map((faq) => (
        <details key={faq.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-base font-semibold text-zinc-950">
            {faq.q}
            <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400 transition group-open:rotate-180 group-open:text-emerald-600" />
          </summary>
          <p className="mt-3 pr-8 text-[15px] leading-relaxed text-zinc-600">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FAQSection({ faqs, title = "Questions we're often asked" }: { faqs: readonly { q: string; a: string }[]; title?: string }) {
  return (
    <Section tone="muted">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="FAQ" title={title} intro="Can't see your question here? We're happy to talk it through on a short call." />
          <ButtonLink href="/Contact" variant="outline" className="mt-8">Ask us directly</ButtonLink>
        </div>
        <FAQList faqs={faqs} />
      </div>
    </Section>
  );
}

export function CTABand({
  eyebrow = "Next step",
  title,
  text,
  primary = { href: "/Contact", label: "Book a consultation" },
  secondary,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow className="text-emerald-400">{eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
              {text && <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">{text}</p>}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href} variant="primary">{primary.label}</ButtonLink>
              {secondary && <ButtonLink href={secondary.href} variant="white">{secondary.label}</ButtonLink>}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-zinc-300">/</span>}
          {item.href ? <Link href={item.href} className="hover:text-emerald-700">{item.label}</Link> : <span className="text-zinc-900">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/** Soft, light hero backdrop: faint grid + green glow. */
export function HeroBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f4_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f4_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[360px] w-[360px] rounded-full bg-sky-100/60 blur-3xl" />
    </>
  );
}
