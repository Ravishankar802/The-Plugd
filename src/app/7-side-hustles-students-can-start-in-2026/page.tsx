import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SIDE_HUSTLES_STUDENTS_2026_DETAIL } from "@/lib/playbooks/side-hustles-students-2026-detail";

export const metadata: Metadata = {
  title: "7 Side Hustles Students Can Start In 2026 | Plugd",
  description: "A battle-tested blueprint for students to generate $3,000 to $5,000/month around classes without upfront capital.",
  openGraph: {
    title: "7 Side Hustles Students Can Start In 2026 | Plugd",
    description: "A battle-tested blueprint for students to generate $3,000 to $5,000/month around classes without upfront capital.",
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
