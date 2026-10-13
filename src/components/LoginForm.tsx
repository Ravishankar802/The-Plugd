"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, ArrowLeft, RefreshCw } from "lucide-react";

interface LoginFormProps {
  initialError?: string;
}

export default function LoginForm({ initialError }: LoginFormProps) {
  // Step 1 = email input; Step 2 = 6-digit code input
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError || null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "code" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Focus first OTP input when transitioning to code step
  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Handle email submission (Request Code)
  const handleEmailSubmit = async (e: React.FormEvent) => {
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

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "Unable to send verification code. Please try again.");
        return;
      }

      // Transition to code entry step
      setStep("code");
      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    } catch {
      setErrorMessage("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP digit changes
  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    const digit = cleaned.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance focus to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keydown for navigation and backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste of 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);

    // Focus on the next empty box, or the last box
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // Handle OTP verification submission
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otp.join("");

    if (fullCode.length !== 6 || !/^\d{6}$/.test(fullCode)) {
      setErrorMessage("Please enter all 6 digits of your verification code.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: fullCode }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "Verification failed. Please check your code and try again.");
        setIsSubmitting(false);
        return;
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        window.location.href = "/learn/men";
      }
    } catch {
      setErrorMessage("A network error occurred. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  // Handle resend code
  const handleResend = async () => {
    if (!canResend || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "Unable to resend code. Please try again.");
        return;
      }

      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "code") {
    return (
      <div className="w-full max-w-md rounded-2xl border border-[#e7e5e4] bg-white p-8 sm:p-10 shadow-sm">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fef3c7] text-[#f59e0b]">
            <ShieldCheck className="h-6 w-6 text-[#f97316]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1c1917]">
            Enter verification code
          </h1>
          <p className="mt-2 text-sm text-[#78716c]">
            We sent a 6-digit code to{" "}
            <strong className="text-[#1c1917] font-semibold">{email}</strong>
          </p>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setErrorMessage(null);
            }}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Use a different email</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs leading-relaxed text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleVerifySubmit} className="space-y-6">
          <div>
            <label className="block text-center text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-3">
              6-digit code
            </label>
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete="one-time-code"
                  value={digit}
                  disabled={isSubmitting}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="h-12 w-11 sm:h-14 sm:w-12 rounded-xl border border-[#e7e5e4] bg-[#faf8f5] text-center text-xl font-bold text-[#1c1917] outline-none transition-all focus:border-[#1c1917] focus:bg-white focus:ring-1 focus:ring-[#1c1917] disabled:opacity-50"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || otp.join("").length !== 6}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1c1917] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#292524] disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying code...</span>
              </>
            ) : (
              <>
                <span>Verify & Sign in</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-[#f5f5f4] pt-4 text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f97316] hover:text-[#ea580c] transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Resend code</span>
            </button>
          ) : (
            <span className="text-xs text-[#a8a29e]">
              Resend code in {countdown}s
            </span>
          )}
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
          Enter the email address you used when purchasing to receive your 6-digit verification code.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs leading-relaxed text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="space-y-4">
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
              <span>Sending verification code...</span>
            </>
          ) : (
            <>
              <span>Send verification code</span>
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
