import { ConsoleAuth } from "@/components/console/ConsoleAuth";
import { StudioCodeLab } from "@/components/studio/StudioCodeLab";

export const metadata = {
  title: "Code Lab | Standex Studio",
  description: "Write and run Python and SQL in the browser, with built-in code review.",
};

export default function StudioCodePage() {
  return (
    <ConsoleAuth>
      <StudioCodeLab />
    </ConsoleAuth>
  );
}
