import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Log in · The Dating Playbook",
  description: "Sign in to access your lifetime copy of The Dating Playbook.",
};

interface LoginPageProps {
  searchParams?: Promise<{
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // If the customer already has an active, valid session, redirect directly to the course
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        const hasAccess = await hasUserAccessToCourse(customer.id, "men", customer.email);
        if (hasAccess) {
          redirect("/learn/men");
        }
      }
    }
  } catch (err: any) {
    // Re-throw redirect exceptions from next/navigation
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
  }

  const resolvedSearchParams = (await searchParams) || {};
  const error = resolvedSearchParams.error;

  return (
    <div className="flex min-h-screen flex-col bg-[#e7e4dd] text-[#1c1917]">
      <Header isLanding={false} />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <LoginForm initialError={error} />
      </main>

      <footer className="border-t border-[#dcd8d0] bg-[#ded9d0] py-8 text-center text-xs text-[#57534e]">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} The Dating Playbook. Lifetime access.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#1c1917] transition-colors">
              Home
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#1c1917] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#1c1917] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
