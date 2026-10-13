import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createHash } from "crypto";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import VerifyConfirmForm from "@/components/VerifyConfirmForm";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { AlertCircle, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Confirm Sign In · The Dating Playbook",
  description: "Confirm your sign-in to The Dating Playbook.",
};

interface VerifyPageProps {
  searchParams?: Promise<{
    token?: string;
  }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
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
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
  }

  const resolvedParams = (await searchParams) || {};
  const token = typeof resolvedParams.token === "string" ? resolvedParams.token.trim() : "";

  // Validate token format
  const isValidFormat = Boolean(token && /^[0-9a-f]{64}$/i.test(token));

  let isValidToken = false;
  if (isValidFormat) {
    // Read-only inspection: does not consume or mutate the token
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const otpRecord = await prisma.otpToken.findFirst({
      where: {
        code: hashedToken,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (otpRecord) {
      isValidToken = true;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f6f4] text-[#1c1917]">
      <Header isLanding={false} />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-[#e7e5e4] bg-white p-8 sm:p-10 shadow-sm text-center">
          {isValidToken ? (
            <>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fef3c7] text-[#f59e0b]">
                <ShieldCheck className="h-7 w-7 text-[#f97316]" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1c1917]">
                Confirm your sign in
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#78716c] mb-6">
                Click below to complete your sign-in to The Dating Playbook and continue your lessons.
              </p>
              <VerifyConfirmForm token={token} />
              <div className="mt-6 border-t border-[#f5f5f4] pt-4 text-xs text-[#a8a29e]">
                <span>This sign-in link is single-use and will expire after use.</span>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertCircle className="h-7 w-7 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1c1917]">
                Invalid or expired link
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#78716c] mb-6">
                This sign-in link is invalid, has expired, or has already been used. Please request a new link to sign in.
              </p>
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1c1917] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#292524] shadow-xs"
              >
                Request a new sign-in link
              </Link>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-[#e7e5e4] bg-[#faf8f5] py-8 text-center text-xs text-[#78716c]">
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
