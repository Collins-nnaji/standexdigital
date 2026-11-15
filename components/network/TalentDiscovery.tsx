"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  CircleDot, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  Code2, 
  Database, 
  Beaker, 
  Globe, 
  MapPin, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  Zap,
  CheckCircle2,
  LayoutDashboard,
  Layers,
  Activity,
  Edit2,
  Building2,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";
import { Avatar, Badge, Button, Separator } from "@heroui/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EditProfileModal } from "./EditProfileModal";
import { EditWorkModal } from "./EditWorkModal";
import { ReputationBar } from "./ReputationBar";

interface CompactWorkItem {
  id: string;
  title: string;
  type: string;
  abstract?: string;
  tags?: string[];
  views?: number;
  externalUrl?: string | null;
}

interface Researcher {
  id: string;
  email: string;
  handle: string | null;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  institution: string | null;
  location: string | null;
  role: string;
  openToWork: boolean;
  verified: boolean;
  isVetted?: boolean;
  vettedCategory?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  githubUrl?: string | null;
  websiteUrl?: string | null;
  ranks: Array<{
    domain: string;
    rankPosition: number | null;
    score: number;
    updatedAt?: string | Date;
  }>;
  workItems: CompactWorkItem[];
  signalsReceived?: any[];
}

interface TalentDiscoveryProps {
  researchers: Researcher[];
  initialSelectedId?: string;
  currentUserEmail?: string;
}

type TabType = "overview" | "works" | "reputation";

export function TalentDiscovery({ researchers, initialSelectedId, currentUserEmail }: TalentDiscoveryProps) {
  const [selectedId, setSelectedId] = useState(initialSelectedId || researchers[0]?.id);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedWorkId, setExpandedWorkId] = useState<string | null>(null);

  const selectedResearcher = researchers.find(r => r.id === selectedId) || researchers[0];
  const isOwner = currentUserEmail === selectedResearcher?.email;

  const getWorkIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t === "model") return Code2;
    if (t === "dataset") return Database;
    if (t === "experiment") return Beaker;
    if (t === "implementation" || t === "project") return Zap;
    return FileText;
  };

  // Mock Reputation Breakdown if not present
  const signals = selectedResearcher?.signalsReceived || [];
  const breakdown = {
    reproductions: signals.filter((s: any) => s.signalType === "reproduction").reduce((a: any, b: any) => a + b.value, 0) || 120,
    citations: signals.filter((s: any) => s.signalType === "citation").reduce((a: any, b: any) => a + b.value, 0) || 45,
    collabs: signals.filter((s: any) => s.signalType === "collab").reduce((a: any, b: any) => a + b.value, 0) || 18,
    reviews: signals.filter((s: any) => s.signalType === "review").reduce((a: any, b: any) => a + b.value, 0) || 32,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[900px]">
      {/* Left Sidebar: Master List */}
      <div className="w-full lg:w-[300px] shrink-0 lg:border-r border-black/[0.03]">
        <div className="sticky top-24 pr-4 space-y-3">
          <div className="mb-8 flex items-center justify-between px-2">
             <h3 className="font-syne text-[10px] font-black uppercase tracking-widest text-[#7C5CFC]">Personnel Network</h3>
             <span className="text-[10px] font-bold text-zinc-400">{researchers.length} Nodes</span>
          </div>
          
          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] pr-2 scrollbar-hide pb-20">
            {researchers.map((r) => {
              const isSelected = r.id === selectedId;
              const rank = r.ranks[0];
              
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedId(r.id);
                    setExpandedWorkId(null);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 group relative",
                    isSelected 
                      ? "bg-white shadow-xl shadow-zinc-200/50" 
                      : "hover:bg-zinc-100/50"
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 border border-zinc-100 shadow-sm transition-transform duration-500 group-hover:scale-105">
                      {r.avatar && <Avatar.Image src={r.avatar} />}
                      <Avatar.Fallback className="bg-zinc-50 text-zinc-300 font-bold text-xs">{r.name?.slice(0, 2).toUpperCase() || "AI"}</Avatar.Fallback>
                    </Avatar>
                    {isSelected && (
                      <motion.div 
                        layoutId="active-dot"
                        className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-[#7C5CFC] border-2 border-[#FAFAF9] shadow-sm" 
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 z-10">
                    <h4 className={cn(
                      "font-bold text-xs truncate transition-colors duration-300",
                      isSelected ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900"
                    )}>
                      {r.name}
                      {r.isVetted && <Badge size="sm" variant="soft" color="warning" className="ml-1 scale-75 origin-left tracking-tighter">Vetted</Badge>}
                    </h4>
                    <p className="text-[9px] font-medium text-zinc-400 truncate">
                      {r.role === "ENGINEER" ? "AI Implementation" : (r.institution || "Research Node")}
                    </p>
                  </div>
                  
                  {rank?.rankPosition && (
                    <div className="shrink-0 z-10">
                      <span className={cn(
                        "text-[9px] font-black font-syne",
                        isSelected ? "text-[#7C5CFC]" : "text-zinc-300"
                      )}>#{rank.rankPosition}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Pane: Detail View */}
      <div className="flex-1 lg:pl-10">
        <AnimatePresence mode="wait">
          {selectedResearcher ? (
            <motion.div
              key={selectedResearcher.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="min-h-full flex flex-col pt-0"
            >
              {/* Profile Hero Section */}
              <div className="pb-0 relative">
                <div className="absolute top-0 right-0 h-96 w-96 bg-[radial-gradient(circle_at_100%_0%,rgba(124,92,252,0.08),transparent_70%)] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start mb-10">
                  <div className="relative group/avatar">
                    <div className="absolute inset-0 bg-[#7C5CFC]/20 rounded-[40px] blur-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-700" />
                    <Avatar className="h-32 w-32 md:h-44 md:w-44 rounded-[40px] border-[6px] border-white shadow-2xl relative z-10 transition-transform duration-700 group-hover/avatar:scale-[1.02]">
                      {selectedResearcher.avatar && <Avatar.Image src={selectedResearcher.avatar} />}
                      <Avatar.Fallback className="text-5xl font-black bg-zinc-50 text-zinc-300">{selectedResearcher.name?.slice(0, 2).toUpperCase() || "AI"}</Avatar.Fallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 pt-2 space-y-5">
                    <div className="flex flex-wrap items-center gap-4">
                      <h2 className="font-syne text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">{selectedResearcher.name}</h2>
                      <div className="flex gap-2">
                        {selectedResearcher.verified && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                             <ShieldCheck className="h-3.5 w-3.5" /> ID Verified
                          </div>
                        )}
                        {selectedResearcher.isVetted && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 shadow-sm">
                             <CircleDot className="h-3.5 w-3.5" /> Standex Vetted
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-5 text-xs font-bold text-zinc-400">
                      <div className="flex items-center gap-2 transition-colors hover:text-zinc-600 cursor-default">
                        {selectedResearcher.role === "ENGINEER" ? <Code2 className="h-4 w-4 text-[#7C5CFC]" /> : <Building2 className="h-4 w-4 text-[#7C5CFC]" />} 
                        {selectedResearcher.role === "ENGINEER" ? "Implementation Engineer" : (selectedResearcher.institution || "Research Network")}
                      </div>
                      <div className="flex items-center gap-2 transition-colors hover:text-zinc-600 cursor-default">
                        <MapPin className="h-4 w-4 text-[#7C5CFC]" /> {selectedResearcher.location || "Distributed Node"}
                      </div>
                      {selectedResearcher.openToWork && (
                        <div className="flex items-center gap-2 text-emerald-500">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          Available for High-Impact Collab
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex items-center gap-4">
                         {selectedResearcher.linkedinUrl && (
                           <a href={selectedResearcher.linkedinUrl} target="_blank" className="text-zinc-400 hover:text-[#7C5CFC] transition-colors">
                              <Linkedin className="h-5 w-5" />
                           </a>
                         )}
                         {selectedResearcher.twitterUrl && (
                           <a href={selectedResearcher.twitterUrl} target="_blank" className="text-zinc-400 hover:text-[#7C5CFC] transition-colors">
                              <Twitter className="h-5 w-5" />
                           </a>
                         )}
                         {selectedResearcher.githubUrl && (
                           <a href={selectedResearcher.githubUrl} target="_blank" className="text-zinc-400 hover:text-[#7C5CFC] transition-colors">
                              <Github className="h-5 w-5" />
                           </a>
                         )}
                         {selectedResearcher.websiteUrl && (
                           <a href={selectedResearcher.websiteUrl} target="_blank" className="text-zinc-400 hover:text-[#7C5CFC] transition-colors">
                              <Globe className="h-5 w-5" />
                           </a>
                         )}
                      </div>

                      <div className="h-8 w-px bg-zinc-100 mx-2" />

                      <div className="flex items-center gap-3">
                         {isOwner ? (
                           <EditProfileModal user={{ 
                             handle: selectedResearcher.handle, 
                             name: selectedResearcher.name, 
                             bio: selectedResearcher.bio, 
                             openToWork: selectedResearcher.openToWork,
                             institution: selectedResearcher.institution,
                             location: selectedResearcher.location,
                             linkedinUrl: selectedResearcher.linkedinUrl,
                             twitterUrl: selectedResearcher.twitterUrl,
                             githubUrl: selectedResearcher.githubUrl,
                             websiteUrl: selectedResearcher.websiteUrl
                           }} />
                         ) : (
                           <Link href={`/r/${selectedResearcher.handle || selectedResearcher.id}`}>
                             <Button className="bg-[#7C5CFC] text-white rounded-2xl px-6 h-12 font-black text-xs uppercase tracking-widest shadow-xl shadow-[#7C5CFC]/20 hover:bg-[#6042db] transition-all">
                                View Full Profile <ArrowRight className="h-4 w-4 ml-2" />
                             </Button>
                           </Link>
                         )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex items-center gap-1 border-b border-zinc-100/50 mb-0">
                  {[
                    { id: "overview", label: "Overview", icon: LayoutDashboard },
                    { id: "works", label: "Verified Works", icon: Layers },
                    { id: "reputation", label: "Reputation Signal", icon: Activity }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={cn(
                        "relative flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                        activeTab === tab.id ? "text-[#7C5CFC]" : "text-zinc-400 hover:text-zinc-600"
                      )}
                    >
                      <tab.icon className={cn("h-3.5 w-3.5 transition-transform duration-300", activeTab === tab.id && "scale-110")} />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="active-tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C5CFC]" 
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Content Pane */}
              <div className="flex-1 p-8 lg:p-12 pt-10 bg-white/30">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                       <div className="max-w-3xl">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#7C5CFC] mb-4">
                            {selectedResearcher.role === "ENGINEER" ? "Engineering Philosophy" : "Research Background"}
                          </h4>
                          <p className="text-xl font-medium text-zinc-600 leading-relaxed italic">
                            "{selectedResearcher.bio || (selectedResearcher.role === "ENGINEER" 
                              ? "Focused on bridging the gap between frontier models and production-scale implementation."
                              : "Pushing the boundaries of decentralized intelligence and frontier model architectures.")}"
                          </p>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { label: "Network Momentum", value: `${selectedResearcher.ranks[0]?.score || 0} Points`, sub: "+12% this month", icon: Zap, color: "text-amber-500" },
                            { label: "Global Standing", value: `#${selectedResearcher.ranks[0]?.rankPosition || "None"}`, sub: `In ${selectedResearcher.ranks[0]?.domain || "AI Research"}`, icon: CircleDot, color: "text-[#7C5CFC]" },
                            { label: "Verified Artifacts", value: selectedResearcher.workItems.length, sub: "Peer reviewed items", icon: CheckCircle2, color: "text-emerald-500" }
                          ].map((card, i) => (
                            <div key={i} className="group p-6 rounded-[32px] bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                               <div className={cn("mb-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 transition-colors group-hover:bg-zinc-100", card.color)}>
                                  <card.icon className="h-5 w-5" />
                               </div>
                               <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{card.label}</h5>
                               <p className="text-lg font-black text-zinc-900 mb-1">{card.value}</p>
                               <p className="text-[10px] font-bold text-zinc-400">{card.sub}</p>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === "works" && (
                    <motion.div
                      key="works"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5"
                    >
                       {selectedResearcher.workItems.length > 0 ? (
                         selectedResearcher.workItems.map((work) => {
                           const isExpanded = expandedWorkId === work.id;
                           const WorkIcon = getWorkIcon(work.type);
                           
                           return (
                             <div 
                               key={work.id}
                               className={cn(
                                 "group rounded-[36px] border transition-all duration-500 relative overflow-hidden",
                                 isExpanded 
                                   ? "bg-white border-[#7C5CFC]/30 p-8 shadow-2xl" 
                                   : "bg-white/60 border-zinc-50 p-6 hover:bg-white hover:border-zinc-200"
                               )}
                             >
                                <div 
                                  className="flex items-center gap-5 cursor-pointer relative z-10"
                                  onClick={() => setExpandedWorkId(isExpanded ? null : work.id)}
                                >
                                  <div className={cn(
                                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border transition-all duration-500",
                                    isExpanded ? "bg-[#7C5CFC] text-white border-[#7C5CFC] rotate-3" : "bg-zinc-50 text-zinc-400 border-zinc-100 group-hover:text-[#7C5CFC]"
                                  )}>
                                    <WorkIcon className="h-7 w-7" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1.5">
                                      <Badge variant="soft" className="text-[8px] font-black uppercase tracking-wider bg-[#7C5CFC]/5 text-[#7C5CFC] py-0.5">{work.type}</Badge>
                                      {work.views && <span className="flex items-center gap-1 text-[9px] font-bold text-zinc-404"><Eye className="h-3 w-3" /> {work.views} Global Interactions</span>}
                                    </div>
                                    <h4 className="font-syne text-xl font-bold text-zinc-900 leading-tight group-hover:text-[#7C5CFC] transition-colors">{work.title}</h4>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                     {isOwner && <EditWorkModal work={work} />}
                                     <div className="h-10 w-10 flex items-center justify-center rounded-2xl border border-zinc-100 text-zinc-300">
                                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                     </div>
                                  </div>
                                </div>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="overflow-hidden relative z-10"
                                    >
                                      <div className="pt-8 mt-8 border-t border-zinc-100/50">
                                        <div className="flex flex-col lg:flex-row gap-10">
                                           <div className="flex-1">
                                              <h5 className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">Signal Abstract</h5>
                                              <p className="text-base font-medium leading-relaxed text-zinc-500 mb-8">
                                                 {work.abstract || "Full cryptographic abstract hash and verification parameters are accessible via the network layer for authorized auditors."}
                                              </p>
                                              
                                              <div className="flex flex-wrap gap-2">
                                                {work.tags?.map((tag) => (
                                                  <span key={tag} className="px-3 py-1.5 rounded-xl bg-zinc-50 text-[10px] font-bold text-zinc-500 border border-zinc-100">
                                                    #{tag}
                                                  </span>
                                                ))}
                                              </div>
                                           </div>
                                           
                                           <div className="w-full lg:w-48 shrink-0 space-y-4">
                                               <h5 className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Interaction</h5>
                                               <div className="space-y-2">
                                                  <Link href={`/work/${work.id}`} className="block">
                                                     <Button className="w-full bg-zinc-900 text-white rounded-xl h-12 font-black uppercase tracking-widest text-[10px]">Examine Case</Button>
                                                  </Link>
                                                  {work.externalUrl && (
                                                    <a href={work.externalUrl} target="_blank" className="block">
                                                       <Button variant="ghost" className="w-full border-zinc-100 rounded-xl h-12 font-black uppercase tracking-widest text-[10px] text-zinc-500">Source Link</Button>
                                                    </a>
                                                  )}
                                               </div>
                                           </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                             </div>
                           );
                         })
                       ) : (
                         <div className="py-24 text-center rounded-[40px] border border-dashed border-zinc-200">
                            <CircleDot className="h-8 w-8 text-zinc-200 mx-auto mb-4" />
                            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Awaiting Primary Artifact Signals</p>
                         </div>
                       )}
                    </motion.div>
                  )}

                  {activeTab === "reputation" && (
                    <motion.div
                      key="reputation"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                       <div className="flex items-center justify-between mb-8">
                          <div>
                             <h4 className="font-syne text-2xl font-black text-zinc-900">Signal Breakdown</h4>
                             <p className="text-xs font-medium text-zinc-400 mt-1">Verifiable reputation points aggregated from the network layer.</p>
                          </div>
                          <div className="h-12 w-12 rounded-2xl bg-[#7C5CFC]/10 flex items-center justify-center">
                             <Activity className="h-6 w-6 text-[#7C5CFC]" />
                          </div>
                       </div>

                       <ReputationBar breakdown={breakdown} />

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                          <div className="p-8 rounded-[40px] bg-emerald-500/5 border border-emerald-500/20">
                             <h5 className="font-syne text-lg font-black text-zinc-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Trust Score
                             </h5>
                             <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                                Personnel has maintained a 100% reproduction success rate on all published model weights over the last 12 project cycles.
                             </p>
                          </div>
                          <div className="p-8 rounded-[40px] bg-[#7C5CFC]/5 border border-[#7C5CFC]/20">
                             <h5 className="font-syne text-lg font-black text-zinc-900 mb-4 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-[#7C5CFC]" /> Network Reach
                             </h5>
                             <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                                Artifacts have been cited by 14 elite labs and reproduced by 3 independently verified frontier researchers.
                             </p>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <div className="h-full rounded-[48px] border border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-300">
                <LayoutDashboard className="h-12 w-12 mb-4 opacity-20" />
                <p className="font-syne text-xl font-bold uppercase tracking-widest">Select Personnel to Review Signal</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const Eye = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
