import { notFound } from "next/navigation";
import { getGiftBySlug } from "@/lib/gifts";
import { recordTemplateOwnership } from "@/lib/ownership";
import OrderSuccessClient from "@/components/OrderSuccessClient";

interface OrderPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ session_id?: string; owned?: string }>;
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

  // Safe fallback to ensure permanent template ownership is saved
  if (gift.customerId && gift.mood && gift.status === "PAID") {
    try {
      await recordTemplateOwnership({
        customerId: gift.customerId,
        templateId: gift.mood,
      });
    } catch (e) {
      // Ignored if already recorded
    }
  }

  return <OrderSuccessClient gift={gift} />;
}

