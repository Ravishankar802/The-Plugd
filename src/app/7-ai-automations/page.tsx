import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { AI_AUTOMATIONS_DETAIL_DATA } from "@/lib/ai-automations-detail";

export const metadata: Metadata = {
  title: "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees) | Plugd",
  description:
    "Learn 7 accessible AI automation tools to save businesses time, offer simple services, and build real income streams. Practical, beginner-friendly walkthroughs.",
  openGraph: {
    title: "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees) | Plugd",
    description:
      "Learn 7 accessible AI automation tools to save businesses time, offer simple services, and build real income streams. Practical, beginner-friendly walkthroughs.",
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
