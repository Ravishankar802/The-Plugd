import CategoryPage from "../page";

export const dynamic = "force-dynamic";

interface SubcategoryPageProps {
  params: Promise<{ slug: string; sub: string }> | { slug: string; sub: string };
  searchParams?: Promise<{ q?: string; child?: string; gender?: string }> | { q?: string; child?: string; gender?: string };
}

export default async function SubcategoryPage({ params, searchParams }: SubcategoryPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  return CategoryPage({
    params: Promise.resolve({ slug: resolvedParams.slug }),
    searchParams: Promise.resolve({ ...resolvedSearchParams, sub: resolvedParams.sub }),
  });
}
