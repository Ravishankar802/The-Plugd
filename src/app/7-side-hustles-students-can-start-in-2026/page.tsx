import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SIDE_HUSTLES_STUDENTS_2026_DETAIL } from "@/lib/playbooks/side-hustles-students-2026-detail";

export const metadata: Metadata = {
  title: "7 Side Hustles Students Can Start In 2026 | Plugd",
  description: "Stop chasing ideas. Find a proven business model, make it yours, and build your way to $10K/month.",
  openGraph: {
    title: "7 Side Hustles Students Can Start In 2026 | Plugd",
    description: "Stop chasing ideas. Find a proven business model, make it yours, and build your way to $10K/month.",
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
          (await hasUserAccessToCourse(customer.id, "7-side-hustles-students-can-start-in-2026", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-34", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={SIDE_HUSTLES_STUDENTS_2026_DETAIL} hasAccess={hasAccess} />;
}
