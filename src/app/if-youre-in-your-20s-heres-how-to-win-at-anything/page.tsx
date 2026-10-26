import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { WIN_IN_20S_DETAIL } from "@/lib/playbooks/win-in-your-20s-at-anything-detail";

export const metadata: Metadata = {
  title: "If You're In Your 20s, Here's How To Win (At Anything) | Plugd",
  description: "The definitive operating manual for 20-somethings to weaponize biological leverage, master asymmetric skills, and win relentlessly.",
  openGraph: {
    title: "If You're In Your 20s, Here's How To Win (At Anything) | Plugd",
    description: "The definitive operating manual for 20-somethings to weaponize biological leverage, master asymmetric skills, and win relentlessly.",
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
          (await hasUserAccessToCourse(customer.id, "if-youre-in-your-20s-heres-how-to-win-at-anything", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-55", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={WIN_IN_20S_DETAIL} hasAccess={hasAccess} />;
}
