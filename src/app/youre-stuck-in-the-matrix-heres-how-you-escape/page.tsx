import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { STUCK_IN_MATRIX_ESCAPE_DETAIL } from "@/lib/playbooks/stuck-in-matrix-escape-detail";

export const metadata: Metadata = {
  title: "You're Stuck In The Matrix, Here's How You Escape | Plugd",
  description: "Deconstruct the societal programming running in your head and build sovereign financial and cognitive autonomy.",
  openGraph: {
    title: "You're Stuck In The Matrix, Here's How You Escape | Plugd",
    description: "Deconstruct the societal programming running in your head and build sovereign financial and cognitive autonomy.",
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
          (await hasUserAccessToCourse(customer.id, "youre-stuck-in-the-matrix-heres-how-you-escape", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-29", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={STUCK_IN_MATRIX_ESCAPE_DETAIL} hasAccess={hasAccess} />;
}
