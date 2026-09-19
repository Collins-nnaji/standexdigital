import { redirect } from "next/navigation";

export const metadata = {
  title: "Code Lab | Standex Studio",
  robots: { index: false, follow: false },
};

export default function StudioCodePage() {
  redirect("/studio/writing");
}
