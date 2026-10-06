import { Metadata } from "next";
import MyPlaybooksClient from "@/components/MyPlaybooksClient";

export const metadata: Metadata = {
  title: "My Playbooks · Plugd",
  description: "Access your purchased digital dating and attraction playbooks.",
};

export const dynamic = "force-dynamic";

export default function MyPlaybooksPage() {
  return <MyPlaybooksClient />;
}
