import { redirect } from "next/navigation";

interface CategoryRedirectProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategorySingularRedirect({ params }: CategoryRedirectProps) {
  const { slug } = await params;
  redirect(`/categories/${slug}`);
}
