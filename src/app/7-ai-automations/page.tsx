import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { AI_AUTOMATIONS_DETAIL_DATA } from "@/lib/ai-automations-detail";

export const metadata: Metadata = {
  title: "7 AI Automations That Could Make You $10,000+ Each | Plugd",
  description:
    "Master 7 enterprise-grade AI automation architectures capable of delivering $10,000+ in business value. Complete blueprints, system architectures, and production workflows.",
  openGraph: {
    title: "7 AI Automations That Could Make You $10,000+ Each | Plugd",
    description:
      "Master 7 enterprise-grade AI automation architectures capable of delivering $10,000+ in business value. Complete blueprints, system architectures, and production workflows.",
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
