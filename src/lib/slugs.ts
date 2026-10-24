/**
 * Canonical title-to-slug generator for The Plugd Playbook Catalog.
 *
 * Every Playbook receives a clean, descriptive URL derived from its own title,
 * consistently across all categories.
 *
 * Normalization Rules:
 * 1. Lowercase all characters.
 * 2. Strip apostrophes/quotes (e.g. founder's -> founders).
 * 3. Strip commas between digits in numbers (e.g. $10,000 -> 10000).
 * 4. Strip currency symbols ($ € £ ¥ ₹).
 * 5. Handle slashes and ampersands (/ -> -, & -> and).
 * 6. Replace non-alphanumeric characters with hyphens.
 * 7. Collapse consecutive hyphens into a single hyphen.
 * 8. Trim leading and trailing hyphens.
 */

export function slugifyTitle(title: string): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/(?<=\d),(?=\d)/g, "")
    .replace(/[$€£¥₹]/g, "")
    .replace(/&/g, "and")
    .replace(/[+/]/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Resolves slug collisions by appending a counter suffix only when
 * an identical slug already exists in the catalog.
 */
export function generateUniqueSlug(
  title: string,
  existingSlugs: Set<string>
): string {
  const baseSlug = slugifyTitle(title);
  if (!baseSlug) return "playbook";
  if (!existingSlugs.has(baseSlug)) {
    existingSlugs.add(baseSlug);
    return baseSlug;
  }

  let counter = 2;
  while (existingSlugs.has(`${baseSlug}-${counter}`)) {
    counter++;
  }
  const unique = `${baseSlug}-${counter}`;
  existingSlugs.add(unique);
  return unique;
}
