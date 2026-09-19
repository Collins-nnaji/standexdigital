import { StudioLanding } from "@/components/studio/StudioLanding";

// Access is enforced in middleware.ts via a signed HttpOnly session cookie.
export const metadata = {
  title: "Studio | Standex Digital",
  description: "Marketing intelligence, creative reviews, writing tools, coding and data — one workspace.",
};

export default function StudioPage() {
  return <StudioLanding />;
}
