"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Briefcase, ChevronRight, UserPlus, Share2, ExternalLink, ShieldCheck } from "lucide-react";
import { RankBadge } from "./RankBadge";
import { useState } from "react";
import { InviteToCollabModal } from "./InviteToCollabModal";
import { Avatar, Badge, Button, ButtonGroup, Separator } from "@heroui/react";

interface CompactWorkItem {
  id: string;
  title: string;
  type: string;
}

export interface TalentCardProps {
  id: string;
  handle?: string | null;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  institution: string | null;
  openToWork: boolean;
  domain: string;
  rankPosition: number | null;
  workItems: CompactWorkItem[];
  isScoutView?: boolean;
}

export function TalentCard({
  id,
  handle,
  name,
  avatar: avatarUrl,
  bio,
  institution,
  openToWork,
  domain,
  rankPosition,
  workItems,
  isScoutView = false,
}: TalentCardProps) {
  const router = useRouter();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const isSelf = false;
  const canInvite = true;

  return (
    <>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-[#7C5CFC]/40 hover:shadow-2xl hover:-translate-y-1">
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(124,92,252,0.05),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Badge.Anchor>
            <Link href={`/r/${handle || id}`}>
              <Avatar className="h-16 w-16 border border-zinc-100 shadow-sm">
                {avatarUrl && <Avatar.Image src={avatarUrl} />}
                <Avatar.Fallback>{name?.slice(0, 2).toUpperCase() || "AI"}</Avatar.Fallback>
              </Avatar>
            </Link>
            {rankPosition && (
              <Badge color="accent" size="sm" variant="soft" className="font-syne font-black">
                #{rankPosition}
              </Badge>
            )}
          </Badge.Anchor>
          
          <div className="flex h-12 flex-col justify-center">
            <Link href={`/r/${handle || id}`}>
              <h3 className="font-syne text-xl font-bold text-zinc-900 group-hover:text-[#7C5CFC] transition-colors leading-tight">{name}</h3>
            </Link>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
               <ShieldCheck className="h-3.5 w-3.5 text-[#7C5CFC]" /> {institution}
            </div>
          </div>
        </div>
        
        {!rankPosition && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 text-[#7C5CFC]">
            
          </div>
        )}
      </div>

      <p className="mb-6 line-clamp-3 text-sm font-medium leading-relaxed text-zinc-500">
        {bio || "Researcher on the frontiers of artificial intelligence."}
      </p>

      {/* Stats/Reputation Row */}
      <div className="mb-6">
        <Separator className="bg-zinc-100/50" />
        <div className="grid grid-cols-2 gap-4 py-4">
           <div className="flex flex-col">
              <span className="text-xs font-black text-zinc-900 font-syne tracking-tight">180.2k</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#7C5CFC]">Impact Points</span>
           </div>
           <div className="flex flex-col border-l border-zinc-100 pl-4">
              <span className="text-xs font-black text-zinc-900 font-syne tracking-tight">Verified</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Signal Scout</span>
           </div>
        </div>
        <Separator className="bg-zinc-100/50" />
      </div>

      {/* Mini Work Feed */}
      <div className="mb-6 flex-1 space-y-2.5">
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">Verified Artifacts</p>
        {workItems && workItems.length > 0 ? (
          workItems.slice(0, 2).map((work) => (
            <Link 
              key={work.id} 
              href={`/work/${work.id}`}
              className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/50 p-2.5 transition-all hover:bg-white hover:border-[#7C5CFC]/20 hover:shadow-sm"
            >
              <div className="min-w-0 flex-1 pr-2">
                <p className="truncate text-[10px] font-bold text-zinc-700">{work.title}</p>
              </div>
              <span className="shrink-0 text-[8px] font-black uppercase tracking-wider text-zinc-400">
                {work.type}
              </span>
            </Link>
          ))
        ) : (
          <div className="flex h-16 items-center justify-center rounded-2xl border border-dashed border-zinc-200 text-[9px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50/30">
            Pending verification.
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 pb-4">
        <div>
          {openToWork && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-600">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available
            </div>
          )}
        </div>
      </div>

      {/* Action Bar (Invite Button) */}
      <div className="flex gap-2">
        <ButtonGroup className="w-full">
           {canInvite && !isSelf ? (
             <Button 
                onPress={() => setIsInviteOpen(true)}
                className="flex-[2] h-11 bg-[#7C5CFC] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#7C5CFC]/20 rounded-2xl hover:bg-[#6042db]"
             >
                <UserPlus className="h-3.5 w-3.5 mr-2" /> Invite
             </Button>
           ) : (
             <Button
                onPress={() => router.push(`/r/${handle || id}`)}
                className="flex-[2] h-11 bg-zinc-900 text-white text-[10px] font-black flex items-center justify-center uppercase tracking-widest rounded-2xl hover:bg-black transition-colors"
             >
                <ExternalLink className="h-3.5 w-3.5 mr-2" /> Profile
             </Button>
           )}
           <Button 
              className="w-11 min-w-0 h-11 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-400 hover:text-zinc-600 hover:bg-white transition-all flex items-center justify-center p-0"
           >
              <Share2 className="h-3.5 w-3.5" />
           </Button>
        </ButtonGroup>
      </div>

      {/* Modal */}
      <InviteToCollabModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        targetUserId={id}
        targetUserName={name || "Researcher"}
      />
    </div>
    </>
  );
}
