export interface Mood {
  id: string;
  name: string;
  tagline: string;
  vibe: string;
  theme: "crimson" | "wine" | "obsidian" | "amber" | "noir";
  accent: string;
}

export const MOODS_FOR_HER: Mood[] = [
  {
    id: "after-dark",
    name: "AFTER DARK",
    tagline: "Lights down. Lock the door.",
    vibe: "Deep velvet shadows, hypnotic starlight, slow burn.",
    theme: "wine",
    accent: "from-rose-600/30 via-red-950/40 to-transparent",
  },
  {
    id: "come-closer",
    name: "COME CLOSER",
    tagline: "Don't look away.",
    vibe: "Intimate magnetic field, tension you can feel.",
    theme: "crimson",
    accent: "from-rose-500/30 via-pink-950/40 to-transparent",
  },
  {
    id: "i-want-you",
    name: "I WANT YOU",
    tagline: "You know exactly what this means.",
    vibe: "Direct, pulse-racing, completely unapologetic.",
    theme: "crimson",
    accent: "from-red-600/35 via-rose-950/40 to-transparent",
  },
  {
    id: "bad-ideas",
    name: "BAD IDEAS",
    tagline: "We're not sleeping tonight.",
    vibe: "Mischievous heat, adrenaline, zero regrets.",
    theme: "amber",
    accent: "from-amber-600/30 via-red-950/40 to-transparent",
  },
  {
    id: "tonight-is-yours",
    name: "TONIGHT IS YOURS",
    tagline: "Every single demand. Zero rules.",
    vibe: "Total surrender, lavish attention, luxury devotion.",
    theme: "obsidian",
    accent: "from-purple-600/25 via-pink-950/40 to-transparent",
  },
  {
    id: "i-cant-behave",
    name: "I CAN'T BEHAVE",
    tagline: "You started this.",
    vibe: "Playfully provocative, dangerous, addictive.",
    theme: "wine",
    accent: "from-fuchsia-600/30 via-rose-950/40 to-transparent",
  },
  {
    id: "dont-make-me-wait",
    name: "DON'T MAKE ME WAIT",
    tagline: "Stop texting. Come over.",
    vibe: "Urgent, sensual, impatient in the best way.",
    theme: "crimson",
    accent: "from-rose-600/35 via-red-950/40 to-transparent",
  },
  {
    id: "just-us-tonight",
    name: "JUST US TONIGHT",
    tagline: "Nothing and no one else.",
    vibe: "Exclusive private universe, quiet obsession.",
    theme: "noir",
    accent: "from-zinc-500/20 via-rose-950/30 to-transparent",
  },
];

export const MOODS_FOR_HIM: Mood[] = [
  {
    id: "after-dark",
    name: "AFTER DARK",
    tagline: "Read this in private.",
    vibe: "Midnight atmosphere, shadows, heavy breathing.",
    theme: "wine",
    accent: "from-rose-600/30 via-red-950/40 to-transparent",
  },
  {
    id: "come-over",
    name: "COME OVER",
    tagline: "Leave your keys at the door.",
    vibe: "Direct invitation, effortless temptation.",
    theme: "crimson",
    accent: "from-red-600/35 via-rose-950/40 to-transparent",
  },
  {
    id: "you-know-what-i-want",
    name: "YOU KNOW WHAT I WANT",
    tagline: "Don't make me ask twice.",
    vibe: "Confident, seductive command.",
    theme: "wine",
    accent: "from-purple-600/30 via-rose-950/40 to-transparent",
  },
  {
    id: "i-miss-your-touch",
    name: "I MISS YOUR TOUCH",
    tagline: "My hands have memory.",
    vibe: "Intimate physical longing, undeniable heat.",
    theme: "amber",
    accent: "from-amber-600/30 via-rose-950/40 to-transparent",
  },
  {
    id: "make-me-want-you",
    name: "MAKE ME WANT YOU",
    tagline: "See if you can keep up.",
    vibe: "Playful power dynamic, teasing challenge.",
    theme: "crimson",
    accent: "from-rose-500/30 via-pink-950/40 to-transparent",
  },
  {
    id: "bad-ideas",
    name: "BAD IDEAS",
    tagline: "We'll deal with tomorrow tomorrow.",
    vibe: "Late night chaos, chemistry, no inhibitions.",
    theme: "amber",
    accent: "from-amber-600/35 via-red-950/40 to-transparent",
  },
  {
    id: "tonight-is-yours",
    name: "TONIGHT IS YOURS",
    tagline: "Whatever you want. I'm yours.",
    vibe: "Complete focus, intoxicating dedication.",
    theme: "obsidian",
    accent: "from-purple-600/25 via-pink-950/40 to-transparent",
  },
  {
    id: "i-cant-behave",
    name: "I CAN'T BEHAVE",
    tagline: "You're in trouble.",
    vibe: "Mischievous, dangerously flirty, provocative.",
    theme: "wine",
    accent: "from-fuchsia-600/30 via-rose-950/40 to-transparent",
  },
];

export function getMoodById(id: string, target: "her" | "him"): Mood {
  const list = target === "her" ? MOODS_FOR_HER : MOODS_FOR_HIM;
  const found = list.find((m) => m.id === id);
  return found || list[0];
}
