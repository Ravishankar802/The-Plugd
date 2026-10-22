import { redirect } from "next/navigation";

interface CategoryLegacyProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryLegacyRedirect({ params }: CategoryLegacyProps) {
  const { slug } = await params;
  const targetSlug = slug === "ecommerce" ? "e-commerce" : slug;
  redirect(`/${targetSlug}`);
}
