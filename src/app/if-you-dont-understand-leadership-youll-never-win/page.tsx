import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { UNDERSTAND_LEADERSHIP_DETAIL } from "@/lib/playbooks/understand-leadership-never-win-detail";

export const metadata: Metadata = {
  title: "If You Don't Understand Leadership, You'll Never Win | Plugd",
  description: "A practical leadership guide to building high-performing teams, learn to delegate effectively, communicate with confidence, hire the right people, reward performance, and lead with clarity.",
  openGraph: {
    title: "If You Don't Understand Leadership, You'll Never Win | Plugd",
    description: "A practical leadership guide to building high-performing teams, learn to delegate effectively, communicate with confidence, hire the right people, reward performance, and lead with clarity.",
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
          (await hasUserAccessToCourse(customer.id, "if-you-dont-understand-leadership-youll-never-win", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-43", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={UNDERSTAND_LEADERSHIP_DETAIL} hasAccess={hasAccess} />;
}
