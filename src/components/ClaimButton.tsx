"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClaimButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        // Logged in
        alert("Account claiming is coming soon! Since you are logged in, we have noted your interest.");
      } else {
        // Not logged in
        router.push("/login?redirect=claim");
      }
    } catch (err) {
      router.push("/login?redirect=claim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClaim}
      disabled={loading}
      className="px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
    >
      {loading ? "Checking..." : "Claim this account"}
    </button>
  );
}
