import Image from "next/image";

const PLATFORMS = [
  { name: "Power BI", src: "/PowerBi.svg" },
  { name: "Power Apps", src: "/PowerApps.svg" },
  { name: "Power Automate", src: "/PowerAutomate.svg" },
  { name: "Power Pages", src: "/PowerPages.svg" },
  { name: "Copilot Studio", src: "/CopilotStudio.svg" },
  { name: "Microsoft Fabric", src: "/images/tools/fabric.svg" },
  { name: "Salesforce", src: "/salesforce/crm-icon.svg" },
  { name: "Microsoft Copilot", src: "/images/tools/copilot.svg" },
  { name: "SharePoint", src: "/images/tools/sharepoint.svg" },
  { name: "Teams", src: "/images/tools/teams.svg" },
  { name: "Excel", src: "/images/tools/excel.svg" },
  { name: "Outlook", src: "/images/tools/outlook.svg" },
  { name: "SQL Server", src: "/images/tools/sql.svg" },
  { name: "ChatGPT", src: "/images/tools/chatgpt.svg" },
  { name: "Claude", src: "/images/tools/claude.svg" },
  { name: "Gemini", src: "/images/tools/gemini.svg" },
  { name: "Zapier", src: "/images/tools/zapier.svg" },
  { name: "n8n", src: "/images/tools/n8n.svg" },
];

/** Infinite scrolling strip of platform logos. */
export function PlatformMarquee() {
  const row = (suffix: string, hidden = false) => (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {PLATFORMS.map((p) => (
        <li
          key={p.name + suffix}
          className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm"
        >
          <Image src={p.src} alt={hidden ? "" : p.name} width={24} height={24} className="h-6 w-6 object-contain" unoptimized />
          <span className="whitespace-nowrap text-sm font-semibold text-zinc-700">{p.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="border-y border-zinc-100 bg-white py-6">
      <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
        Built on the platforms your business already runs
      </p>
      <div className="site-marquee overflow-hidden">
        <div className="site-marquee-track flex w-max">
          {row("a")}
          {row("b", true)}
        </div>
      </div>
    </div>
  );
}
