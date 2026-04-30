"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    xHandle: "",
    avatarUrl: "",
    bio: "",
    niche: "Founder",
    followers: 0,
    email: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create account entry (unpaid)
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create account");
      const { accountId } = await res.json();

      // 2. Create checkout session
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });

      if (!checkoutRes.ok) throw new Error("Failed to create checkout session");
      const { url } = await checkoutRes.json();

      // 3. Redirect to payment
      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#111] border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Add Your Account</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#222] rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">X Handle (no @)</label>
              <input
                required
                type="text"
                placeholder="e.g. johndoe"
                className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                value={formData.xHandle}
                onChange={(e) => setFormData({ ...formData, xHandle: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Profile Pic URL</label>
            <input
              required
              type="url"
              placeholder="https://pbs.twimg.com/profile_images/..."
              className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted flex justify-between">
              <span>One-line Bio</span>
              <span className={formData.bio.length > 100 ? "text-red-500" : ""}>{formData.bio.length}/100</span>
            </label>
            <input
              required
              maxLength={100}
              type="text"
              placeholder="Founder at XYZ | Building in public"
              className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Niche</label>
              <select
                className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              >
                {["Founder", "Builder", "Student", "Creator", "Crypto", "Other"].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Follower count</label>
              <input
                required
                type="number"
                placeholder="1000"
                className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Email (for receipt)</label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-white hover:bg-white/90 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay $1 to Get Listed"}
          </button>
          
          <p className="text-center text-xs text-muted">
            Secure payment via Dodo Payments. Listing is automatic after success.
          </p>
        </form>
      </div>
    </div>
  );
}
