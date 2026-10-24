import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { DETAIL_LOCAL_CHATBOTS_DATA } from "@/lib/playbooks/local-chatbots-data";

export const metadata: Metadata = {
  title: "Sell AI Chatbots to 10 Local Businesses Without Hiring a Developer | Plugd",
  description: "The step-by-step agency playbook to build, pitch, and sell custom AI conversational assistants to high-ticket local service businesses for $1,500 upfront and $350/month recurring.",
  openGraph: {
    title: "Sell AI Chatbots to 10 Local Businesses Without Hiring a Developer | Plugd",
    description: "The step-by-step agency playbook to build, pitch, and sell custom AI conversational assistants to high-ticket local service businesses for $1,500 upfront and $350/month recurring.",
    url: "https://theplugd.com/sell-ai-chatbots-to-10-local-businesses-without-hiring-a-developer",
  },
};

export const dynamic = "force-dynamic";

export default async function ai_businesses_08DetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "sell-ai-chatbots-to-10-local-businesses-without-hiring-a-developer", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-08", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "men", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={DETAIL_LOCAL_CHATBOTS_DATA} hasAccess={hasAccess} />;
}
