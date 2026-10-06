"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, Lock, Sparkles, ArrowRight, Loader2 } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseSlug?: "men" | "women";
}

export default function CheckoutModal({
  isOpen,
  onClose,
  defaultCourseSlug = "men",
}: CheckoutModalProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"men" | "women" | "bundle">(
    defaultCourseSlug || "men"
  );
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const getPrice = () => {
    if (selectedPlan === "bundle") return 79;
    return 49;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address to receive your playbook access.");
      return;
    }

    try {
      setLoading(true);

      const targetSlug = selectedPlan === "bundle" ? "men" : selectedPlan;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: targetSlug,
          isBundle: selectedPlan === "bundle",
          email: email.trim(),
          name: name.trim(),
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
        router.push(`/my-playbooks?purchased=${targetSlug}`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-scale-reveal">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#FAF8F5] p-6 sm:p-8 text-[#0E0E10] shadow-2xl border border-[#E6E1D7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-neutral-400 hover:bg-[#EFECE6] hover:text-[#0E0E10] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E1D7] bg-white px-3 py-1 text-[11px] font-mono tracking-wider text-[#646059] uppercase mb-3">
            <span className="h-2 w-2 rounded-full bg-[#FF5500]" />
            Direct Instant Access
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E10]">
            Get The Playbook
          </h2>
          <p className="mt-1 text-sm text-[#646059]">
            One-time purchase. Instant digital access. No subscriptions or hidden fees.
          </p>
        </div>

        {/* Course Option Selector */}
        <div className="space-y-3 mb-6">
          {/* For Men Option */}
          <div
            onClick={() => setSelectedPlan("men")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all ${
              selectedPlan === "men"
                ? "border-[#0E0E10] bg-white ring-1 ring-[#0E0E10] shadow-sm"
                : "border-[#E6E1D7] bg-[#F6F3ED] hover:border-neutral-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                    selectedPlan === "men"
                      ? "border-[#0E0E10] bg-[#0E0E10] text-white"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {selectedPlan === "men" && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0E0E10]">
                    HOW TO DATE THE HOTTEST WOMEN
                  </div>
                  <div className="text-xs text-[#646059]">For Men · 10 Modules · Complete Playbook</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-[#0E0E10]">$49</div>
                <div className="text-[10px] text-neutral-400 line-through">$129</div>
              </div>
            </div>
          </div>

          {/* For Women Option */}
          <div
            onClick={() => setSelectedPlan("women")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all ${
              selectedPlan === "women"
                ? "border-[#0E0E10] bg-white ring-1 ring-[#0E0E10] shadow-sm"
                : "border-[#E6E1D7] bg-[#F6F3ED] hover:border-neutral-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                    selectedPlan === "women"
                      ? "border-[#0E0E10] bg-[#0E0E10] text-white"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {selectedPlan === "women" && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0E0E10]">
                    HOW TO GET THE MAN OF YOUR DREAMS
                  </div>
                  <div className="text-xs text-[#646059]">For Women · 10 Modules · Complete Playbook</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-[#0E0E10]">$49</div>
                <div className="text-[10px] text-neutral-400 line-through">$129</div>
              </div>
            </div>
          </div>

          {/* Complete Bundle Option */}
          <div
            onClick={() => setSelectedPlan("bundle")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all relative overflow-hidden ${
              selectedPlan === "bundle"
                ? "border-[#FF5500] bg-white ring-1 ring-[#FF5500] shadow-sm"
                : "border-[#E6E1D7] bg-[#F6F3ED] hover:border-neutral-300"
            }`}
          >
            <div className="absolute right-0 top-0 bg-[#FF5500] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl uppercase font-mono">
              Save 20%
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                    selectedPlan === "bundle"
                      ? "border-[#FF5500] bg-[#FF5500] text-white"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {selectedPlan === "bundle" && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0E0E10] flex items-center gap-1.5">
                    <span>THE COMPLETE DUO BUNDLE</span>
                    <Sparkles className="h-3.5 w-3.5 text-[#FF5500]" />
                  </div>
                  <div className="text-xs text-[#646059]">Both Playbooks Included · All 20 Modules</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-[#0E0E10]">$79</div>
                <div className="text-[10px] text-neutral-400 line-through">$258</div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0E0E10] mb-1.5">
              Your Email Address (For Playbook Access)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full rounded-xl border border-[#E6E1D7] bg-white px-4 py-2.5 text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#0E0E10] focus:outline-none focus:ring-1 focus:ring-[#0E0E10]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0E0E10] mb-1.5">
              Your First Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex"
              className="w-full rounded-xl border border-[#E6E1D7] bg-white px-4 py-2.5 text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#0E0E10] focus:outline-none focus:ring-1 focus:ring-[#0E0E10]"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0E0E10] py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-neutral-800 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Preparing Your Playbook...</span>
              </>
            ) : (
              <>
                <span>Unlock Playbook · ${getPrice()}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-[#8E8A82]">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> Secure 256-Bit SSL
            </span>
            <span>•</span>
            <span>Permanent Lifetime Access</span>
            <span>•</span>
            <span>No Recurring Billing</span>
          </div>
        </form>
      </div>
    </div>
  );
}
