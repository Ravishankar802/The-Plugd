import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { DETAIL_AGENT_SOLUTIONS_DATA } from "@/lib/playbooks/agent-solutions-data";

export const metadata: Metadata = {
  title: "5 AI Agents You Can Build and Sell Without Training Your Own Model | Plugd",
  description: "Master the architectural blueprints, tool-calling schemas, and commercial playbooks to build and sell 5 autonomous AI agents to B2B clients.",
  openGraph: {
    title: "5 AI Agents You Can Build and Sell Without Training Your Own Model | Plugd",
    description: "Master the architectural blueprints, tool-calling schemas, and commercial playbooks to build and sell 5 autonomous AI agents to B2B clients.",
    url: "https://theplugd.com/5-ai-agents-you-can-build-and-sell-without-training-your-own-model",
  },
};

export const dynamic = "force-dynamic";

export default async function ai_businesses_03DetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "5-ai-agents-you-can-build-and-sell-without-training-your-own-model", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-03", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "men", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={DETAIL_AGENT_SOLUTIONS_DATA} hasAccess={hasAccess} />;
}
