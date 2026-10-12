"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, RefreshCw, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";

interface PendingPurchaseViewProps {
  courseSlug: string;
  courseTitle: string;
}

export default function PendingPurchaseView({
  courseSlug,
  courseTitle,
}: PendingPurchaseViewProps) {
  const [checking, setChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Verifying payment confirmation with Dodo Payments..."
  );
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const checkStatus = async () => {
    try {
      setChecking(true);
      const res = await fetch(`/api/customer/check-ownership?courseSlug=${courseSlug}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.owned) {
          setIsConfirmed(true);
          setStatusMessage("Payment verified! Redirecting to your syllabus...");
          window.location.href = `/learn/${courseSlug}`;
          return true;
        }
      }
    } catch {
      // Ignore network errors during polling
    } finally {
      setChecking(false);
    }
    return false;
  };

  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts += 1;
      const verified = await checkStatus();
      if (verified || attempts >= 15) {
        clearInterval(interval);
        if (!verified && attempts >= 15) {
          setTimedOut(true);
          setStatusMessage(
            "Confirmation is taking longer than expected. Please check your email or refresh shortly."
          );
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [courseSlug]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0E0E10] font-sans antialiased selection:bg-[#FF5500] selection:text-white">
      <div className="fixed inset-0 bg-subtle-grid opacity-70 pointer-events-none -z-10" />

      <Header activeCourse={courseSlug} />

      <main className="mx-auto max-w-xl px-4 sm:px-6 py-20 sm:py-28 text-center">
        <div className="rounded-3xl border border-[#E6E1D7] bg-white p-8 sm:p-12 shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF7ED] border border-[#FED7AA]">
            {isConfirmed ? (
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            ) : (
              <Loader2 className="h-8 w-8 animate-spin text-[#FF5500]" />
            )}
          </div>

          <span className="inline-block rounded-full bg-[#FAF8F5] border border-[#E6E1D7] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#FF5500] mb-3">
            {isConfirmed ? "Access Verified" : "Processing Payment"}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E10] mb-3">
            {isConfirmed ? "Welcome to The Dating Playbook" : "Confirming Your Purchase"}
          </h1>

          <p className="text-sm text-[#646059] leading-relaxed mb-8 max-w-md mx-auto">
            {statusMessage}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => checkStatus()}
              disabled={checking || isConfirmed}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0E0E10] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-neutral-800 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${checking ? "animate-spin" : ""}`} />
              <span>{checking ? "Checking..." : "Refresh Status"}</span>
            </button>

            {timedOut && (
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-[#E6E1D7] bg-[#FAF8F5] px-6 py-3.5 text-sm font-semibold text-[#0E0E10] transition-colors hover:bg-[#EFECE6]"
              >
                Return to Home
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
