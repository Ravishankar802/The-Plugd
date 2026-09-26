"use client";

import { useState } from "react";
import {
  X,
  Check,
  Sparkles,
  Lock,
  Globe,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { MONETIZATION_PLANS } from "@/lib/subscription";

interface UnlockSharingModalProps {
  open: boolean;
  onClose: () => void;
  username?: string;
  onSuccess?: () => void;
}

export default function UnlockSharingModal({
  open,
  onClose,
  username,
  onSuccess,
}: UnlockSharingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to start checkout");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const monthly = MONETIZATION_PLANS.MONTHLY;
  const yearly = MONETIZATION_PLANS.YEARLY;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-zinc-100 text-zinc-900 transition-all max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center pt-1 pb-4">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Globe className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">
            Unlock Public Wishlist Sharing
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto">
            Make your wishlist visible to everyone, share your personal link, and let friends surprise you with gifts.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Plan Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
          {/* Monthly Option */}
          <div
            onClick={() => setSelectedPlan("MONTHLY")}
            className={`relative rounded-2xl p-4 border-2 cursor-pointer transition-all ${
              selectedPlan === "MONTHLY"
                ? "border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20 shadow-sm"
                : "border-zinc-200 hover:border-zinc-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Monthly
              </span>
              <div
                className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === "MONTHLY"
                    ? "border-orange-500 bg-orange-500"
                    : "border-zinc-300"
                }`}
              >
                {selectedPlan === "MONTHLY" && <Check className="h-3 w-3 text-black stroke-[3]" />}
              </div>
            </div>
            <div className="text-2xl font-black text-zinc-900">
              ₹39
              <span className="text-xs font-semibold text-zinc-500"> / mo</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Billed monthly. Cancel anytime.
            </p>
          </div>

          {/* Yearly Option */}
          <div
            onClick={() => setSelectedPlan("YEARLY")}
            className={`relative rounded-2xl p-4 border-2 cursor-pointer transition-all ${
              selectedPlan === "YEARLY"
                ? "border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20 shadow-sm"
                : "border-zinc-200 hover:border-zinc-300 bg-white"
            }`}
          >
            <div className="absolute -top-2.5 right-3 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-black shadow-xs">
              Save ~36%
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Yearly
              </span>
              <div
                className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === "YEARLY"
                    ? "border-orange-500 bg-orange-500"
                    : "border-zinc-300"
                }`}
              >
                {selectedPlan === "YEARLY" && <Check className="h-3 w-3 text-black stroke-[3]" />}
              </div>
            </div>
            <div className="text-2xl font-black text-zinc-900">
              ₹299
              <span className="text-xs font-semibold text-zinc-500"> / yr</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Less than ₹25 / month. Best value.
            </p>
          </div>
        </div>

        {/* Features Included */}
        <div className="rounded-2xl bg-zinc-50 p-4 space-y-2 text-xs text-zinc-700 border border-zinc-100">
          <p className="font-bold text-zinc-900 mb-2">What you get:</p>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
            <span>
              Public wishlist at <strong>theplugd.com/{username || "yourname"}</strong>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
            <span>Share your link on WhatsApp, Instagram, and social bio</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
            <span>Direct supporter gifting via your UPI & QR code</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
            <span>
              <strong>100% direct payments</strong> — Plugd takes <strong>₹0 commission</strong> on your gifts
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
            <span>If you ever cancel, your items and wishlist remain completely safe</span>
          </div>
        </div>

        {/* Direct Payment Note */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-orange-50/70 p-3 text-[11px] text-orange-950 border border-orange-100">
          <ShieldCheck className="h-4 w-4 text-orange-600 shrink-0" />
          <span>
            Plugd never touches supporter gifts. All payments sent to you go 100% directly to your UPI/QR.
          </span>
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-orange-500 font-extrabold text-sm text-black shadow-md hover:bg-orange-600 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-black" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>
                  Unlock Sharing for {selectedPlan === "YEARLY" ? "₹299 / year" : "₹39 / month"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-zinc-400">
            Secure checkout via Dodo Payments • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
