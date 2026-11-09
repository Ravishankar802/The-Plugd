"use client";

export interface FollowedAuthor {
  name: string;
  avatarBg?: string;
  slug?: string;
  followedAt?: string;
}

const STORAGE_KEY = "plugd_followed_authors";

export function getFollowedAuthors(): FollowedAuthor[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFollowingAuthor(authorName: string): boolean {
  if (typeof window === "undefined" || !authorName) return false;
  const list = getFollowedAuthors();
  return list.some(
    (a) => a.name.trim().toLowerCase() === authorName.trim().toLowerCase()
  );
}

export function followAuthor(author: { name: string; avatarBg?: string; slug?: string }): void {
  if (typeof window === "undefined" || !author?.name) return;
  const list = getFollowedAuthors();
  const exists = list.some(
    (a) => a.name.trim().toLowerCase() === author.name.trim().toLowerCase()
  );
  if (!exists) {
    const updated: FollowedAuthor[] = [
      ...list,
      {
        name: author.name.trim(),
        avatarBg: author.avatarBg,
        slug: author.slug,
        followedAt: new Date().toISOString(),
      },
    ];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    window.dispatchEvent(new Event("plugd-following-change"));
  }
}

export function unfollowAuthor(authorName: string): void {
  if (typeof window === "undefined" || !authorName) return;
  const list = getFollowedAuthors();
  const updated = list.filter(
    (a) => a.name.trim().toLowerCase() !== authorName.trim().toLowerCase()
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  window.dispatchEvent(new Event("plugd-following-change"));
}
