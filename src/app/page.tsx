import { Metadata } from "next";
import MarketplaceHomeClient from "@/components/marketplace/MarketplaceHomeClient";

export const metadata: Metadata = {
  title: "Templates · Plugd Marketplace",
  description: "Browse Beautiful interactive templates for the person you can't stop thinking about.",
  openGraph: {
    title: "Templates · Plugd Marketplace",
    description: "Browse Beautiful interactive templates for the person you can't stop thinking about.",
  },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <MarketplaceHomeClient />;
}
