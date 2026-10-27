import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { BORING_MILLIONAIRES_2026_DETAIL_DATA } from "@/lib/playbooks/boring-millionaires-2026-detail";

export const metadata: Metadata = {
  title: "It's Boring, But Will Make Even Beginners Millionaires in 2026 | Plugd",
  description: "It's Boring, But Will Make Even Beginners Millionaires in 2026. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "It's Boring, But Will Make Even Beginners Millionaires in 2026 | Plugd",
    description: "It's Boring, But Will Make Even Beginners Millionaires in 2026. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "its-boring-but-will-make-even-beginners-millionaires-in-2026", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-13", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={BORING_MILLIONAIRES_2026_DETAIL_DATA} hasAccess={hasAccess} />;
}
