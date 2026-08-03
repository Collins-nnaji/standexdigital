import { ConsoleAuth } from "@/components/console/ConsoleAuth";
import { StudioSectionPlaceholder } from "@/components/studio/StudioSectionPlaceholder";

export const metadata = {
  title: "Data Hub | Standex Studio",
  description: "Explore datasets, run queries and build charts.",
};

export default function StudioDataPage() {
  return (
    <ConsoleAuth>
      <StudioSectionPlaceholder
        section="data"
        planned={[
          "Upload a CSV or connect a source and preview it instantly",
          "Query and filter data without leaving the workspace",
          "Turn results into charts you can share",
          "Hand findings straight to the AI tools for write-up",
        ]}
      />
    </ConsoleAuth>
  );
}
