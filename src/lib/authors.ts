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
        bio: "",
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
