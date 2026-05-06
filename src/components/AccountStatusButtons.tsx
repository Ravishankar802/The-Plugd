"use client";

import { Check, Bookmark, X } from "lucide-react";
import { useState, useEffect } from "react";

interface AccountStatusButtonsProps {
  accountId: number;
  currentStatus?: string;
  isPaidUser: boolean;
  userEmail: string | null;
  onStatusChange?: (newStatus: string | null) => void;
  size?: "sm" | "md";
}

export default function AccountStatusButtons({
  accountId,
  currentStatus: initialStatus,
  isPaidUser,
  userEmail,
  onStatusChange,
  size = "md"
}: AccountStatusButtonsProps) {
  const [status, setStatus] = useState<string | null>(initialStatus || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStatus(initialStatus || null);
  }, [initialStatus]);

  const handleStatusClick = async (newStatus: string) => {
    if (!isPaidUser || !userEmail) return;

    const previousStatus = status;
    const isToggleOff = status === newStatus;
    const optimisticStatus = isToggleOff ? null : newStatus;

    // Optimistic Update
    setStatus(optimisticStatus);
    onStatusChange?.(optimisticStatus);

    try {
      if (isToggleOff) {
        const res = await fetch("/api/status", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userEmail, accountId })
        });
        if (!res.ok) throw new Error("Failed to delete status");
      } else {
        const res = await fetch("/api/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userEmail, accountId, status: newStatus })
        });
        if (!res.ok) throw new Error("Failed to set status");
      }
    } catch (err) {
      console.error("Status update failed, reverting:", err);
      // Revert on failure
      setStatus(previousStatus);
      onStatusChange?.(previousStatus);
      alert("Failed to update status. Please try again.");
    }
  };

  const isDisabled = !isPaidUser || !userEmail;
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const buttonSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
      {/* Followed ✅ */}
      <div className="relative group/tooltip">
        <button
          onClick={() => handleStatusClick("followed")}
          disabled={isDisabled}
          title={isDisabled ? "Available for paid users" : ""}
          className={`${buttonSize} rounded-full border border-border flex items-center justify-center transition-all ${
            isDisabled 
              ? "text-muted opacity-30 cursor-not-allowed bg-pill" 
              : status === "followed"
                ? "bg-green-500/20 border-green-500 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                : "text-muted hover:border-green-500/50 hover:text-green-500/50 bg-pill cursor-pointer"
          }`}
        >
          <Check className={iconSize} />
        </button>
        {!isDisabled && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] shadow-xl">
            Followed
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
          </div>
        )}
      </div>

      {/* Saved 🔖 */}
      <div className="relative group/tooltip">
        <button
          onClick={() => handleStatusClick("saved")}
          disabled={isDisabled}
          title={isDisabled ? "Available for paid users" : ""}
          className={`${buttonSize} rounded-full border border-border flex items-center justify-center transition-all ${
            isDisabled 
              ? "text-muted opacity-30 cursor-not-allowed bg-pill" 
              : status === "saved"
                ? "bg-orange-500/20 border-orange-500 text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                : "text-muted hover:border-orange-500/50 hover:text-orange-500/50 bg-pill cursor-pointer"
          }`}
        >
          <Bookmark className={iconSize} />
        </button>
        {!isDisabled && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] shadow-xl">
            Save
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
          </div>
        )}
      </div>

      {/* Not Interested ✕ */}
      <div className="relative group/tooltip">
        <button
          onClick={() => handleStatusClick("not_interested")}
          disabled={isDisabled}
          title={isDisabled ? "Available for paid users" : ""}
          className={`${buttonSize} rounded-full border border-border flex items-center justify-center transition-all ${
            isDisabled 
              ? "text-muted opacity-30 cursor-not-allowed bg-pill" 
              : status === "not_interested"
                ? "bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                : "text-muted hover:border-red-500/50 hover:text-red-500/50 bg-pill cursor-pointer"
          }`}
        >
          <X className={iconSize} />
        </button>
        {!isDisabled && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] shadow-xl">
            Not Interested
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
