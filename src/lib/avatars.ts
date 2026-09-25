export interface AvatarOption {
  id: string;
  name: string;
  url: string;
  emoji: string;
  accent: string;
}

export const BUILTIN_AVATARS: AvatarOption[] = [
  { id: "avatar-1", name: "Avatar 1", url: "/avatars/avatar-1.png", emoji: "👩‍🦰", accent: "#f97316" },
  { id: "avatar-2", name: "Avatar 2", url: "/avatars/avatar-2.png", emoji: "👨‍🦳", accent: "#ec4899" },
  { id: "avatar-3", name: "Avatar 3", url: "/avatars/avatar-3.png", emoji: "👱‍♀️", accent: "#6366f1" },
  { id: "avatar-4", name: "Avatar 4", url: "/avatars/avatar-4.png", emoji: "👦", accent: "#10b981" },
  { id: "avatar-5", name: "Avatar 5", url: "/avatars/avatar-5.png", emoji: "👩", accent: "#3b82f6" },
  { id: "avatar-6", name: "Avatar 6", url: "/avatars/avatar-6.png", emoji: "🧑", accent: "#8b5cf6" },
  { id: "avatar-7", name: "Avatar 7", url: "/avatars/avatar-7.png", emoji: "👩‍🦱", accent: "#06b6d4" },
  { id: "avatar-8", name: "Avatar 8", url: "/avatars/avatar-8.png", emoji: "👧", accent: "#f43f5e" },
  { id: "avatar-9", name: "Avatar 9", url: "/avatars/avatar-9.png", emoji: "🧔", accent: "#0ea5e9" },
  { id: "avatar-10", name: "Avatar 10", url: "/avatars/avatar-10.png", emoji: "👩‍💼", accent: "#eab308" },
  { id: "avatar-11", name: "Avatar 11", url: "/avatars/avatar-11.png", emoji: "👨‍💼", accent: "#64748b" },
  { id: "avatar-12", name: "Avatar 12", url: "/avatars/avatar-12.png", emoji: "👩", accent: "#ec4899" },
];
