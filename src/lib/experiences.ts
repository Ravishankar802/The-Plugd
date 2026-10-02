export interface Mood {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  summary: string;
  accent: string;
  previewPrompt: string;
}

export const MOODS_FOR_HER: Mood[] = [
  {
    id: "romantic",
    emoji: "💌",
    name: "ROMANTIC",
    tagline: "Say what you can't text.",
    summary: "Cinematic storytelling, intimate confessions, and a surprise ending.",
    accent: "from-rose-500/20 to-pink-500/10",
    previewPrompt: "A digital love letter that unfolds like a movie.",
  },
  {
    id: "cute",
    emoji: "❤️",
    name: "CUTE",
    tagline: "Make her smile.",
    summary: "Adorably playful mini-site revealing reasons she's impossible not to love.",
    accent: "from-red-500/20 to-rose-500/10",
    previewPrompt: "Soft, sweet, and guaranteed to make her melt.",
  },
  {
    id: "make-her-cry",
    emoji: "🥹",
    name: "MAKE HER CRY",
    tagline: "The good kind.",
    summary: "Deep emotional build-up, honest vulnerability, and a heartfelt payoff.",
    accent: "from-amber-500/20 to-rose-500/10",
    previewPrompt: "Tears guaranteed. Have tissues ready.",
  },
  {
    id: "flirty",
    emoji: "💋",
    name: "FLIRTY",
    tagline: "You know what you're doing.",
    summary: "Playful, magnetic mini-site that teases and flatters her through touch.",
    accent: "from-fuchsia-500/20 to-rose-500/10",
    previewPrompt: "Dangerous levels of rizz in website form.",
  },
  {
    id: "teasing",
    emoji: "😈",
    name: "TEASING",
    tagline: "A little trouble.",
    summary: "Cheeky mini-dilemmas and playful trouble designed to make her laugh.",
    accent: "from-purple-500/20 to-rose-500/10",
    previewPrompt: "Mischievous energy she won't stop thinking about.",
  },
  {
    id: "chaotic",
    emoji: "😂",
    name: "CHAOTIC",
    tagline: "This might go badly.",
    summary: "Moving buttons, ridiculous fake alerts, and absurdly funny surprises.",
    accent: "from-emerald-500/20 to-amber-500/10",
    previewPrompt: "Completely unhinged. She won't expect a single thing.",
  },
];

export const MOODS_FOR_HIM: Mood[] = [
  {
    id: "romantic",
    emoji: "💌",
    name: "ROMANTIC",
    tagline: "Say what you can't text.",
    summary: "Cinematic, intimate website reminding him why he's everything to you.",
    accent: "from-rose-500/20 to-amber-500/10",
    previewPrompt: "Deep, honest, and unforgettable.",
  },
  {
    id: "hype-him-up",
    emoji: "👑",
    name: "HYPE HIM UP",
    tagline: "Make his entire week.",
    summary: "Pure masculine ego boost and genuine appreciation of everything he is.",
    accent: "from-amber-500/20 to-yellow-500/10",
    previewPrompt: "He will screenshot this and look at it for years.",
  },
  {
    id: "teasing",
    emoji: "😈",
    name: "TEASING",
    tagline: "A little trouble.",
    summary: "Playfully provocative mini-site that will have his head spinning.",
    accent: "from-purple-500/20 to-pink-500/10",
    previewPrompt: "Cheeky, private, and impossible to ignore.",
  },
  {
    id: "cute",
    emoji: "🍕",
    name: "SOFT HOURS",
    tagline: "Just us being cozy.",
    summary: "Comfort food, lazy weekend energy, and cute appreciation.",
    accent: "from-orange-500/20 to-rose-500/10",
    previewPrompt: "Warm, sweet, and comforting.",
  },
  {
    id: "chaotic",
    emoji: "🎮",
    name: "CHAOTIC",
    tagline: "Zero survival instincts.",
    summary: "Funny fake error screens, ridiculous choices, and playful banter.",
    accent: "from-emerald-500/20 to-cyan-500/10",
    previewPrompt: "Unhinged couple comedy in interactive form.",
  },
  {
    id: "late-night",
    emoji: "🌙",
    name: "LATE NIGHT",
    tagline: "You should be sleeping.",
    summary: "Dark mode midnight thoughts, quiet confessions, and intimate warmth.",
    accent: "from-indigo-500/20 to-purple-500/10",
    previewPrompt: "Sent at 1 AM. Read in the dark.",
  },
];

export function getMoodById(id: string, target: "her" | "him"): Mood {
  const list = target === "her" ? MOODS_FOR_HER : MOODS_FOR_HIM;
  const found = list.find((m) => m.id === id);
  return (
    found ||
    list[0] || {
      id: "romantic",
      emoji: "💌",
      name: "ROMANTIC",
      tagline: "Say what you can't text.",
      summary: "Cinematic digital love letter.",
      accent: "from-rose-500/20 to-pink-500/10",
      previewPrompt: "Intimate and unforgettable.",
    }
  );
}
