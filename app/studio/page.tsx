import { StudioLanding } from "@/components/studio/StudioLanding";

// Access is enforced in middleware.ts via a signed HttpOnly session cookie.
export const metadata = {
  title: "Studio | Standex Digital",
  description: "Writing tools, coding environments, code review and data — one workspace.",
};

export default function StudioPage() {
  return <StudioLanding />;
}
