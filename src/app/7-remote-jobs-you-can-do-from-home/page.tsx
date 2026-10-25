import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SEVEN_REMOTE_JOBS_DETAIL } from "@/lib/playbooks/seven-remote-jobs-from-home-detail";

export const metadata: Metadata = {
  title: "7 Remote Jobs You Can Do From Home | Plugd",
  description: "A practical guide to landing high-paying, location-independent remote roles with real utility and career leverage.",
  openGraph: {
    title: "7 Remote Jobs You Can Do From Home | Plugd",
    description: "A practical guide to landing high-paying, location-independent remote roles with real utility and career leverage.",
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
          (await hasUserAccessToCourse(customer.id, "7-remote-jobs-you-can-do-from-home", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-46", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={SEVEN_REMOTE_JOBS_DETAIL} hasAccess={hasAccess} />;
}
