import { redirect } from "next/navigation";

interface CategorySingularProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategorySingularRedirect({ params }: CategorySingularProps) {
  const { slug } = await params;
  const targetSlug = slug === "ecommerce" ? "e-commerce" : slug;
  redirect(`/${targetSlug}`);
}
