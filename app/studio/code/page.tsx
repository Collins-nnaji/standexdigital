import { StudioCodeLab } from "@/components/studio/StudioCodeLab";

// Access is enforced in middleware.ts via a signed HttpOnly session cookie.
export const metadata = {
  title: "Code Lab | Standex Studio",
  description: "Write and run Python and SQL in the browser, with built-in code review.",
};

export default function StudioCodePage() {
  return <StudioCodeLab />;
}
