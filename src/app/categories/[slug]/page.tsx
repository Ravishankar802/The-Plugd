import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";
import PlugdHomePageClient from "@/components/PlugdHomePageClient";
import {
  CATEGORIES,
  getCategoryBySlug,
  getAllPlaybooks,
} from "@/lib/categories";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

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

  const playbooks = getAllPlaybooks();

  return (
    <PlugdHomePageClient
      playbooks={playbooks}
      hasAccess={hasAccess}
      initialCategorySlug={category.slug}
    />
  );
}
