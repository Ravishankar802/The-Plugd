import { ALL_PLAYBOOK_SUMMARIES } from "./playbooks-catalog";
import type { PlaybookSummary } from "./categories";
import { getAuthorProfile, getAuthorFollowersCount, getAvatarBgColor } from "./book-utils";

export interface AuthorDetails {
  name: string;
  slug: string;
  handle: string;
  avatarBg: string;
  followersCount: string;
  playbooksCount: number;
  playbooks: PlaybookSummary[];
  bio: string;
}

export function slugifyAuthorName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const AUTHOR_BIOS: Record<string, string> = {
  "Brady Lawson": "Systems architect & digital operator specializing in automated online businesses, cash-flow funnels, and lean operations.",
  "Ryan Walsh": "Enterprise strategist sharing counter-intuitive wealth principles, capital compounding, and asymmetric business models.",
  "Akhil Varma": "Long-term investor and digital founder building generational wealth systems, automated assets, and high-leverage portfolios.",
  "Jordan Hayes": "Full-stack creator and product strategist breaking down rapid digital asset creation, monetization frameworks, and scaling protocols.",
  "Bryce Holloway": "Online business developer and AI implementer helping modern entrepreneurs build high-margin revenue streams.",
  "Alex Turner": "Digital marketing and monetization architect engineering scalable digital offers, acquisition funnels, and high-ticket sales.",
  "Felix Weber": "High-agency AI operator and software strategist teaching practical automation, agentic workflows, and lean digital businesses.",
  "Caleb Sterling": "Digital commerce architect and prompt engineer behind plug-and-play AI businesses, digital micro-assets, and automated workflows.",
  "Divya Tiwari": "AI business strategist and automation consultant specializing in one-person service businesses and high-leverage client systems.",
  "Anjali Yadav": "Practical AI researcher breaking down real-world high-income side hustles, generative tools, and digital execution systems.",
  "Ritu Sharma": "AI monetization practitioner and digital product builder documenting verified business models and automated online systems.",
  "Franco Medina": "Digital growth strategist and operator breaking down the fundamental skill-stack to progress from $0 to $1,000,000.",
};

export function getAllAuthors(): AuthorDetails[] {
  const authorMap = new Map<string, {
    name: string;
    playbooks: PlaybookSummary[];
    bio: string;
  }>();

  for (const playbook of ALL_PLAYBOOK_SUMMARIES) {
    const profile = getAuthorProfile(playbook.categoryName, playbook.slug);
    const authorName = (profile?.name || "Plugd Creator").trim();
    
    if (!authorMap.has(authorName)) {
      authorMap.set(authorName, {
        name: authorName,
        playbooks: [],
        bio: AUTHOR_BIOS[authorName] || `Creator of practical digital playbooks across AI, wealth, and modern business on Plugd.`,
      });
    }

    authorMap.get(authorName)!.playbooks.push(playbook);
  }

  const authors: AuthorDetails[] = [];
  for (const entry of authorMap.values()) {
    const slug = slugifyAuthorName(entry.name);
    authors.push({
      name: entry.name,
      slug,
      handle: `@${slug.replace(/-/g, "")}`,
      avatarBg: getAvatarBgColor(entry.name),
      followersCount: getAuthorFollowersCount(entry.name),
      playbooksCount: entry.playbooks.length,
      playbooks: entry.playbooks,
      bio: entry.bio,
    });
  }

  return authors.sort((a, b) => b.playbooksCount - a.playbooksCount || a.name.localeCompare(b.name));
}

export function getAuthorBySlug(slug: string): AuthorDetails | null {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().replace(/^@/, "").trim();
  const authors = getAllAuthors();
  return authors.find((a) => a.slug === cleanSlug) || null;
}

export function getAuthorByName(name: string): AuthorDetails | null {
  if (!name) return null;
  const cleanName = name.toLowerCase().trim();
  const authors = getAllAuthors();
  return authors.find((a) => a.name.toLowerCase().trim() === cleanName) || null;
}
