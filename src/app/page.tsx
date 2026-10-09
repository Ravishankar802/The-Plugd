import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "The Dating Playbook — Everything you need to get a girl",
  description:
    "Learn how to attract women, build confidence, and get the girl you want. Practical lessons on attraction, confidence, flirting, texting, and dating.",
  openGraph: {
    title: "The Dating Playbook — Everything you need to get a girl",
    description:
      "Learn how to attract women, build confidence, and get the girl you want. Instant digital access. One-time payment. Lifetime access.",
  },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <HomePageClient />;
}
