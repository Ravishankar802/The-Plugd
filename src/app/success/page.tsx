import { redirect } from "next/navigation";
import { getGiftBySlug } from "@/lib/gifts";

interface SuccessPageProps {
  searchParams: Promise<{ slug?: string; id?: string; session_id?: string }>;
}

export const dynamic = "force-dynamic";

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { slug, id } = await searchParams;

  if (slug) {
    redirect(`/order/${slug}`);
  }

  redirect("/");
}
