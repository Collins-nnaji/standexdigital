import { redirect } from "next/navigation";

export const metadata = {
  title: "Studio | Standex Digital",
  description: "Writing Lab — draft, rewrite and polish copy.",
};

export default function StudioPage() {
  redirect("/studio/writing");
}
