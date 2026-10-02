import { notFound } from "next/navigation";
import { getGiftBySlug, markGiftOpened } from "@/lib/gifts";
import ExperienceContainer from "@/components/experiences/ExperienceContainer";

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
    title: `${sender} made you a website.`,
    description: "A private corner of the internet. Open this on your phone.",
    openGraph: {
      title: `${sender} made you a website.`,
      description: "A private corner of the internet. Open this on your phone.",
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
    <ExperienceContainer
      gift={{
        slug: gift.slug,
        target: gift.target,
        mood: gift.mood,
        recipientName: gift.recipientName,
        senderName: gift.senderName,
        customNote: gift.customNote,
        responseChoice: gift.responseChoice,
      }}
    />
  );
}
