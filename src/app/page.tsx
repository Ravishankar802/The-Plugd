import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PlugdHomePageClient from "@/components/PlugdHomePageClient";
import { getAllCategories, getAllPlaybooks } from "@/lib/categories";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "Plugd — Your next move starts here",
  description:
    "Explore practical Playbooks for AI, online businesses, freelancing, digital products, and more. Step-by-step guides built for real-world execution.",
  openGraph: {
    title: "Plugd — Your next move starts here",
    description:
      "Explore practical Playbooks for AI, online businesses, freelancing, digital products, and more.",
    url: "https://theplugd.com",
    siteName: "Plugd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugd — Your next move starts here",
    description:
      "Explore practical Playbooks for AI, online businesses, freelancing, digital products, and more.",
  },
};

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams?: Promise<{
    checkout?: string;
    lesson?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = (await searchParams) || {};

  // If redirecting from a course or protected link with checkout=true, route to The Dating Playbook sales page checkout
  if (resolvedSearchParams.checkout === "true") {
    const lessonParam = resolvedSearchParams.lesson
      ? `&lesson=${encodeURIComponent(resolvedSearchParams.lesson)}`
      : "";
    redirect(`/men?checkout=true${lessonParam}`);
  }

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
    console.error("[HOME_AUTH_CHECK_ERROR]", err);
  }

  const categories = getAllCategories();
  const playbooks = getAllPlaybooks();

  return (
    <PlugdHomePageClient
      categories={categories}
      playbooks={playbooks}
      hasAccess={hasAccess}
    />
  );
}
