import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SEVEN_PROVEN_WAYS_AI_NO_EXP_DETAIL } from "@/lib/playbooks/seven-proven-ways-ai-no-exp-detail";

export const metadata: Metadata = {
  title: "7 Proven Ways to Make Money With AI (No Experience) | Jack Robertson | Plugd",
  description: "Turn AI Tools Into a Profitable Service Business. Discover 6 practical AI-powered business models, land clients, deliver valuable results, and build recurring revenue without creating your own AI software.",
  openGraph: {
    title: "7 Proven Ways to Make Money With AI (No Experience) | Plugd",
    description: "Turn AI Tools Into a Profitable Service Business. Discover 6 practical AI-powered business models, land clients, deliver valuable results, and build recurring revenue without creating your own AI software.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "7-proven-ways-to-make-money-with-ai-no-experience", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-38", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={SEVEN_PROVEN_WAYS_AI_NO_EXP_DETAIL} hasAccess={hasAccess} />;
}
