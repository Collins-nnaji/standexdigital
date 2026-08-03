import { Suspense } from "react";
import { StudioWritingLab } from "@/components/studio/StudioWritingLab";

// Access is enforced in middleware.ts via a signed HttpOnly session cookie.
export const metadata = {
  title: "Writing Lab | Standex Studio",
  description: "Draft, rewrite and analyse copy, generate from a prompt, and turn text into speech.",
};

export default function StudioWritingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-white p-8 text-sm text-zinc-500">
          Loading writing lab…
        </div>
      }
    >
      <StudioWritingLab />
    </Suspense>
  );
}
