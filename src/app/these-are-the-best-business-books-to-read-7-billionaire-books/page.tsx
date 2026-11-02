import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { BEST_BUSINESS_BOOKS_DETAIL } from "@/lib/playbooks/best-business-books-7-billionaires-detail";

export const metadata: Metadata = {
  title: "These Are The Best Business Books To Read (7 Billionaire Books) | Plugd",
  description: "Seven influential business books distilled into one practical playbook on building successful businesses. Learn the principles of great entrepreneurs, investors, and leaders to make smarter decisions and create lasting value.",
  openGraph: {
    title: "These Are The Best Business Books To Read (7 Billionaire Books) | Plugd",
    description: "Seven influential business books distilled into one practical playbook on building successful businesses. Learn the principles of great entrepreneurs, investors, and leaders to make smarter decisions and create lasting value.",
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
          (await hasUserAccessToCourse(customer.id, "these-are-the-best-business-books-to-read-7-billionaire-books", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-48", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={BEST_BUSINESS_BOOKS_DETAIL} hasAccess={hasAccess} />;
}
