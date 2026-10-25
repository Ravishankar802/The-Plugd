import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { MASTER_HIGGSFIELD_AI_DETAIL } from "@/lib/playbooks/master-higgsfield-ai-tutorial-detail";

export const metadata: Metadata = {
  title: "Master Higgsfield AI in 20 Minutes (Beginner Tutorial) | Plugd",
  description: "A comprehensive beginner tutorial to mastering Higgsfield AI, image-to-video, and Cinema Studio consistent character pipelines.",
  openGraph: {
    title: "Master Higgsfield AI in 20 Minutes (Beginner Tutorial) | Plugd",
    description: "A comprehensive beginner tutorial to mastering Higgsfield AI, image-to-video, and Cinema Studio consistent character pipelines.",
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
          (await hasUserAccessToCourse(customer.id, "master-higgsfield-ai-in-20-minutes-beginner-tutorial", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-52", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={MASTER_HIGGSFIELD_AI_DETAIL} hasAccess={hasAccess} />;
}
