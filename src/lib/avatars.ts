export interface AvatarOption {
  id: string;
  name: string;
  url: string;
  emoji: string;
  accent: string;
}

export const BUILTIN_AVATARS: AvatarOption[] = [
  { id: "spark", name: "Plugd Spark", url: "/avatars/avatar-1.svg", emoji: "⚡", accent: "#f97316" },
  { id: "cosmic", name: "Cosmic Violet", url: "/avatars/avatar-2.svg", emoji: "🚀", accent: "#8b5cf6" },
  { id: "cyan", name: "Electric Cyan", url: "/avatars/avatar-3.svg", emoji: "🎧", accent: "#06b6d4" },
  { id: "gamer", name: "Emerald Gamer", url: "/avatars/avatar-4.svg", emoji: "🎮", accent: "#10b981" },
  { id: "coral", name: "Sunset Coral", url: "/avatars/avatar-5.svg", emoji: "✨", accent: "#f43f5e" },
  { id: "crown", name: "Golden Crown", url: "/avatars/avatar-6.svg", emoji: "👑", accent: "#f59e0b" },
  { id: "midnight", name: "Midnight Star", url: "/avatars/avatar-7.svg", emoji: "⭐", accent: "#ea580c" },
  { id: "rose", name: "Rose Chic", url: "/avatars/avatar-8.svg", emoji: "💖", accent: "#ec4899" },
  { id: "tokyo", name: "Tokyo Neon", url: "/avatars/avatar-9.svg", emoji: "🕶️", accent: "#a855f7" },
  { id: "zen", name: "Zen Mint", url: "/avatars/avatar-10.svg", emoji: "🌱", accent: "#14b8a6" },
  { id: "tiger", name: "Blaze Tiger", url: "/avatars/avatar-11.svg", emoji: "🐯", accent: "#ea580c" },
  { id: "wave", name: "Aqua Wave", url: "/avatars/avatar-12.svg", emoji: "🌊", accent: "#0284c7" },
];
