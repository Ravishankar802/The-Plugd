import { notFound } from "next/navigation";
import { getGiftBySlug } from "@/lib/gifts";
import OrderSuccessClient from "@/components/OrderSuccessClient";

interface OrderPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ session_id?: string }>;
}

export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
  searchParams,
}: OrderPageProps) {
  const { slug } = await params;
  const gift = await getGiftBySlug(slug);

  if (!gift) {
    notFound();
  }

  return <OrderSuccessClient gift={gift} />;
}
