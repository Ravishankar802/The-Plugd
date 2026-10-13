"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface LoginFormProps {
  initialError?: string;
}

export default function LoginForm({ initialError }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(() => {
    if (initialError === "expired_or_invalid") {
      return "Your sign-in link has expired or has already been used. Please enter your email below to request a new link.";
    }
    if (initialError === "invalid_token") {
      return "The sign-in link was invalid or malformed. Please enter your email below to request a new link.";
    }
    if (initialError === "no_access") {
      return "No purchase of The Dating Playbook was found for this email address. Please make sure you enter the email you used at checkout.";
    }
    if (initialError === "server_error") {
      return "An error occurred while verifying your sign-in link. Please request a new one.";
    }
    return null;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Unable to send sign-in link. Please try again.");
        return;
      }

      setIsSubmitted(true);
      setSubmittedEmail(cleanEmail);
    } catch {
      setErrorMessage("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-[#e7e5e4] bg-white p-8 sm:p-10 shadow-sm text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fef3c7] text-[#f59e0b]">
          <CheckCircle2 className="h-7 w-7 text-[#f97316]" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1c1917]">
          Check your email
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#78716c]">
          If an account with{" "}
          <strong className="text-[#1c1917] font-semibold">{submittedEmail}</strong> has
          purchased The Dating Playbook, a sign-in link has been sent.
        </p>
        <div className="mt-6 rounded-xl bg-[#faf8f5] p-4 text-left text-xs leading-relaxed text-[#78716c] border border-[#f5f5f4]">
          <p className="font-semibold text-[#1c1917] mb-1">What to do next:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Click the link in the email to sign in directly.</li>
            <li>The link is single-use and expires in 15 minutes.</li>
            <li>Check your spam or promotions folder if you don&apos;t see it shortly.</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setEmail("");
            }}
            className="text-xs font-semibold text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
          >
            ← Use a different email address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#e7e5e4] bg-white p-8 sm:p-10 shadow-sm">
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#faf8f5] border border-[#e7e5e4]">
          <Mail className="h-5 w-5 text-[#f97316]" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1c1917]">
          Sign in to your playbook
        </h1>
        <p className="mt-2 text-sm text-[#78716c]">
          Enter the email address you used when purchasing to receive a secure sign-in link.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs leading-relaxed text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-2"
          >
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-[#e7e5e4] bg-[#faf8f5] px-4 py-3 text-sm text-[#1c1917] placeholder-[#a8a29e] outline-none transition-all focus:border-[#1c1917] focus:bg-white focus:ring-1 focus:ring-[#1c1917]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1c1917] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#292524] disabled:opacity-50 cursor-pointer shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending sign-in link...</span>
            </>
          ) : (
            <>
              <span>Send sign-in link</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-[#f5f5f4] pt-6 text-center text-xs text-[#a8a29e]">
        <span>Don&apos;t have The Dating Playbook yet? </span>
        <Link
          href="/"
          className="font-semibold text-[#1c1917] hover:text-[#f97316] transition-colors"
        >
          Get it for $3
        </Link>
      </div>
    </div>
  );
}
