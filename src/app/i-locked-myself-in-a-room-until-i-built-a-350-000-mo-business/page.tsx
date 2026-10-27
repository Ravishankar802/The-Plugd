import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { LOCKED_IN_ROOM_350K_DETAIL_DATA } from "@/lib/playbooks/locked-in-room-350k-detail";

export const metadata: Metadata = {
  title: "I Locked Myself In a Room Until I Built a $350,000/mo Business | Plugd",
  description: "I Locked Myself In a Room Until I Built a $350,000/mo Business. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "I Locked Myself In a Room Until I Built a $350,000/mo Business | Plugd",
    description: "I Locked Myself In a Room Until I Built a $350,000/mo Business. Comprehensive slide decks and deep written lessons.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-14", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={LOCKED_IN_ROOM_350K_DETAIL_DATA} hasAccess={hasAccess} />;
}
