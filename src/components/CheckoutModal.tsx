"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, Lock, Loader2 } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseSlug?: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
}: CheckoutModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address to receive your playbook access.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          courseSlug: "men",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate checkout");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push("/learn/men?purchased=men");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-scale-reveal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#FAF8F5] p-6 sm:p-8 text-[#0E0E10] shadow-2xl border border-[#E6E1D7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close checkout modal"
          className="absolute right-5 top-5 rounded-full p-2 text-neutral-400 hover:bg-[#EFECE6] hover:text-[#0E0E10] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FED7AA] bg-[#FFF7ED] px-3 py-1 text-[11px] font-mono tracking-wider text-[#FF5500] uppercase mb-3 font-bold">
            <span className="h-2 w-2 rounded-full bg-[#FF5500]" />
            Direct Instant Access
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E10]">
            Get The Dating Playbook
          </h2>
          <p className="mt-1 text-sm text-[#646059]">
            One-time purchase. Instant digital access. No subscriptions or hidden fees.
          </p>
        </div>

        {/* Product Card */}
        <div className="rounded-2xl border border-[#E6E1D7] bg-white p-5 sm:p-6 shadow-xs mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#FAF8F5] border border-[#E6E1D7] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#646059] mb-2">
                10 Modules · Complete Playbook
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0E0E10] leading-snug">
                The Dating Playbook
              </h3>
              <p className="mt-1.5 text-xs sm:text-[13px] text-[#646059] leading-relaxed">
                A practical, 10-module guide to understanding attraction, building confidence, meeting women, dating, and developing meaningful relationships.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl sm:text-3xl font-black text-[#0E0E10] tracking-tight">
                $3
              </div>
              <div className="text-[10px] font-mono font-bold text-[#8E8A82] uppercase mt-0.5">
                USD
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#F0EEE9] flex flex-wrap items-center justify-between gap-2 text-xs text-[#646059]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
              One-time payment
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              Instant digital access with lifetime access
            </span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="checkout-email" className="block text-xs font-semibold text-[#0E0E10]">
                Your Email Address
              </label>
              <span className="text-[11px] font-mono text-[#8E8A82]">Required</span>
            </div>
            <input
              id="checkout-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#E6E1D7] bg-white px-4 py-2.5 text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#0E0E10] focus:outline-none focus:ring-1 focus:ring-[#0E0E10] transition-colors"
            />
            <p className="mt-1.5 text-[11px] text-[#646059] leading-normal">
              Use the email for purchase verification and playbook access.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0E0E10] py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-neutral-800 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Preparing Your Playbook...</span>
              </>
            ) : (
              <>
                <span>Unlock The Dating Playbook · $3 →</span>
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] text-[#8E8A82]">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> Secure 256-Bit SSL
            </span>
            <span>•</span>
            <span>Instant Digital Access</span>
            <span>•</span>
            <span>Lifetime Access</span>
          </div>
        </form>
      </div>
    </div>
  );
}
