import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  Bot,
  ShoppingBag,
  Flame,
  Briefcase,
  Video,
  Package,
  Globe,
  Link2,
  Heart,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import PlaybookCard from "@/components/PlaybookCard";
import {
  CATEGORIES,
  getCategoryBySlug,
  getPlaybooksForCategory,
} from "@/lib/categories";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

const ICON_MAP = {
  Bot,
  ShoppingBag,
  Flame,
  Briefcase,
  Video,
  Package,
  Globe,
  Link2,
  Heart,
};

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found · Plugd",
    };
  }

  return {
    title: `${category.name} Playbooks · Plugd`,
    description: category.description,
    openGraph: {
      title: `${category.name} Playbooks · Plugd`,
      description: category.description,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const playbooks = getPlaybooksForCategory(category.slug);

  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess = await hasUserAccessToCourse(customer.id, "men", customer.email);
      }
    }
  } catch (err) {
    console.error("[CATEGORY_AUTH_CHECK_ERROR]", err);
  }

  const IconComponent = ICON_MAP[category.iconName] || Globe;

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#1c1917] font-sans antialiased selection:bg-[#f97316] selection:text-white flex flex-col justify-between">
      <div>
        <Header variant="platform" hasAccess={hasAccess} />

        <main className="mx-auto max-w-[1200px] px-6 py-10 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#78716c] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1c1917] transition-colors">
              Plugd
            </Link>
            <ChevronRight className="h-3 w-3 text-[#a8a29e]" />
            <Link href="/#categories" className="hover:text-[#1c1917] transition-colors">
              Categories
            </Link>
            <ChevronRight className="h-3 w-3 text-[#a8a29e]" />
            <span className="text-[#1c1917] font-semibold">{category.name}</span>
          </nav>

          {/* Category Banner */}
          <div className="rounded-3xl border border-[#e7e5e4] bg-white p-8 sm:p-12 mb-12 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#fed7aa] bg-[#fff7ed] text-[#f97316]">
                  <IconComponent className="h-8 w-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#78716c] mb-1">
                    <span>Category {category.displayOrder} of 9</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
                    {category.name}
                  </h1>
                </div>
              </div>

              <Link
                href="/#categories"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#78716c] hover:text-[#1c1917] transition-colors rounded-full border border-[#e7e5e4] px-4 py-2 hover:border-[#1c1917]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Categories</span>
              </Link>
            </div>

            <p className="mt-6 text-base sm:text-lg text-[#44403c] max-w-3xl leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Playbook Listing Section */}
          {playbooks.length > 0 ? (
            <section aria-labelledby="available-playbooks-title">
              <div className="flex items-center justify-between mb-8 border-b border-[#e7e5e4] pb-4">
                <div>
                  <h2 id="available-playbooks-title" className="text-2xl font-bold tracking-tight text-[#1c1917]">
                    Available Playbooks
                  </h2>
                  <p className="mt-1 text-sm text-[#78716c]">
                    Practical, outcome-focused guides ready for immediate implementation.
                  </p>
                </div>

                <span className="text-xs font-mono font-semibold text-[#78716c] bg-[#faf8f5] border border-[#e7e5e4] px-3 py-1 rounded-full">
                  {playbooks.length} {playbooks.length === 1 ? "Playbook" : "Playbooks"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {playbooks.map((playbook) => (
                  <PlaybookCard key={playbook.id} playbook={playbook} />
                ))}
              </div>
            </section>
          ) : (
            /* Empty State */
            <section
              aria-labelledby="empty-category-title"
              className="rounded-3xl border border-dashed border-[#d6d3d1] bg-white/70 p-12 sm:p-16 text-center flex flex-col items-center justify-center max-w-2xl mx-auto"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e7e5e4] bg-[#faf8f5] text-[#78716c] mb-6">
                <Sparkles className="h-6 w-6 text-[#f97316]" />
              </div>

              <h2 id="empty-category-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917]">
                New Playbooks are on the way.
              </h2>

              <p className="mt-3 text-base text-[#57534e] max-w-lg leading-relaxed">
                We&apos;re currently developing actionable, outcome-focused Playbooks for{" "}
                <strong className="text-[#1c1917] font-semibold">{category.name}</strong>.
                Check back soon as new Playbooks are released.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/#categories" className="btn btn-primary">
                  <span className="btn-dot" aria-hidden="true" />
                  <span>Explore Other Categories</span>
                </Link>
                <Link href="/#playbooks" className="btn btn-surface">
                  <span>Browse Available Playbooks</span>
                </Link>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Platform Footer */}
      <footer className="border-t border-[#e7e5e4] bg-white py-10 mt-16 text-sm text-[#78716c]">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-[#1c1917] hover:text-[#78716c] transition-colors"
            >
              <span className="font-bold text-[16px]">Plugd</span>
            </Link>
            <span className="text-[#d6d3d1]">·</span>
            <span className="text-xs font-mono text-[#78716c]">Outcome-focused Playbooks</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[14px]">
            <Link href="/#categories" className="hover:text-[#1c1917] transition-colors">
              Categories
            </Link>
            <Link href="/#playbooks" className="hover:text-[#1c1917] transition-colors">
              Playbooks
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#1c1917] transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#1c1917] transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
