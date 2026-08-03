import { redirect } from "next/navigation";

/** The console is now the Studio hub's Writing Lab tab. */
export default function ConsolePage() {
  redirect("/studio/writing");
}
