export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: "Bot" | "ShoppingBag" | "Flame" | "Briefcase" | "Video" | "Package" | "Globe" | "Link2" | "Heart";
  displayOrder: number;
}

export interface PlaybookSummary {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  currency: string;
  modulesCount: number;
  lessonsCount: number;
  hoursOfMaterial: string;
  href: string;
  badge?: string;
  accentColor?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "ai-automation",
    name: "AI & Automation",
    slug: "ai-automation",
    description: "Build automated workflows, deploy AI tools, and create software-leveraged income streams.",
    iconName: "Bot",
    displayOrder: 1,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    slug: "ecommerce",
    description: "Launch and scale storefronts with proven fulfillment, positioning, and merchandising playbooks.",
    iconName: "ShoppingBag",
    displayOrder: 2,
  },
  {
    id: "side-hustles",
    name: "Side Hustles",
    slug: "side-hustles",
    description: "Actionable, high-leverage income projects you can launch outside of a full-time career.",
    iconName: "Flame",
    displayOrder: 3,
  },
  {
    id: "freelancing",
    name: "Freelancing",
    slug: "freelancing",
    description: "Monetize high-demand skills, close premium clients, and transition from hourly work to retainers.",
    iconName: "Briefcase",
    displayOrder: 4,
  },
  {
    id: "content-creation",
    name: "Content Creation",
    slug: "content-creation",
    description: "Build an engaged audience, master organic distribution, and monetize media across platforms.",
    iconName: "Video",
    displayOrder: 5,
  },
  {
    id: "digital-products",
    name: "Digital Products",
    slug: "digital-products",
    description: "Package domain expertise into high-margin downloads, templates, frameworks, and tools.",
    iconName: "Package",
    displayOrder: 6,
  },
  {
    id: "online-business",
    name: "Online Business",
    slug: "online-business",
    description: "Systems, growth flywheels, and operational frameworks to build resilient Internet enterprises.",
    iconName: "Globe",
    displayOrder: 7,
  },
  {
    id: "affiliate-marketing",
    name: "Affiliate Marketing",
    slug: "affiliate-marketing",
    description: "Generate recurring commissions by matching targeted traffic with vetted, high-converting products.",
    iconName: "Link2",
    displayOrder: 8,
  },
  {
    id: "dating",
    name: "Dating",
    slug: "dating",
    description: "Real-world guides to attraction, interpersonal confidence, communication, and dating mastery.",
    iconName: "Heart",
    displayOrder: 9,
  },
];

export const DATING_PLAYBOOK_SUMMARY: PlaybookSummary = {
  id: "dating-playbook",
  slug: "men",
  title: "The Dating Playbook",
  headline: "Everything you need to understand attraction, build confidence, and get the girl you want.",
  description:
    "A practical, 10-module guide to understanding attraction, building confidence, meeting women, dating, and developing meaningful relationships.",
  categorySlug: "dating",
  categoryName: "Dating",
  price: 3,
  originalPrice: 49,
  currency: "USD",
  modulesCount: 10,
  lessonsCount: 69,
  hoursOfMaterial: "8.5 hours",
  href: "/men",
  badge: "Available Now",
  accentColor: "#f97316",
};

export const PLAYBOOKS: PlaybookSummary[] = [DATING_PLAYBOOK_SUMMARY];

export function getAllCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCategoryBySlug(rawSlug: string): Category | undefined {
  if (!rawSlug) return undefined;
  const normalized = rawSlug.trim().toLowerCase();
  return CATEGORIES.find(
    (c) =>
      c.slug === normalized ||
      (c.slug === "ecommerce" && normalized === "e-commerce") ||
      (c.slug === "ai-automation" && (normalized === "ai" || normalized === "automation"))
  );
}

export function getPlaybooksForCategory(categorySlug: string): PlaybookSummary[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return PLAYBOOKS.filter((p) => p.categorySlug === category.slug);
}

export function getAllPlaybooks(): PlaybookSummary[] {
  return PLAYBOOKS;
}
