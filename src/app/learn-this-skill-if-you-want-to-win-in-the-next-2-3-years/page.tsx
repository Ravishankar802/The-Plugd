import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { LEARN_THIS_SKILL_DETAIL } from "@/lib/playbooks/learn-this-skill-win-next-years-detail";

export const metadata: Metadata = {
  title: "Learn This Skill If You Want To Win In The Next 2-3 Years | Plugd",
  description: "Master the psychology behind every sale, every connection, and every opportunity—understand people, communicate value, and persuade with confidence.",
  openGraph: {
    title: "Learn This Skill If You Want To Win In The Next 2-3 Years | Plugd",
    description: "Master the psychology behind every sale, every connection, and every opportunity—understand people, communicate value, and persuade with confidence.",
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
          (await hasUserAccessToCourse(customer.id, "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-25", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={LEARN_THIS_SKILL_DETAIL} hasAccess={hasAccess} />;
}
