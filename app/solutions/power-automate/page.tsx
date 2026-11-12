import type { Metadata } from "next";
import { BISolutionPage } from "@/components/bi/BISolutionPage";
import { getBISolution } from "@/lib/bi-solutions";

const solution = getBISolution("power-automate")!;

export const metadata: Metadata = {
  title: `Microsoft ${solution.title} Consulting | Standex Digital`,
  description: solution.description,
};

export default function Page() {
  return <BISolutionPage solution={solution} />;
}
