import type { Metadata } from "next";
import { BISolutionPage } from "@/components/bi/BISolutionPage";
import { getBISolution } from "@/lib/bi-solutions";

const solution = getBISolution("copilot-studio")!;

export const metadata: Metadata = {
  title: "Microsoft Copilot Studio Consulting | Standex Digital",
  description: solution.description,
};

export default function Page() {
  return <BISolutionPage solution={solution} />;
}
