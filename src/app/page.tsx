import { Metadata } from "next";
import MarketplaceHomeClient from "@/components/marketplace/MarketplaceHomeClient";

export const metadata: Metadata = {
  title: "Plugd — Digital Experiences Worth Sending",
  description: "A marketplace of beautiful interactive templates for the person you can't stop thinking about. Buy once, own forever, send whenever.",
  openGraph: {
    title: "Plugd — Digital Experiences Worth Sending",
    description: "A marketplace of beautiful interactive templates for the person you can't stop thinking about. Buy once, own forever, send whenever.",
  },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <MarketplaceHomeClient />;
}
