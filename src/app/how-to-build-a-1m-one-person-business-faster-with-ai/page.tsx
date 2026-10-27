import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { BUILD_1M_SOLO_FASTER_DETAIL } from "@/lib/playbooks/build-1m-one-person-faster-ai-detail";

export const metadata: Metadata = {
  title: "How To Build A $1M One-Person Business Faster With AI | Plugd",
  description: "The complete operating blueprint to architect, scale, and automate a $1,000,000/year one-person empire with AI leverage.",
  openGraph: {
    title: "How To Build A $1M One-Person Business Faster With AI | Plugd",
    description: "The complete operating blueprint to architect, scale, and automate a $1,000,000/year one-person empire with AI leverage.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-build-a-1m-one-person-business-faster-with-ai", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-26", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={BUILD_1M_SOLO_FASTER_DETAIL} hasAccess={hasAccess} />;
}
