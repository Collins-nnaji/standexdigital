import type { Metadata } from "next";
import { BISolutionPage } from "@/components/bi/BISolutionPage";
import { getBISolution } from "@/lib/bi-solutions";

const solution = getBISolution("salesforce")!;

export const metadata: Metadata = {
  title: "Salesforce Consulting, Implementation & Integration | Standex Digital",
  description: solution.description,
};

export default function Page() {
  return <BISolutionPage solution={solution} />;
}
