import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { BECOME_MILLIONAIRE_2026_BLUEPRINT_DETAIL } from "@/lib/playbooks/become-millionaire-2026-full-blueprint-detail";

export const metadata: Metadata = {
  title: "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do | Plugd",
  description: "The definitive step-by-step master execution blueprint to build an unassailable seven-figure net worth in 2026 using modern leverage and asymmetric systems.",
  openGraph: {
    title: "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do | Plugd",
    description: "The definitive step-by-step master execution blueprint to build an unassailable seven-figure net worth in 2026 using modern leverage and asymmetric systems.",
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
          (await hasUserAccessToCourse(customer.id, "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-54", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={BECOME_MILLIONAIRE_2026_BLUEPRINT_DETAIL} hasAccess={hasAccess} />;
}
