import { ALL_PLAYBOOK_SUMMARIES } from "./playbooks-catalog";

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
  thumbnail?: string;
  publishedAt?: string;
  rating?: number;
  ratingCount?: number | string;
}

export const CATEGORIES: Category[] = [
  {
    id: "ai-businesses",
    name: "AI Businesses",
    slug: "ai-businesses",
    description: "Build software-leveraged tools, agency services, and scalable AI solutions.",
    iconName: "Bot",
    displayOrder: 1,
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    slug: "e-commerce",
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
    id: "online-income",
    name: "Online Income",
    slug: "online-income",
    description: "Systematic approaches to generating reliable income online.",
    iconName: "Globe",
    displayOrder: 4,
  },
  {
    id: "creator-economy",
    name: "Creator Economy",
    slug: "creator-economy",
    description: "Audience monetization, sponsorship strategy, and digital creator business models.",
    iconName: "Video",
    displayOrder: 5,
  },
  {
    id: "personal-branding",
    name: "Personal Branding",
    slug: "personal-branding",
    description: "Establish domain authority, attract high-value opportunities, and build an influential presence.",
    iconName: "Briefcase",
    displayOrder: 6,
  },
  {
    id: "remote-work",
    name: "Remote Work",
    slug: "remote-work",
    description: "Land high-paying remote roles, master distributed productivity, and build global careers.",
    iconName: "Globe",
    displayOrder: 7,
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    slug: "lead-generation",
    description: "B2B prospecting, client acquisition systems, and high-converting sales pipelines.",
    iconName: "Link2",
    displayOrder: 8,
  },
  {
    id: "micro-saas",
    name: "Micro-SaaS",
    slug: "micro-saas",
    description: "Build and bootstrap focused software products with high recurring revenue.",
    iconName: "Package",
    displayOrder: 9,
  },
  {
    id: "online-marketplace",
    name: "Online Marketplace",
    slug: "online-marketplace",
    description: "Platform business models, multi-sided network effects, and marketplace growth.",
    iconName: "ShoppingBag",
    displayOrder: 10,
  },
  {
    id: "reselling",
    name: "Reselling",
    slug: "reselling",
    description: "Product flipping, retail arbitrage, and high-margin inventory sourcing.",
    iconName: "Package",
    displayOrder: 11,
  },
  {
    id: "paid-communities",
    name: "Paid Communities",
    slug: "paid-communities",
    description: "Launch recurring-revenue membership communities, mastermind groups, and cohorts.",
    iconName: "Flame",
    displayOrder: 12,
  },
  {
    id: "local-business",
    name: "Local Business",
    slug: "local-business",
    description: "Offline and service-based business growth, digital lead gen, and local market domination.",
    iconName: "Briefcase",
    displayOrder: 13,
  },
  {
    id: "digital-publishing",
    name: "Digital Publishing",
    slug: "digital-publishing",
    description: "Monetize digital media, specialized reports, ebooks, and content assets.",
    iconName: "Package",
    displayOrder: 14,
  },
  {
    id: "newsletter-business",
    name: "Newsletter Business",
    slug: "newsletter-business",
    description: "Build curated publications, grow subscriber lists, and monetize via sponsorships and subscriptions.",
    iconName: "Link2",
    displayOrder: 15,
  },
  {
    id: "dating",
    name: "Dating",
    slug: "dating",
    description: "Real-world guides to attraction, interpersonal confidence, communication, and dating mastery.",
    iconName: "Heart",
    displayOrder: 16,
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
  badge: "Bestseller",
  rating: 4.7,
  ratingCount: "1,201",
  accentColor: "#2563eb",
  thumbnail: "/dating-couple-collage.png",
  publishedAt: "2026-10-18T10:00:00Z",
};

export const PLAYBOOKS: PlaybookSummary[] = ALL_PLAYBOOK_SUMMARIES;

export function getAllCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCategoryBySlug(rawSlug: string): Category | undefined {
  if (!rawSlug) return undefined;
  const normalized = rawSlug.trim().toLowerCase();
  return CATEGORIES.find(
    (c) =>
      c.slug === normalized ||
      (c.slug === "e-commerce" && (normalized === "ecommerce" || normalized === "e-commerce")) ||
      (c.slug === "ai-businesses" && (normalized === "ai-automation" || normalized === "ai" || normalized === "automation"))
  );
}

export function getPlaybooksForCategory(categorySlug: string): PlaybookSummary[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return PLAYBOOKS.filter(
    (p) =>
      p.categorySlug === category.slug ||
      (category.slug === "e-commerce" && (p.categorySlug === "ecommerce" || p.categorySlug === "e-commerce"))
  );
}

export function getAllPlaybooks(): PlaybookSummary[] {
  return PLAYBOOKS;
}
