export interface Template {
  id: string;
  name: string;
  tagline: string;
  vibe: string;
  theme: "crimson" | "wine" | "obsidian" | "amber" | "noir";
  accent: string;
  price: number;
  currency: string;
  target: "her" | "him" | "both";
  description?: string;
}

export const TEMPLATES_FOR_HER: Template[] = [
  {
    id: "after-dark",
    name: "AFTER DARK",
    tagline: "Lights down. Lock the door.",
    vibe: "Deep velvet shadows, hypnotic starlight, slow burn.",
    theme: "wine",
    accent: "from-rose-600/30 via-red-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "An intimate, midnight-velvet digital atmosphere with interactive ember physics and tactile core.",
  },
  {
    id: "come-closer",
    name: "COME CLOSER",
    tagline: "Don't look away.",
    vibe: "Intimate magnetic field, tension you can feel.",
    theme: "crimson",
    accent: "from-rose-500/30 via-pink-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "High magnetic tension, bold typography, and pulse-reactive starlight particles.",
  },
  {
    id: "i-want-you",
    name: "I WANT YOU",
    tagline: "You know exactly what this means.",
    vibe: "Direct, pulse-racing, completely unapologetic.",
    theme: "crimson",
    accent: "from-red-600/35 via-rose-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "An uncompromising declaration with intense gravitational physics.",
  },
  {
    id: "bad-ideas",
    name: "BAD IDEAS",
    tagline: "We're not sleeping tonight.",
    vibe: "Mischievous heat, adrenaline, zero regrets.",
    theme: "amber",
    accent: "from-amber-600/30 via-red-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "Adrenaline-fueled amber embers and late-night chemistry.",
  },
  {
    id: "tonight-is-yours",
    name: "TONIGHT IS YOURS",
    tagline: "Every single demand. Zero rules.",
    vibe: "Total surrender, lavish attention, luxury devotion.",
    theme: "obsidian",
    accent: "from-purple-600/25 via-pink-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "Obsidian luxury, hypnotic slow-motion ripples, and total surrender.",
  },
  {
    id: "i-cant-behave",
    name: "I CAN'T BEHAVE",
    tagline: "You started this.",
    vibe: "Playfully provocative, dangerous, addictive.",
    theme: "wine",
    accent: "from-fuchsia-600/30 via-rose-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "Provocative magenta flares and teasing gravitational interactions.",
  },
  {
    id: "dont-make-me-wait",
    name: "DON'T MAKE ME WAIT",
    tagline: "Stop texting. Come over.",
    vibe: "Urgent, sensual, impatient in the best way.",
    theme: "crimson",
    accent: "from-rose-600/35 via-red-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "Urgent crimson pulse and direct, impatient sensual energy.",
  },
  {
    id: "just-us-tonight",
    name: "JUST US TONIGHT",
    tagline: "Nothing and no one else.",
    vibe: "Exclusive private universe, quiet obsession.",
    theme: "noir",
    accent: "from-zinc-500/20 via-rose-950/30 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "her",
    description: "Quiet obsession, subtle monochrome starlight, and solitary connection.",
  },
];

export const TEMPLATES_FOR_HIM: Template[] = [
  {
    id: "after-dark",
    name: "AFTER DARK",
    tagline: "Read this in private.",
    vibe: "Midnight atmosphere, shadows, heavy breathing.",
    theme: "wine",
    accent: "from-rose-600/30 via-red-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "A private midnight universe designed to be opened in complete solitude.",
  },
  {
    id: "come-over",
    name: "COME OVER",
    tagline: "Leave your keys at the door.",
    vibe: "Direct invitation, effortless temptation.",
    theme: "crimson",
    accent: "from-red-600/35 via-rose-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "A magnetic, undeniable invitation crafted with sharp crimson aesthetics.",
  },
  {
    id: "you-know-what-i-want",
    name: "YOU KNOW WHAT I WANT",
    tagline: "Don't make me ask twice.",
    vibe: "Confident, seductive command.",
    theme: "wine",
    accent: "from-purple-600/30 via-rose-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "Confident commands, sensual dark purple glow, and bold interactive pacing.",
  },
  {
    id: "i-miss-your-touch",
    name: "I MISS YOUR TOUCH",
    tagline: "My hands have memory.",
    vibe: "Intimate physical longing, undeniable heat.",
    theme: "amber",
    accent: "from-amber-600/30 via-rose-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "Intimate physical longing rendered through warm amber light physics.",
  },
  {
    id: "make-me-want-you",
    name: "MAKE ME WANT YOU",
    tagline: "See if you can keep up.",
    vibe: "Playful power dynamic, teasing challenge.",
    theme: "crimson",
    accent: "from-rose-500/30 via-pink-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "A teasing challenge with high-contrast typography and fluid motion.",
  },
  {
    id: "bad-ideas",
    name: "BAD IDEAS",
    tagline: "We'll deal with tomorrow tomorrow.",
    vibe: "Late night chaos, chemistry, no inhibitions.",
    theme: "amber",
    accent: "from-amber-600/35 via-red-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "Late night chaos and electric chemistry that refuses to sleep.",
  },
  {
    id: "tonight-is-yours",
    name: "TONIGHT IS YOURS",
    tagline: "Whatever you want. I'm yours.",
    vibe: "Complete focus, intoxicating dedication.",
    theme: "obsidian",
    accent: "from-purple-600/25 via-pink-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "Hypnotic dedication, dark velvet obsidian theme, and unconditional focus.",
  },
  {
    id: "i-cant-behave",
    name: "I CAN'T BEHAVE",
    tagline: "You're in trouble.",
    vibe: "Mischievous, dangerously flirty, provocative.",
    theme: "wine",
    accent: "from-fuchsia-600/30 via-rose-950/40 to-transparent",
    price: 2.99,
    currency: "USD",
    target: "him",
    description: "Dangerously flirty, provocative animations and tactile touch triggers.",
  },
];

export function getTemplateById(id: string, target?: "her" | "him"): Template {
  const normalizedId = String(id || "after-dark").toLowerCase();
  const list = target === "him" ? TEMPLATES_FOR_HIM : TEMPLATES_FOR_HER;
  const foundInTarget = list.find((t) => t.id === normalizedId);
  if (foundInTarget) return foundInTarget;

  // Fallback to check the other list
  const fallbackList = target === "him" ? TEMPLATES_FOR_HER : TEMPLATES_FOR_HIM;
  const foundInFallback = fallbackList.find((t) => t.id === normalizedId);
  if (foundInFallback) return foundInFallback;

  return list[0];
}

export function getAllTemplates(): Template[] {
  const map = new Map<string, Template>();
  [...TEMPLATES_FOR_HER, ...TEMPLATES_FOR_HIM].forEach((t) => {
    if (!map.has(t.id)) {
      map.set(t.id, t);
    }
  });
  return Array.from(map.values());
}

// Backward-compatibility aliases
export type Mood = Template;
export const MOODS_FOR_HER = TEMPLATES_FOR_HER;
export const MOODS_FOR_HIM = TEMPLATES_FOR_HIM;
export const getMoodById = getTemplateById;
