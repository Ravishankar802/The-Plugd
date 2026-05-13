"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ClaimButtonProps {
  xHandle: string;
}

export default function ClaimButton({ xHandle }: ClaimButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    setLoading(true);
    try {
      const referralCode = searchParams.get("ref") || "";
      const checkoutUrl = `https://www.checkout.dodopayments.com/buy/pdt_0NduKJ5KdWe8CXogjNol1?quantity=1&redirect_url=${encodeURIComponent(`https://the-plugd.vercel.app/login?message=Payment successful! Enter the email you used for payment to access your dashboard`)}&showDiscounts=false&metadata_claimHandle=${xHandle}${referralCode ? `&metadata_referralCode=${referralCode}` : ''}`;
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClaim}
      disabled={loading}
      className="px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Claim this account"}
    </button>
  );
}
