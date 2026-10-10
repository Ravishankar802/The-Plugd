import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import MyPlaybooksClient from "@/components/MyPlaybooksClient";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "My Playbooks · The Dating Playbook",
  description: "Access your purchased digital dating and attraction playbooks.",
};

export const dynamic = "force-dynamic";

export default async function MyPlaybooksPage() {
  // Server-side Authorization Check
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess = await hasUserAccessToCourse(customer.id, "men", customer.email);
      }
    }
  } catch (err) {
    console.error("[MY_PLAYBOOKS_AUTH_ERROR]", err);
  }

  if (!hasAccess) {
    redirect("/?checkout=true");
  }

  redirect("/learn/men");
}
