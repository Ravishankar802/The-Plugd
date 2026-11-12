import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { ONLY_INVESTING_VIDEO_100_DETAIL } from "@/lib/playbooks/only-investing-video-100-detail";

export const metadata: Metadata = {
  title: "The Only Investing Guide You'll Ever Need (Start With $100) | Jiho Kim | Plugd",
  description: "The Beginner’s Investing Playbook is your no-nonsense guide to understanding five popular investment options, mastering the basics of risk and returns, and making your first investment with confidence.",
  openGraph: {
    title: "The Only Investing Video You'll Ever Need (Start With $100) | Plugd",
    description: "The Beginner’s Investing Playbook is your no-nonsense guide to understanding five popular investment options, mastering the basics of risk and returns, and making your first investment with confidence.",
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
          (await hasUserAccessToCourse(customer.id, "the-only-investing-video-youll-ever-need-start-with-100", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-37", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={ONLY_INVESTING_VIDEO_100_DETAIL} hasAccess={hasAccess} />;
}
