import { Suspense } from "react";
import { StudioUnlock } from "@/components/studio/StudioUnlock";

export const metadata = {
  title: "Unlock Studio | Standex Digital",
  robots: { index: false, follow: false },
};

export default function StudioUnlockPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-zinc-950" />}>
      <StudioUnlock />
    </Suspense>
  );
}
