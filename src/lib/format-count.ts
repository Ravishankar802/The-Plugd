/**
 * Formats wishlist addition count into compact human-friendly text:
 * - Below 1,000: exact number ("478", "180", "56")
 * - 1,000 and above: compact K notation ("1.2K", "1.8K", "2.3K", "1K")
 */
export function formatAddedCount(count: number): string {
  if (!count || count <= 0) return "0";
  if (count < 1000) {
    return count.toString();
  }
  const k = count / 1000;
  // Format with up to 1 decimal place, stripping trailing .0
  const formatted = k.toFixed(1).replace(/\.0$/, "");
  return `${formatted}K`;
}
