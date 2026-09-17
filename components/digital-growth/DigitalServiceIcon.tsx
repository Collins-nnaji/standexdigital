import { BarChart3, Mail, Megaphone, Search, Target } from "lucide-react";

const icons = { target: Target, chart: BarChart3, megaphone: Megaphone, mail: Mail, search: Search };

export function DigitalServiceIcon({ name, className = "h-6 w-6" }: { name: keyof typeof icons; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
