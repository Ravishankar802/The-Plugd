"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ReferralModal from "@/components/ReferralModal";
import { Mail, ShieldCheck, Loader2, ArrowRight, RefreshCcw, CheckCircle2, AlertCircle } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
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
      setSuccessMsg("Payment successful! Enter your email to access your dashboard");
    }

    if (err === "not_paid") {
      setError("You need a paid account to access the dashboard");
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
      router.push("/vault");
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
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 text-white/50 hover:text-white text-sm font-mono transition-colors"
      >
        &larr; Back
      </Link>
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 -mt-12">
        <div className="bg-pill border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden group font-['Georgia',_serif]">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-selected/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <Link href="/" className="hover:opacity-80 transition-opacity group">
                <Image src="/logo.png" alt="Plugd" width={44} height={44} />
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2 text-foreground tracking-tight">
              {step === 1 ? "Login to Plugd" : "Check Your Email"}
            </h1>
            <p className="text-muted text-center mb-8 text-[0.95rem]">
              {step === 1 
                ? "Enter your email to access your Vault" 
                : `We sent a 4-digit code to ${email}`}
            </p>

            {successMsg && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm py-3 px-4 rounded-lg mb-6 text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {successMsg}
              </div>
            )}

            {!isRedirecting && error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm py-3 px-4 rounded-lg mb-6 text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-[54px] bg-pill border border-border rounded-xl pl-12 pr-4 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-selected transition-all text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[54px] bg-selected text-selected-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-selected/90 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Send Code <ArrowRight className="w-5 h-5" /></>}
                </button>

                <div className="mt-6 space-y-2 text-center text-[13px] text-muted leading-relaxed font-medium">
                  <p>
                    New here? <button type="button" onClick={() => setIsReferModalOpen(true)} className="text-foreground hover:text-selected transition-colors font-medium">Join Plugd</button> to start earning.
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-between gap-3 px-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      maxLength={1}
                      className="w-16 h-20 bg-pill border border-border rounded-xl text-center text-3xl font-bold text-foreground focus:outline-none focus:border-selected transition-all"
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
                    className="w-full h-[54px] bg-selected text-selected-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-selected/90 transition-all"
                  >
                    {(loading || isRedirecting) ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify Code"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendTimer > 0 || loading}
                      className="text-muted hover:text-selected text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                    >
                      <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend code"}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-muted hover:text-foreground text-sm transition-colors pt-2"
                  >
                    Change Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-50">
        <Footer toggleOnly={true} />
      </div>

      <ReferralModal 
        isOpen={isReferModalOpen} 
        onClose={() => setIsReferModalOpen(false)} 
        userEmail={email} 
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-selected" />
      </div>
    }>
      <div className="min-h-screen h-screen flex flex-col bg-background overflow-hidden">
        <LoginContent />
      </div>
    </Suspense>
  );
}
