export type MoodCategory =
  | "ALL"
  | "ROMANTIC"
  | "AFTER DARK"
  | "FLIRTY"
  | "OBSESSED"
  | "MISS YOU"
  | "COME OVER"
  | "TEASING"
  | "SOFT"
  | "CHAOTIC"
  | "LONG DISTANCE"
  | "DATE NIGHT"
  | "APOLOGY"
  | "BIRTHDAY"
  | "ANNIVERSARY"
  | "JUST BECAUSE";

export type TemplateStyle =
  | "Minimal"
  | "Cinematic"
  | "Editorial"
  | "Animated"
  | "Experimental"
  | "Dark"
  | "Soft"
  | "Playful";

export interface TemplatePreviewDesign {
  background: string;
  glow: string;
  headline: string;
  subtext: string;
  tag: string;
  accentColor: string;
  pattern: "ember" | "grid" | "mesh" | "minimal" | "blur" | "stars";
}

export type TemplateAudience = "her" | "him" | "both";

export interface Template {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  vibe: string;
  description: string;
  price: number;
  currency: string;
  mood: MoodCategory;
  target: TemplateAudience;
  style: TemplateStyle;
  theme: "crimson" | "wine" | "obsidian" | "amber" | "noir" | "indigo" | "rose";
  accent: string;
  creator: string;
  featured: boolean;
  trending: boolean;
  rating: number;
  sendsCount: number;
  previewDesign: TemplatePreviewDesign;
}

export const MOOD_CATEGORIES: { id: MoodCategory; name: string }[] = [
  { id: "ALL", name: "All" },
  { id: "ROMANTIC", name: "Romantic" },
  { id: "AFTER DARK", name: "After Dark" },
  { id: "FLIRTY", name: "Flirty" },
  { id: "OBSESSED", name: "Obsessed" },
  { id: "MISS YOU", name: "Miss You" },
  { id: "COME OVER", name: "Come Over" },
  { id: "TEASING", name: "Teasing" },
  { id: "SOFT", name: "Soft" },
  { id: "CHAOTIC", name: "Chaotic" },
  { id: "LONG DISTANCE", name: "Long Distance" },
  { id: "DATE NIGHT", name: "Date Night" },
  { id: "APOLOGY", name: "Apology" },
  { id: "BIRTHDAY", name: "Birthday" },
  { id: "ANNIVERSARY", name: "Anniversary" },
  { id: "JUST BECAUSE", name: "Just Because" },
];

export const TEMPLATES: Template[] = [
  {
    id: "after-dark",
    slug: "after-dark",
    name: "After Dark",
    tagline: "Lights down. Lock the door.",
    vibe: "Deep velvet shadows, hypnotic starlight, slow burn.",
    description: "A private midnight-velvet digital atmosphere designed for when words alone aren't enough. Features tactile touch physics, kinetic starlight, and an intimate one-tap reaction.",
    price: 2.99,
    currency: "USD",
    mood: "AFTER DARK",
    target: "both",
    style: "Dark",
    theme: "wine",
    accent: "from-rose-600/35 via-red-950/40 to-transparent",
    creator: "Plugd Studio",
    featured: true,
    trending: true,
    rating: 4.98,
    sendsCount: 1420,
    previewDesign: {
      background: "bg-[#080204]",
      glow: "from-rose-600/30 to-red-950/50",
      headline: "AFTER DARK",
      subtext: "Read this in complete privacy.",
      tag: "Midnight Atmosphere",
      accentColor: "#f43f5e",
      pattern: "ember",
    },
  },
  {
    id: "come-over",
    slug: "come-over",
    name: "Come Over",
    tagline: "Leave your keys at the door.",
    vibe: "Direct invitation, effortless temptation.",
    description: "For when a simple 'come over' needs an unforgettable delivery. A sleek crimson landing page with magnetic pull and zero ambiguity.",
    price: 2.99,
    currency: "USD",
    mood: "COME OVER",
    target: "both",
    style: "Cinematic",
    theme: "crimson",
    accent: "from-red-600/35 via-rose-950/40 to-transparent",
    creator: "Studio Noir",
    featured: true,
    trending: true,
    rating: 4.95,
    sendsCount: 1180,
    previewDesign: {
      background: "bg-[#0b0304]",
      glow: "from-red-600/30 to-rose-950/40",
      headline: "COME OVER",
      subtext: "I am not asking twice tonight.",
      tag: "Direct Invitation",
      accentColor: "#ef4444",
      pattern: "mesh",
    },
  },
  {
    id: "come-closer",
    slug: "come-closer",
    name: "Come Closer",
    tagline: "Don't look away.",
    vibe: "Intimate magnetic field, tension you can feel.",
    description: "A continuous interactive field of gravity particles that draw their gaze straight to your message. Seductive pacing with a tactile pulse trigger.",
    price: 2.99,
    currency: "USD",
    mood: "FLIRTY",
    target: "both",
    style: "Animated",
    theme: "crimson",
    accent: "from-rose-500/30 via-pink-950/40 to-transparent",
    creator: "Studio Noir",
    featured: true,
    trending: true,
    rating: 4.96,
    sendsCount: 1120,
    previewDesign: {
      background: "bg-[#070104]",
      glow: "from-rose-500/35 to-pink-950/50",
      headline: "COME CLOSER",
      subtext: "Close the distance between us.",
      tag: "Magnetic Tension",
      accentColor: "#fb7185",
      pattern: "ember",
    },
  },
  {
    id: "obsessed",
    slug: "obsessed",
    name: "Obsessed",
    tagline: "I can't pretend I'm normal about you.",
    vibe: "Hyper-minimal, black and white, unapologetic devotion.",
    description: "An editorial tribute with bold Swiss typography and intense focus. Built for someone who refuses to play it cool.",
    price: 2.99,
    currency: "USD",
    mood: "OBSESSED",
    target: "both",
    style: "Editorial",
    theme: "noir",
    accent: "from-zinc-500/20 via-zinc-900/40 to-transparent",
    creator: "Kinetics Dept",
    featured: true,
    trending: true,
    rating: 4.99,
    sendsCount: 1650,
    previewDesign: {
      background: "bg-[#050505]",
      glow: "from-white/10 to-zinc-900/50",
      headline: "OBSESSED",
      subtext: "Not normal about you in any way.",
      tag: "Pure Devotion",
      accentColor: "#ffffff",
      pattern: "grid",
    },
  },
  {
    id: "i-want-you",
    slug: "i-want-you",
    name: "I Want You",
    tagline: "You know exactly what this means.",
    vibe: "Direct, pulse-racing, completely unapologetic.",
    description: "A high-tension kinetic experience with deep red embers, razor-sharp typography, and immediate emotional clarity.",
    price: 2.99,
    currency: "USD",
    mood: "FLIRTY",
    target: "both",
    style: "Cinematic",
    theme: "crimson",
    accent: "from-red-600/35 via-rose-950/40 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: true,
    rating: 4.93,
    sendsCount: 890,
    previewDesign: {
      background: "bg-[#090203]",
      glow: "from-red-600/30 to-black",
      headline: "I WANT YOU",
      subtext: "Zero hesitation. Just you.",
      tag: "High Tension",
      accentColor: "#f43f5e",
      pattern: "ember",
    },
  },
  {
    id: "miss-you",
    slug: "miss-you",
    name: "Miss You",
    tagline: "My hands have memory.",
    vibe: "Floating starlight, longing, tender gravity.",
    description: "A soft indigo atmospheric experience made for late-night longing. Subtle floating typography and tactile hold interactions.",
    price: 2.99,
    currency: "USD",
    mood: "MISS YOU",
    target: "both",
    style: "Soft",
    theme: "indigo",
    accent: "from-indigo-600/30 via-slate-950/40 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: true,
    rating: 4.92,
    sendsCount: 940,
    previewDesign: {
      background: "bg-[#04040d]",
      glow: "from-indigo-600/30 to-blue-950/40",
      headline: "MISS YOU",
      subtext: "The room is too quiet without you.",
      tag: "Late Longing",
      accentColor: "#818cf8",
      pattern: "stars",
    },
  },
  {
    id: "bad-ideas",
    slug: "bad-ideas",
    name: "Bad Ideas",
    tagline: "We'll deal with tomorrow tomorrow.",
    vibe: "Late night chaos, chemistry, no inhibitions.",
    description: "Adrenaline-fueled amber embers and provocative pacing. Designed for mischievous late-night plans.",
    price: 2.99,
    currency: "USD",
    mood: "CHAOTIC",
    target: "both",
    style: "Experimental",
    theme: "amber",
    accent: "from-amber-600/35 via-red-950/40 to-transparent",
    creator: "Studio Noir",
    featured: false,
    trending: true,
    rating: 4.94,
    sendsCount: 830,
    previewDesign: {
      background: "bg-[#090401]",
      glow: "from-amber-600/30 to-red-950/50",
      headline: "BAD IDEAS",
      subtext: "We are definitely not sleeping tonight.",
      tag: "Zero Regrets",
      accentColor: "#f59e0b",
      pattern: "ember",
    },
  },
  {
    id: "tonight-is-yours",
    slug: "tonight-is-yours",
    name: "Tonight Is Yours",
    tagline: "Every single demand. Zero rules.",
    vibe: "Total surrender, lavish attention, luxury devotion.",
    description: "An obsidian and purple luxury experience. Unconditional surrender designed to pamper and spoil your partner completely.",
    price: 2.99,
    currency: "USD",
    mood: "ROMANTIC",
    target: "both",
    style: "Editorial",
    theme: "obsidian",
    accent: "from-purple-600/25 via-pink-950/40 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: false,
    rating: 4.97,
    sendsCount: 760,
    previewDesign: {
      background: "bg-[#07020a]",
      glow: "from-purple-600/30 to-pink-950/40",
      headline: "TONIGHT IS YOURS",
      subtext: "Every rule is off. Name what you want.",
      tag: "Lavish Devotion",
      accentColor: "#c084fc",
      pattern: "mesh",
    },
  },
  {
    id: "teasing",
    slug: "teasing",
    name: "I Can't Behave",
    tagline: "You started this.",
    vibe: "Playfully provocative, dangerous, addictive.",
    description: "Dangerously flirty, quick-cut typography with playful touch triggers that keep your partner leaning in for more.",
    price: 2.99,
    currency: "USD",
    mood: "TEASING",
    target: "both",
    style: "Playful",
    theme: "wine",
    accent: "from-fuchsia-600/30 via-rose-950/40 to-transparent",
    creator: "Kinetics Dept",
    featured: false,
    trending: false,
    rating: 4.89,
    sendsCount: 670,
    previewDesign: {
      background: "bg-[#080106]",
      glow: "from-fuchsia-600/30 to-rose-950/40",
      headline: "CAN'T BEHAVE",
      subtext: "You knew what you were doing.",
      tag: "Dangerous Play",
      accentColor: "#e879f9",
      pattern: "grid",
    },
  },
  {
    id: "dont-make-me-wait",
    slug: "dont-make-me-wait",
    name: "Don't Make Me Wait",
    tagline: "Stop texting. Come over.",
    vibe: "Urgent, sensual, impatient in the best way.",
    description: "A fast-paced interactive invitation with an escalating countdown and bold sensual typography.",
    price: 2.99,
    currency: "USD",
    mood: "COME OVER",
    target: "both",
    style: "Cinematic",
    theme: "crimson",
    accent: "from-rose-600/35 via-red-950/40 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: true,
    rating: 4.91,
    sendsCount: 710,
    previewDesign: {
      background: "bg-[#090203]",
      glow: "from-rose-600/30 to-red-950/40",
      headline: "DON'T WAIT",
      subtext: "Put your phone down and get here.",
      tag: "Pure Urgency",
      accentColor: "#f43f5e",
      pattern: "mesh",
    },
  },
  {
    id: "long-distance",
    slug: "long-distance",
    name: "Across Time Zones",
    tagline: "Same moon. Still thinking of you.",
    vibe: "Quiet starlight, synchronized clocks, emotional resonance.",
    description: "Crafted specifically for couples separated by miles. Displays parallel midnight horizons and subtle shared pulse triggers.",
    price: 2.99,
    currency: "USD",
    mood: "LONG DISTANCE",
    target: "both",
    style: "Minimal",
    theme: "noir",
    accent: "from-slate-500/20 via-blue-950/30 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: false,
    rating: 4.96,
    sendsCount: 820,
    previewDesign: {
      background: "bg-[#040508]",
      glow: "from-cyan-600/20 to-slate-900/50",
      headline: "ACROSS TIME",
      subtext: "Distance doesn't stand a chance.",
      tag: "Shared Horizon",
      accentColor: "#38bdf8",
      pattern: "stars",
    },
  },
  {
    id: "date-night",
    slug: "date-night",
    name: "Secret Menu",
    tagline: "Your itinerary for tonight.",
    vibe: "Exclusive speakeasy menu, playful choices, high anticipation.",
    description: "An elegant interactive tasting menu for date night. From welcome drinks to midnight adventures, crafted like a 3-star culinary experience.",
    price: 2.99,
    currency: "USD",
    mood: "DATE NIGHT",
    target: "both",
    style: "Editorial",
    theme: "amber",
    accent: "from-amber-600/30 via-stone-900/40 to-transparent",
    creator: "Studio Noir",
    featured: false,
    trending: false,
    rating: 4.94,
    sendsCount: 650,
    previewDesign: {
      background: "bg-[#090703]",
      glow: "from-amber-600/25 to-stone-950/50",
      headline: "SECRET MENU",
      subtext: "Three courses. Zero rush.",
      tag: "Private Itinerary",
      accentColor: "#fbbf24",
      pattern: "mesh",
    },
  },
  {
    id: "soft-hours",
    slug: "soft-hours",
    name: "Soft Hours",
    tagline: "Warm tea, heavy blanket, your head on my chest.",
    vibe: "Gentle pastel dusk, slow breath, absolute comfort.",
    description: "A calming, restorative sanctuary for when your person had a brutal day. Slow breathing animations and quiet declarations.",
    price: 2.99,
    currency: "USD",
    mood: "SOFT",
    target: "both",
    style: "Soft",
    theme: "rose",
    accent: "from-rose-400/20 via-stone-900/40 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: false,
    rating: 4.95,
    sendsCount: 590,
    previewDesign: {
      background: "bg-[#090506]",
      glow: "from-rose-400/25 to-stone-900/40",
      headline: "SOFT HOURS",
      subtext: "Nothing to prove. Just breathe.",
      tag: "Gentle Sanctuary",
      accentColor: "#fda4af",
      pattern: "blur",
    },
  },
  {
    id: "apology",
    slug: "apology",
    name: "White Flag",
    tagline: "I was wrong. I'm sorry.",
    vibe: "Clean, humble, sincere, no excuses.",
    description: "When an apology text looks too casual. A dignified, honest interactive message that acknowledges mistakes with maturity.",
    price: 2.99,
    currency: "USD",
    mood: "APOLOGY",
    target: "both",
    style: "Minimal",
    theme: "noir",
    accent: "from-zinc-500/20 via-zinc-900/40 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: false,
    rating: 4.88,
    sendsCount: 410,
    previewDesign: {
      background: "bg-[#060606]",
      glow: "from-zinc-400/20 to-black",
      headline: "WHITE FLAG",
      subtext: "I value you more than my pride.",
      tag: "Sincere Apology",
      accentColor: "#e4e4e7",
      pattern: "minimal",
    },
  },
  {
    id: "anniversary",
    slug: "anniversary",
    name: "Chapter By Chapter",
    tagline: "Still the best decision I ever made.",
    vibe: "Timeless museum gallery, milestones, everlasting devotion.",
    description: "A museum-grade digital anniversary archive celebrating your story together. Includes commemorative timeline milestones.",
    price: 2.99,
    currency: "USD",
    mood: "ANNIVERSARY",
    target: "both",
    style: "Editorial",
    theme: "amber",
    accent: "from-amber-500/25 via-stone-950/40 to-transparent",
    creator: "Studio Noir",
    featured: false,
    trending: false,
    rating: 4.97,
    sendsCount: 620,
    previewDesign: {
      background: "bg-[#080602]",
      glow: "from-amber-500/20 to-stone-900/50",
      headline: "CHAPTERS",
      subtext: "Every year proves we were right.",
      tag: "Anniversary Edition",
      accentColor: "#f59e0b",
      pattern: "mesh",
    },
  },
  {
    id: "birthday",
    slug: "birthday",
    name: "Main Character",
    tagline: "The world stops for your birthday.",
    vibe: "High fashion lookbook, bold editorial celebration.",
    description: "A bespoke runway lookbook celebrating their birthday. Bold typography layouts, custom accolades, and playful confetti physics.",
    price: 2.99,
    currency: "USD",
    mood: "BIRTHDAY",
    target: "both",
    style: "Editorial",
    theme: "wine",
    accent: "from-pink-500/25 via-rose-950/40 to-transparent",
    creator: "Kinetics Dept",
    featured: false,
    trending: true,
    rating: 4.93,
    sendsCount: 880,
    previewDesign: {
      background: "bg-[#080206]",
      glow: "from-pink-500/30 to-rose-950/40",
      headline: "MAIN CHARACTER",
      subtext: "Today belongs entirely to you.",
      tag: "Birthday Lookbook",
      accentColor: "#ec4899",
      pattern: "grid",
    },
  },
  {
    id: "just-because",
    slug: "just-because",
    name: "Just Because",
    tagline: "No occasion. Just wanted to remind you.",
    vibe: "Effortless, spontaneous, warm starlight.",
    description: "A spontaneous interactive digital artifact with floating affirmations, subtle ambient physics, and a warm midnight glow.",
    price: 2.99,
    currency: "USD",
    mood: "JUST BECAUSE",
    target: "both",
    style: "Soft",
    theme: "rose",
    accent: "from-rose-500/25 via-stone-900/40 to-transparent",
    creator: "Plugd Studio",
    featured: false,
    trending: false,
    rating: 4.95,
    sendsCount: 540,
    previewDesign: {
      background: "bg-[#080406]",
      glow: "from-rose-500/25 to-stone-950/50",
      headline: "JUST BECAUSE",
      subtext: "You crossed my mind. That's all.",
      tag: "Spontaneous Thought",
      accentColor: "#f43f5e",
      pattern: "stars",
    },
  },
];

// Helper selectors
export function getTemplateById(id: string, _target?: string): Template {
  const normalizedId = String(id || "after-dark").toLowerCase();
  const found = TEMPLATES.find((t) => t.id === normalizedId || t.slug === normalizedId);
  if (found) return found;
  return TEMPLATES[0];
}

export function getAllTemplates(): Template[] {
  return TEMPLATES;
}

export function getFeaturedTemplates(): Template[] {
  return TEMPLATES.filter((t) => t.featured);
}

export function getTemplatesByMood(mood: MoodCategory): Template[] {
  if (mood === "ALL") return TEMPLATES;
  return TEMPLATES.filter((t) => t.mood === mood);
}

// Backward-compatibility aliases for existing routes
export type Mood = Template;
export const TEMPLATES_FOR_HER = TEMPLATES;
export const TEMPLATES_FOR_HIM = TEMPLATES;
export const MOODS_FOR_HER = TEMPLATES;
export const MOODS_FOR_HIM = TEMPLATES;
export const getMoodById = getTemplateById;
