import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { ONE_PERSON_BUSINESS_DETAIL_DATA } from "@/lib/playbooks/one-person-business-detail";

export const metadata: Metadata = {
  title: "Build A One-Person Business As A Beginner (From $0 To $10K) | Plugd",
  description: "Build A One-Person Business As A Beginner (From $0 To $10K). Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "Build A One-Person Business As A Beginner (From $0 To $10K) | Plugd",
    description: "Build A One-Person Business As A Beginner (From $0 To $10K). Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "build-a-one-person-business-as-a-beginner-from-0-to-10k", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-08", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={ONE_PERSON_BUSINESS_DETAIL_DATA} hasAccess={hasAccess} />;
}
