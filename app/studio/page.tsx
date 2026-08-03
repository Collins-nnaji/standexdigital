import { ConsoleAuth } from "@/components/console/ConsoleAuth";
import { StudioLanding } from "@/components/studio/StudioLanding";

export const metadata = {
  title: "Studio | Standex Digital",
  description: "Writing tools, coding environments, code review and data — one workspace.",
};

export default function StudioPage() {
  return (
    <ConsoleAuth>
      <StudioLanding />
    </ConsoleAuth>
  );
}
