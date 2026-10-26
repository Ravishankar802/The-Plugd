import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { STUDENT_HUSTLES_2027_DETAIL } from "@/lib/playbooks/seven-side-hustles-students-2027-detail";

export const metadata: Metadata = {
  title: "7 Side Hustles Students Can Start In 2027 | Plugd",
  description: "The battle-tested, zero-capital side hustle roadmap engineered specifically for students entering the 2027 digital economy.",
  openGraph: {
    title: "7 Side Hustles Students Can Start In 2027 | Plugd",
    description: "The battle-tested, zero-capital side hustle roadmap engineered specifically for students entering the 2027 digital economy.",
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
          (await hasUserAccessToCourse(customer.id, "7-side-hustles-students-can-start-in-2027", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-57", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={STUDENT_HUSTLES_2027_DETAIL} hasAccess={hasAccess} />;
}
