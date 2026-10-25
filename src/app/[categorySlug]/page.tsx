import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";
import CategoryPageClient from "@/components/CategoryPageClient";
import {
  CATEGORIES,
  getCategoryBySlug,
  getPlaybooksForCategory,
} from "@/lib/categories";
import { ALL_PLAYBOOK_SUMMARIES } from "@/lib/playbooks-catalog";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

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
      url: `https://theplugd.com/${category.slug}`,
      siteName: "Plugd",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Playbooks · Plugd`,
      description: category.description,
    },
  };
}

export default async function CategoryRoute({ params }: CategoryPageProps) {
  const { categorySlug } = await params;

  // Canonical redirect for /ecommerce -> /e-commerce
  if (categorySlug === "ecommerce") {
    redirect("/e-commerce");
  }

  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    const placeholderPlaybook = ALL_PLAYBOOK_SUMMARIES.find(
      (p) => p.slug === categorySlug
    );
    if (placeholderPlaybook) {
      redirect(`/coming-soon?playbook=${categorySlug}`);
    }
    notFound();
  }

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

  let playbooks = getPlaybooksForCategory(category.slug);

  if (playbooks.length === 0) {
    const matchingPlaybook = ALL_PLAYBOOK_SUMMARIES.find(
      (p) => p.slug === categorySlug || p.href === `/${categorySlug}`
    );
    if (matchingPlaybook) {
      playbooks = [matchingPlaybook];
    } else {
      redirect("/");
    }
  }

  return (
    <CategoryPageClient
      category={category}
      playbooks={playbooks}
      hasAccess={hasAccess}
    />
  );
}
