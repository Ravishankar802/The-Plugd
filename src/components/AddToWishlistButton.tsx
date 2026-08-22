"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Check, Loader2 } from "lucide-react";

interface AddToWishlistButtonProps {
  catalogItemId: string;
  isLoggedIn: boolean;
  compact?: boolean;
}

export default function AddToWishlistButton({
  catalogItemId,
  isLoggedIn,
  compact = false,
}: AddToWishlistButtonProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login?message=Log%20in%20to%20add%20items%20to%20your%20wishlist");
      return;
    }

    if (status === "loading" || status === "added") {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ catalogItemId }),
      });

      if (response.ok || response.status === 409) {
        setStatus("added");
        router.refresh();
        setTimeout(() => {
          setStatus("added");
        }, 2000);
        return;
      }

      setStatus("idle");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      className={`group/btn inline-flex w-full items-center justify-center gap-1.5 rounded-2xl text-xs font-bold transition-all ${
        compact ? "h-9 px-3" : "h-10 px-4"
      } ${
        status === "added"
          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
          : "bg-zinc-950 text-white hover:bg-orange-500 hover:text-black shadow-sm"
      }`}
    >
      {status === "loading" ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Adding...</span>
        </>
      ) : status === "added" ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span>Added to Wishlist</span>
        </>
      ) : (
        <>
          <Plus className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
          <span>Add to Wishlist</span>
        </>
      )}
    </button>
  );
}
