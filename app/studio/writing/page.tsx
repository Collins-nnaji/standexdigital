import { Suspense } from "react";
import { ConsoleAuth } from "@/components/console/ConsoleAuth";
import { StudioWritingLab } from "@/components/studio/StudioWritingLab";

export const metadata = {
  title: "Writing Lab | Standex Studio",
  description: "Draft, rewrite and analyse copy, generate from a prompt, and turn text into speech.",
};

export default function StudioWritingPage() {
  return (
    <ConsoleAuth>
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center bg-white p-8 text-sm text-zinc-500">
            Loading writing lab…
          </div>
        }
      >
        <StudioWritingLab />
      </Suspense>
    </ConsoleAuth>
  );
}
