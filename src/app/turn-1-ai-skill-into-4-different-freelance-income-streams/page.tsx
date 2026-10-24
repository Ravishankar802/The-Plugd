import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { DETAIL_FREELANCE_INCOME_DATA } from "@/lib/playbooks/freelance-income-data";

export const metadata: Metadata = {
  title: "Turn 1 AI Skill Into 4 Different Freelance Income Streams | Plugd",
  description: "Learn how to master one high-leverage AI capability and monetize it across four independent cash flow streams to build a diversified $12,000/month freelance business.",
  openGraph: {
    title: "Turn 1 AI Skill Into 4 Different Freelance Income Streams | Plugd",
    description: "Learn how to master one high-leverage AI capability and monetize it across four independent cash flow streams to build a diversified $12,000/month freelance business.",
    url: "https://theplugd.com/turn-1-ai-skill-into-4-different-freelance-income-streams",
  },
};

export const dynamic = "force-dynamic";

export default async function ai_businesses_04DetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "turn-1-ai-skill-into-4-different-freelance-income-streams", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-04", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "men", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={DETAIL_FREELANCE_INCOME_DATA} hasAccess={hasAccess} />;
}
