import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { DETAIL_AGENCY_BLUEPRINT_DATA } from "@/lib/playbooks/agency-blueprint-data";

export const metadata: Metadata = {
  title: "The 30-Day AI Agency Blueprint: From Zero Portfolio to Paying Clients | Plugd",
  description: "An exhaustive day-by-day tactical execution roadmap to build, launch, and sign your first 3 paying B2B clients in 30 days without past agency credentials.",
  openGraph: {
    title: "The 30-Day AI Agency Blueprint: From Zero Portfolio to Paying Clients | Plugd",
    description: "An exhaustive day-by-day tactical execution roadmap to build, launch, and sign your first 3 paying B2B clients in 30 days without past agency credentials.",
    url: "https://theplugd.com/the-30-day-ai-agency-blueprint-from-zero-portfolio-to-paying-clients",
  },
};

export const dynamic = "force-dynamic";

export default async function ai_businesses_05DetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "the-30-day-ai-agency-blueprint-from-zero-portfolio-to-paying-clients", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-05", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "men", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={DETAIL_AGENCY_BLUEPRINT_DATA} hasAccess={hasAccess} />;
}
