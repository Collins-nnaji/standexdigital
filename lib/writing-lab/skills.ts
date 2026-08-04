export type WritingLevel = "beginner" | "intermediate" | "advanced";

export const WRITING_LEVELS: { id: WritingLevel; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export type WritingSkill = {
  id: string;
  label: string;
  blurb: string;
};

export const WRITING_SKILLS: WritingSkill[] = [
  { id: "clarity", label: "Clarity", blurb: "Say one thing plainly, with no filler." },
  { id: "persuasion", label: "Persuasion", blurb: "Build a case that moves someone to act." },
  { id: "concision", label: "Concision", blurb: "Cut everything that isn't load-bearing." },
  { id: "structure", label: "Structure", blurb: "Order ideas so each one earns the next." },
  { id: "storytelling", label: "Storytelling", blurb: "Use a concrete moment to make a point land." },
  { id: "tone-control", label: "Tone control", blurb: "Hit a specific register on purpose, not by accident." },
];
