"use client";

import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";

interface VerifyConfirmFormProps {
  token: string;
}

export default function VerifyConfirmForm({ token }: VerifyConfirmFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.error === "expired_or_invalid") {
          setError("This sign-in link has expired or has already been used. Please request a new link.");
        } else if (data.error === "no_access") {
          setError("No active course purchase was found for this account.");
        } else {
          setError("Unable to complete sign-in. Please try requesting a new link.");
        }
        setIsSubmitting(false);
        return;
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        window.location.href = "/learn/men";
      }
    } catch {
      setError("A network error occurred. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleConfirm} action="/api/auth/verify" method="POST" className="space-y-4">
      <input type="hidden" name="token" value={token} />

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs leading-relaxed text-red-800 text-left">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1c1917] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#292524] disabled:opacity-50 cursor-pointer shadow-xs"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Signing you in...</span>
          </>
        ) : (
          <>
            <span>Sign in to Playbook</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
