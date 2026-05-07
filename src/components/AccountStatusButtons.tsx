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

  const StatusButton = ({ type, icon: Icon, label, activeColor, activeShadow }: any) => {
    const isSelected = status === type;
    
    return (
      <div className="relative group/btn-tooltip">
        <button
          onClick={() => !isDisabled && handleStatusClick(type)}
          className={`${buttonSize} rounded-full border border-border flex items-center justify-center transition-all relative ${
            isDisabled 
              ? "text-muted/40 bg-pill cursor-not-allowed grayscale" 
              : isSelected
                ? `${activeColor} border-current ${activeShadow}`
                : "text-muted hover:border-foreground/30 hover:text-foreground/70 bg-pill cursor-pointer"
          }`}
        >
          <Icon className={iconSize} />
          
          {isDisabled && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = "/?modal=add";
              }}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background rounded-full flex items-center justify-center border border-background shadow-lg cursor-pointer hover:scale-110 transition-transform z-20"
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm3 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
              </svg>
            </div>
          )}
        </button>

        {/* Button Specific Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded opacity-0 group-hover/btn-tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] shadow-xl">
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex items-center gap-2.5 w-full h-full min-h-[40px]" onClick={(e) => e.stopPropagation()}>
      <StatusButton 
        type="followed" 
        icon={Check} 
        label="Followed" 
        activeColor="bg-green-500/20 text-green-500" 
        activeShadow="shadow-[0_0_10px_rgba(34,197,94,0.3)]"
      />
      <StatusButton 
        type="saved" 
        icon={Bookmark} 
        label="Save" 
        activeColor="bg-orange-500/20 text-orange-500" 
        activeShadow="shadow-[0_0_10px_rgba(249,115,22,0.3)]"
      />
      <StatusButton 
        type="not_interested" 
        icon={X} 
        label="Not Interested" 
        activeColor="bg-red-500/20 text-red-500" 
        activeShadow="shadow-[0_0_10px_rgba(239,68,68,0.3)]"
      />
    </div>
  );
}
