import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Plugd — Premium Digital Dating & Attraction Playbooks",
  description:
    "Two complete digital playbooks for becoming significantly better at attraction, dating, and relationships. 100% slide-based lessons.",
  openGraph: {
    title: "Plugd — Premium Digital Dating & Attraction Playbooks",
    description:
      "Two practical, deeply researched digital playbooks. How to Get the Man of Your Dreams (For Women) & How to Date the Hottest Women (For Men).",
  },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <HomePageClient />;
}
