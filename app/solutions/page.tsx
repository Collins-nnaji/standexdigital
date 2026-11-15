import type { Metadata } from "next";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { ButtonLink, CTABand, Container, HeroBackdrop } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { SolutionsExplorer } from "@/components/site/SolutionsExplorer";

export const metadata: Metadata = {
  title: "Solutions | Standex Digital",
  description:
    "AI, Power BI and Fabric, Power Apps, Salesforce, digital marketing and data readiness on one page. Open any offering for details.",
};

export default function SolutionsPage() {
  return (
    <div data-site className="min-h-screen bg-white text-zinc-950">
      <TopNav />
      <main>
        <section className="relative overflow-hidden pb-10 pt-28 sm:pt-32">
          <HeroBackdrop />
          <div className="site-blob pointer-events-none absolute right-1/4 top-20 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
          <Container className="relative max-w-[90rem] lg:px-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                
                Everything we build, in one place
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 text-[1.65rem] font-black leading-[1.1] tracking-tight min-[400px]:text-3xl sm:text-5xl sm:whitespace-nowrap">
                Connected systems.{" "}
                <span className="site-gradient-text bg-gradient-to-r from-emerald-600 via-teal-500 to-violet-500 bg-clip-text text-transparent">
                  Measurable growth.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:whitespace-nowrap sm:text-lg">
                Tap any offering to see what is included, the outcome and the timeline.
              </p>
              
            </Reveal>
          </Container>
        </section>

        <SolutionsExplorer />

        <CTABand
          eyebrow="Not sure where to start?"
          title="Tell us your biggest bottleneck. We will point to the fastest win."
          text="A senior architect will reply within one business day with a recommended starting point."
          primary={{ href: "/contact", label: "Contact Us" }}
          secondary={{ href: "/", label: "Back to home" }}
        />
      </main>
      <Footer />
    </div>
  );
}
