import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { AI_AUTOMATIONS_DETAIL_DATA } from "@/lib/ai-automations-detail";

export const metadata: Metadata = {
  title: "These 3 AI Will Make You $10k+/Month (With Zero Employees) | Plugd",
  description:
    "Explore three practical ways to build a lean, AI-powered business: an AI automation agency, an AI content agency, and an AI shadow-operating business. Learn how to find paying clients, create valuable offers, build repeatable systems, and use AI to handle research, production, and operations more efficiently. Discover how to partner with creators, turn their expertise into digital products, and structure revenue-sharing agreements. Includes practical workflows, outreach scripts, AI prompts, pricing frameworks, operating templates, and a 90-day roadmap to help you launch and grow.",
  openGraph: {
    title: "These 3 AI Will Make You $10k+/Month (With Zero Employees) | Plugd",
    description:
      "Explore three practical ways to build a lean, AI-powered business: an AI automation agency, an AI content agency, and an AI shadow-operating business. Learn how to find paying clients, create valuable offers, build repeatable systems, and use AI to handle research, production, and operations more efficiently. Discover how to partner with creators, turn their expertise into digital products, and structure revenue-sharing agreements. Includes practical workflows, outreach scripts, AI prompts, pricing frameworks, operating templates, and a 90-day roadmap to help you launch and grow.",
  },
};

export const dynamic = "force-dynamic";

export default async function AIAutomationsDetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "7-ai-automations", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-01", customer.email));
      }
    }
  } catch (err) {
    console.error("[7_AI_AUTOMATIONS_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={AI_AUTOMATIONS_DETAIL_DATA} hasAccess={hasAccess} />;
}
