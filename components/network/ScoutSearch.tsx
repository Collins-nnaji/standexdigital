"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Briefcase, Zap } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SearchFilters {
  query: string;
  domain: string;
  location: string;
  role: string; // RESEARCHER | ENGINEER
  isVetted: boolean;
  openToWork: boolean;
  scoutMode: boolean; // true sorts by rank
}

interface ScoutSearchProps {
  onFiltersChange?: (filters: SearchFilters) => void;
  isLab: boolean;
}

export function ScoutSearch({ onFiltersChange, isLab }: ScoutSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    domain: "",
    location: "",
    role: "",
    isVetted: false,
    openToWork: false,
    scoutMode: false,
  });

  const [expanded, setExpanded] = useState(false);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    const nextFilters = { ...filters, ...updates };
    setFilters(nextFilters);
    if (onFiltersChange) onFiltersChange(nextFilters);
  };

  return (
    <div className="rounded-[28px] border border-zinc-200 bg-white/40 p-3 shadow-sm backdrop-blur-md transition-all hover:border-[#7C5CFC]/20">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => updateFilters({ query: e.target.value })}
            placeholder="Search personnel, repositories, or tags..."
            className="h-12 w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 pl-11 pr-4 text-sm font-medium text-zinc-900 placeholder-zinc-400 transition-all focus:border-[#7C5CFC]/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#7C5CFC]/5"
          />
        </div>

        {isLab && (
          <button
            onClick={() => updateFilters({ scoutMode: !filters.scoutMode })}
            className={`flex h-12 items-center gap-2 rounded-2xl border px-5 text-xs font-black uppercase tracking-widest transition-all ${
              filters.scoutMode
                ? "border-[#7C5CFC]/30 bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/20"
                : "border-zinc-100 bg-zinc-50/50 text-zinc-400 hover:text-zinc-900 hover:bg-white"
            }`}
          >
            <Zap className={`h-3.5 w-3.5 ${filters.scoutMode ? "fill-white" : ""}`} />
            <span className="hidden sm:inline text-[10px]">Scout Mode</span>
          </button>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border transition-all",
            expanded
              ? "border-[#7C5CFC]/20 bg-[#7C5CFC]/5 text-[#7C5CFC]"
              : "border-zinc-100 bg-zinc-50/50 text-zinc-400 hover:text-zinc-900 hover:bg-white"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
          <select
            value={filters.role}
            onChange={(e) => updateFilters({ role: e.target.value })}
            className="h-11 cursor-pointer rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-[10px] font-bold uppercase tracking-widest text-[#7C5CFC] focus:border-[#7C5CFC]/30 focus:bg-white focus:outline-none transition-all"
          >
            <option value="">All Roles</option>
            <option value="ENGINEER">Implementation</option>
            <option value="RESEARCHER">Scientific Research</option>
          </select>

          <select
            value={filters.domain}
            onChange={(e) => updateFilters({ domain: e.target.value })}
            className="h-11 cursor-pointer rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500 focus:border-[#7C5CFC]/30 focus:bg-white focus:outline-none transition-all"
          >
            <option value="">All Domains</option>
            <option value="NLP">NLP</option>
            <option value="Vision">Computer Vision</option>
            <option value="Scale">Infrastructure & Scale</option>
            <option value="Agents">Autonomous Agents</option>
          </select>

          <div className="relative flex items-center">
            <MapPin className="absolute left-4 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
              placeholder="LOCATION"
              className="h-11 w-full rounded-xl border border-zinc-100 bg-zinc-50/50 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest text-zinc-900 placeholder-zinc-400 focus:border-[#7C5CFC]/30 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-amber-600 transition-all hover:bg-white hover:border-amber-500/20">
            <input
              type="checkbox"
              checked={filters.isVetted}
              onChange={(e) => updateFilters({ isVetted: e.target.checked })}
              className="h-3.5 w-3.5 rounded-md border-amber-200 text-amber-500 focus:ring-amber-500/20"
            />
            <span className="flex items-center gap-2">
              
              Vetted Only
            </span>
          </label>

          <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 transition-all hover:bg-white hover:border-[#7C5CFC]/20">
            <input
              type="checkbox"
              checked={filters.openToWork}
              onChange={(e) => updateFilters({ openToWork: e.target.checked })}
              className="h-3.5 w-3.5 rounded-md border-zinc-200 text-[#7C5CFC] focus:ring-[#7C5CFC]/20"
            />
            <span className="flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" />
              Open to Work
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
