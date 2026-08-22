"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Loader2, ArrowRight, RefreshCcw, CheckCircle2, AlertCircle } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    const success = searchParams.get("success");
    const err = searchParams.get("error");
    const message = searchParams.get("message");

    if (message) {
      setSuccessMsg(message);
    } else if (success === "true") {
      setSuccessMsg("Payment successful! Enter your email to access your Dashboard");
    }

    if (err === "unauthorized") {
      setError("Please log in to access the Dashboard");
    }
  }, [searchParams]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send code");
      }

      setStep(2);
      setResendTimer(60);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const code = otp.join("");
    if (code.length < 4) return;

    setLoading(true);
    setError("");
    let success = false;

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid or expired code");
      }

      success = true;
      setIsRedirecting(true);
      
      // If onboarding (no username set), redirect to dashboard where onboarding handles it.
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      if (!success) {
        setError(err.message);
      }
    } finally {
      if (!success) {
        setLoading(false);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }

    if (newOtp.every(digit => digit !== "") && index === 3) {
      setTimeout(() => {
        const btn = document.getElementById('verify-btn');
        btn?.click();
      }, 50);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    await handleSendOtp({ preventDefault: () => {} } as any);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 relative">
      <Link href="/" className="fixed top-4 left-6 z-50 hover:opacity-80 transition-opacity">
        <Image src="/logo.png" alt="Plugd" width={64} height={64} className="cursor-pointer" />
      </Link>
      
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 -mt-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group font-sans">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-center mb-2 text-zinc-100 tracking-tight">
              {step === 1 ? "Get Started" : "Check Your Email"}
            </h1>
            <p className="text-zinc-400 text-center mb-8 text-sm">
              {step === 1 
                ? "Enter your email to log in or create a new creator account." 
                : `We sent a 4-digit verification code to ${email}`}
            </p>

            {successMsg && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs py-3 px-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {successMsg}
              </div>
            )}

            {!isRedirecting && error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-14 bg-zinc-950 border border-zinc-855 rounded-xl pl-12 pr-4 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-orange-500 transition-all text-base font-semibold"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-orange-500 text-black rounded-xl font-extrabold text-base flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50 cursor-pointer shadow-orange-500/5"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-black" />
                  ) : (
                    <>Send Code <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center gap-2 sm:gap-3 px-1 sm:px-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      maxLength={1}
                      className="w-12 h-16 sm:w-16 sm:h-20 bg-zinc-950 border border-zinc-855 rounded-xl text-center text-2xl sm:text-3xl font-extrabold text-zinc-100 focus:outline-none focus:border-orange-500 transition-all"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      required
                    />
                  ))}
                </div>
                
                <div className="space-y-4">
                  <button
                    id="verify-btn"
                    type="submit"
                    disabled={loading || isRedirecting || otp.some(d => !d)}
                    className="w-full h-14 bg-orange-500 text-black rounded-xl font-extrabold text-base flex items-center justify-center gap-2 hover:bg-orange-600 transition-all cursor-pointer"
                  >
                    {(loading || isRedirecting) ? (
                      <Loader2 className="w-5 h-5 animate-spin text-black" />
                    ) : (
                      "Verify Code"
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendTimer > 0 || loading}
                      className="text-zinc-500 hover:text-orange-500 text-xs font-bold transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend code"}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-zinc-500 hover:text-zinc-300 text-xs font-bold transition-colors pt-2 cursor-pointer"
                  >
                    Change Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    }>
      <div className="min-h-screen h-screen flex flex-col bg-zinc-950 overflow-hidden text-zinc-100">
        <LoginContent />
      </div>
    </Suspense>
  );
}
