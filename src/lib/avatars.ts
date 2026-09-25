export interface AvatarOption {
  id: string;
  name: string;
  url: string;
  emoji: string;
  accent: string;
}

export const BUILTIN_AVATARS: AvatarOption[] = [
  { id: "amber", name: "Amber", url: "/avatars/avatar-1.png", emoji: "👩‍🦰", accent: "#f97316" },
  { id: "arthur", name: "Arthur", url: "/avatars/avatar-2.png", emoji: "👨‍🦳", accent: "#ec4899" },
  { id: "clara", name: "Clara", url: "/avatars/avatar-3.png", emoji: "👱‍♀️", accent: "#6366f1" },
  { id: "leo", name: "Leo", url: "/avatars/avatar-4.png", emoji: "👦", accent: "#10b981" },
  { id: "maya", name: "Maya", url: "/avatars/avatar-5.png", emoji: "👩", accent: "#3b82f6" },
  { id: "noah", name: "Noah", url: "/avatars/avatar-6.png", emoji: "🧑", accent: "#8b5cf6" },
  { id: "elena", name: "Elena", url: "/avatars/avatar-7.png", emoji: "👩‍🦱", accent: "#06b6d4" },
  { id: "chloe", name: "Chloe", url: "/avatars/avatar-8.png", emoji: "👧", accent: "#f43f5e" },
];
