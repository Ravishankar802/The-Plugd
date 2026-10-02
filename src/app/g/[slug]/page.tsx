import { notFound } from "next/navigation";
import { getGiftBySlug, markGiftOpened } from "@/lib/gifts";
import RecipientExperienceClient from "@/components/RecipientExperienceClient";

interface RecipientPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: RecipientPageProps) {
  const { slug } = await params;
  const gift = await getGiftBySlug(slug);

  if (!gift) {
    return { title: "Plugd" };
  }

  const sender = gift.senderName || "Someone";
  return {
    title: `${sender} sent you something.`,
    description: "Open this in private.",
    openGraph: {
      title: `${sender} sent you something.`,
      description: "Open this in private.",
    },
  };
}

export default async function RecipientPage({ params }: RecipientPageProps) {
  const { slug } = await params;
  const gift = await getGiftBySlug(slug);

  if (!gift) {
    notFound();
  }

  // Mark opened in the background
  await markGiftOpened(slug);

  return (
    <RecipientExperienceClient
      gift={{
        slug: gift.slug,
        target: gift.target,
        recipientName: gift.recipientName,
        senderName: gift.senderName,
        customNote: gift.customNote,
        responseChoice: gift.responseChoice,
      }}
    />
  );
}
