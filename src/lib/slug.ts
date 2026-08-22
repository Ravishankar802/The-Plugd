export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || `item-${Date.now().toString().slice(-6)}`;
}

export function ensureUniqueSlug(baseSlug: string, usedSlugs: Set<string>) {
  if (!usedSlugs.has(baseSlug)) {
    usedSlugs.add(baseSlug);
    return baseSlug;
  }

  let suffix = 2;
  while (usedSlugs.has(`${baseSlug}-${suffix}`)) {
    suffix += 1;
  }

  const uniqueSlug = `${baseSlug}-${suffix}`;
  usedSlugs.add(uniqueSlug);
  return uniqueSlug;
}
