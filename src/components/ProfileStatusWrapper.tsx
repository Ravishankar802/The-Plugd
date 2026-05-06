"use client";

import { useState, useEffect } from "react";
import AccountStatusButtons from "./AccountStatusButtons";

interface ProfileStatusWrapperProps {
  accountId: number;
  size?: "sm" | "md";
  initialStatus?: string | null;
  initialIsPaid?: boolean;
  initialEmail?: string | null;
}

export default function ProfileStatusWrapper({ 
  accountId, 
  size = "md",
  initialStatus,
  initialIsPaid = false,
  initialEmail = null
}: ProfileStatusWrapperProps) {
  const [userEmail, setUserEmail] = useState<string | null>(initialEmail);
  const [isPaidUser, setIsPaidUser] = useState(initialIsPaid);
  const [userStatuses, setUserStatuses] = useState<Record<number, string>>(
    initialStatus ? { [accountId]: initialStatus } : {}
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    async function checkAuth() {
      try {
        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          const userData = await meRes.json();
          setUserEmail(userData.email);
          setIsPaidUser(userData.isPaid);

          // Fetch Statuses
          const statusRes = await fetch("/api/status");
          if (statusRes.ok) {
            const data = await statusRes.json();
            const statusMap: Record<number, string> = {};
            data.forEach((s: any) => {
              statusMap[s.accountId] = s.status;
            });
            setUserStatuses(statusMap);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }
    checkAuth();
  }, []);



  if (!hasMounted) {
    return (
      <div className="flex items-center gap-2.5 opacity-30">
        <div className={`${size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'} rounded-full border border-border bg-pill`} />
        <div className={`${size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'} rounded-full border border-border bg-pill`} />
        <div className={`${size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'} rounded-full border border-border bg-pill`} />
      </div>
    );
  }

  return (
    <AccountStatusButtons
      accountId={accountId}
      currentStatus={userStatuses[accountId]}
      isPaidUser={isPaidUser}
      userEmail={userEmail}
      size={size}
      onStatusChange={(newStatus) => {
        setUserStatuses(prev => {
          const next = { ...prev };
          if (newStatus) next[accountId] = newStatus;
          else delete next[accountId];
          return next;
        });
      }}
    />
  );
}
