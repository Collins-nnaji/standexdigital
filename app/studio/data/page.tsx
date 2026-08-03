import { StudioSectionPlaceholder } from "@/components/studio/StudioSectionPlaceholder";

// Access is enforced in middleware.ts via a signed HttpOnly session cookie.
export const metadata = {
  title: "Data Hub | Standex Studio",
  description: "Explore datasets, run queries and build charts.",
};

export default function StudioDataPage() {
  return (
    <StudioSectionPlaceholder
      section="data"
      planned={[
        "Upload a CSV or connect a source and preview it instantly",
        "Query and filter data without leaving the workspace",
        "Turn results into charts you can share",
        "Hand findings straight to the AI tools for write-up",
      ]}
    />
  );
}
