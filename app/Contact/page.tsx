import Contact from "@/components/standex-ai/Contact";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";

export default function Page() {
  return (
    <div data-site className="flex min-h-[100dvh] flex-col overflow-hidden bg-white">
      <TopNav />
      <main className="relative flex-1 flex flex-col z-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
