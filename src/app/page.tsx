import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PlugdHomePageClient from "@/components/PlugdHomePageClient";
import { getAllPlaybooks } from "@/lib/categories";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "Plugd — Discover Practical Playbooks",
  description:
    "Discover practical, outcome-focused Playbooks across AI, online business, freelancing, digital products, and more.",
  openGraph: {
    title: "Plugd — Discover Practical Playbooks",
    description:
      "Discover practical, outcome-focused Playbooks across AI, online business, freelancing, digital products, and more.",
    url: "https://theplugd.com",
    siteName: "Plugd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugd — Discover Practical Playbooks",
    description:
      "Discover practical, outcome-focused Playbooks across AI, online business, freelancing, digital products, and more.",
  },
};

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams?: Promise<{
    checkout?: string;
    lesson?: string;
    category?: string;
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

  // Canonical redirect if category query param is passed
  if (resolvedSearchParams.category) {
    const targetSlug =
      resolvedSearchParams.category === "ecommerce"
        ? "e-commerce"
        : resolvedSearchParams.category;
    redirect(`/${targetSlug}`);
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

  const playbooks = getAllPlaybooks();

  return (
    <PlugdHomePageClient
      playbooks={playbooks}
      hasAccess={hasAccess}
    />
  );
}
