"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, X, Loader2 } from "lucide-react";

interface InviteToCollabModalProps {
  targetUserId: string;
  targetUserName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function InviteToCollabModal({ targetUserId, targetUserName, isOpen, onClose }: InviteToCollabModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: `Research with ${targetUserName}`,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Please provide a name for this collaboration.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/collabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          visibility: "private",
          invitedUserId: targetUserId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create collaboration");

      onClose();
      router.push(`/collab/${data.collab.id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="fixed inset-0 z-0" 
        onClick={onClose} 
      />
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative z-10 border border-black/5 flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 text-[#7C5CFC]">
            <UserPlus className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-syne text-xl font-bold text-zinc-900">Invite to Collaborate</h2>
            <p className="text-sm text-zinc-500">Initiate a dedicated workspace with {targetUserName}.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-zinc-700">Collaboration Name</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:bg-white focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC]/20 transition-all font-medium"
              placeholder="e.g. Brainstorming: New Dataset Model"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-zinc-700">The Idea / Pitch</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:bg-white focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC]/20 transition-all"
              placeholder={`Share what you'd like to work on with ${targetUserName}...`}
            />
            <p className="mt-1.5 text-[11px] text-zinc-500 flex items-center gap-1">
               They will be instantly invited to a private collab room.
            </p>
          </div>

          {error && <p className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm font-medium text-red-600">{error}</p>}

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-[#7C5CFC] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#6042db] hover:shadow-[0_0_15px_rgba(124,92,252,0.4)] transition-all active:scale-95 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Create & Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
