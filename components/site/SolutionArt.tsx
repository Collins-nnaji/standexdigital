/* Animated SVG illustrations for the five solution cards. */

type Props = { className?: string };

const wrap = "h-full w-full";

export function AIArt({ className }: Props) {
  const nodes = [
    [60, 40], [60, 110], [60, 180], [150, 70], [150, 150], [240, 110],
  ];
  const links = [
    [0, 3], [0, 4], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5],
  ];
  return (
    <svg viewBox="0 0 300 220" className={className ?? wrap} aria-hidden="true">
      <defs>
        <linearGradient id="ai-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#a78bfa" strokeWidth="1.5" className="site-dash" />
      ))}
      {nodes.slice(0, 5).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="#fff" stroke="#8b5cf6" strokeWidth="2.5" />
      ))}
      <circle cx="240" cy="110" r="26" fill="#8b5cf6" opacity=".25" className="site-ring" />
      <circle cx="240" cy="110" r="26" fill="url(#ai-g)" />
      <path d="M229 112l8 8 14-18" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="196" y="22" width="84" height="26" rx="13" fill="#fff" stroke="#ddd6fe" />
      <circle cx="210" cy="35" r="4" fill="#22c55e" />
      <rect x="220" y="31" width="48" height="8" rx="4" fill="#ddd6fe" />
    </svg>
  );
}

export function BIArt({ className }: Props) {
  const bars = [60, 95, 75, 130, 110, 160];
  return (
    <svg viewBox="0 0 300 220" className={className ?? wrap} aria-hidden="true">
      <rect x="24" y="24" width="252" height="172" rx="16" fill="#fff" stroke="#fde68a" />
      {[70, 110, 150].map((y) => (
        <line key={y} x1="40" x2="260" y1={y} y2={y} stroke="#fef3c7" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={46 + i * 26} y={186 - h * 0.8} width="16" height={h * 0.8} rx="4" fill={i === 5 ? "#f59e0b" : "#fcd34d"} className="site-bar" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
      <path d="M46 150 C 90 130, 120 140, 150 100 S 220 60, 252 44" fill="none" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
      <circle cx="252" cy="44" r="6" fill="#b45309" />
      <circle cx="252" cy="44" r="6" fill="#f59e0b" className="site-ring" />
      <rect x="196" y="34" width="0" height="0" />
    </svg>
  );
}

export function AppsArt({ className }: Props) {
  return (
    <svg viewBox="0 0 300 220" className={className ?? wrap} aria-hidden="true">
      <rect x="20" y="40" width="96" height="140" rx="14" fill="#fff" stroke="#a7f3d0" />
      <rect x="32" y="54" width="72" height="10" rx="5" fill="#6ee7b7" />
      {[78, 100, 122, 144].map((y, i) => (
        <g key={y}>
          <rect x="32" y={y} width="72" height="14" rx="5" fill="#ecfdf5" />
          <circle cx="42" cy={y + 7} r="3.5" fill={i < 3 ? "#10b981" : "#d1d5db"} />
        </g>
      ))}
      <path d="M124 110 H 176" stroke="#10b981" strokeWidth="2.5" className="site-dash" />
      <path d="M170 103 l9 7 -9 7" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g className="site-float">
        <rect x="186" y="28" width="96" height="76" rx="14" fill="#10b981" />
        <path d="M204 66l10 10 20-24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="186" y="116" width="96" height="30" rx="10" fill="#fff" stroke="#a7f3d0" />
      <rect x="196" y="127" width="52" height="8" rx="4" fill="#a7f3d0" />
      <rect x="186" y="154" width="96" height="30" rx="10" fill="#fff" stroke="#a7f3d0" />
      <rect x="196" y="165" width="36" height="8" rx="4" fill="#a7f3d0" />
    </svg>
  );
}

export function CRMArt({ className }: Props) {
  const stages = [
    { x: 24, w: 252, c: "#bae6fd" },
    { x: 54, w: 192, c: "#7dd3fc" },
    { x: 84, w: 132, c: "#38bdf8" },
    { x: 114, w: 72, c: "#0284c7" },
  ];
  return (
    <svg viewBox="0 0 300 220" className={className ?? wrap} aria-hidden="true">
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={26 + i * 42} width={s.w} height="34" rx="10" fill={s.c} />
          <rect x={s.x + 14} y={39 + i * 42} width={Math.max(s.w * 0.3, 20)} height="8" rx="4" fill="#fff" opacity=".8" />
        </g>
      ))}
      <g className="site-float">
        <circle cx="250" cy="190" r="22" fill="#fff" stroke="#bae6fd" strokeWidth="2" />
        <path d="M240 190l7 7 14-15" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="150" cy="30" r="5" fill="#0284c7" className="site-ring" />
    </svg>
  );
}

export function GrowthArt({ className }: Props) {
  return (
    <svg viewBox="0 0 300 220" className={className ?? wrap} aria-hidden="true">
      <defs>
        <linearGradient id="gr-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f43f5e" stopOpacity=".35" />
          <stop offset="1" stopColor="#f43f5e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M20 180 C 70 170, 100 150, 140 120 S 220 60, 280 24 L280 200 L20 200Z" fill="url(#gr-g)" />
      <path d="M20 180 C 70 170, 100 150, 140 120 S 220 60, 280 24" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="280" cy="24" r="7" fill="#e11d48" />
      <circle cx="280" cy="24" r="7" fill="#fb7185" className="site-ring" />
      <g className="site-float">
        <rect x="26" y="34" width="110" height="46" rx="12" fill="#fff" stroke="#fecdd3" />
        <rect x="38" y="46" width="34" height="8" rx="4" fill="#fecdd3" />
        <rect x="38" y="60" width="62" height="10" rx="5" fill="#f43f5e" />
      </g>
      {[[70, 150], [140, 120], [210, 80]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#fff" stroke="#e11d48" strokeWidth="2.5" />
      ))}
    </svg>
  );
}

export function DataArt({ className }: Props) {
  return (
    <svg viewBox="0 0 300 220" className={className ?? wrap} aria-hidden="true">
      {[28, 70, 112].map((y, i) => (
        <g key={y}>
          <ellipse cx="150" cy={y + 30} rx="60" ry="16" fill={["#99f6e4", "#5eead4", "#2dd4bf"][i]} />
          <rect x="90" y={y} width="120" height="30" fill={["#99f6e4", "#5eead4", "#2dd4bf"][i]} />
          <ellipse cx="150" cy={y} rx="60" ry="16" fill={["#ccfbf1", "#99f6e4", "#5eead4"][i]} />
        </g>
      ))}
      {[[30, 60], [30, 120], [270, 60], [270, 120]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} H ${x < 150 ? 88 : 212}`} stroke="#14b8a6" strokeWidth="2" className="site-dash" />
          <circle cx={x} cy={y} r="8" fill="#fff" stroke="#14b8a6" strokeWidth="2.5" />
        </g>
      ))}
      <circle cx="150" cy="180" r="8" fill="#0d9488" className="site-ring" />
      <circle cx="150" cy="180" r="8" fill="#0d9488" />
    </svg>
  );
}

export function TrainingArt({ className }: Props) {
  return (
    <svg viewBox="0 0 300 220" className={className ?? wrap} aria-hidden="true">
      <g className="site-float">
        <path d="M150 28 L250 70 L150 112 L50 70 Z" fill="#6366f1" />
        <path d="M92 92 V132 C92 146 120 156 150 156 S208 146 208 132 V92 L150 116 Z" fill="#818cf8" />
        <path d="M250 70 V112" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
        <circle cx="250" cy="118" r="7" fill="#4f46e5" />
      </g>
      <rect x="40" y="176" width="220" height="12" rx="6" fill="#e0e7ff" />
      <rect x="40" y="176" width="150" height="12" rx="6" fill="#6366f1" className="site-bar" style={{ transformOrigin: "left", animationName: "none" }} />
      <circle cx="190" cy="182" r="6" fill="#fff" stroke="#4f46e5" strokeWidth="3" />
    </svg>
  );
}
