"use client";

import { useState, useEffect } from "react";
import AccountStatusButtons from "./AccountStatusButtons";

interface ProfileStatusWrapperProps {
  accountId: number;
  size?: "sm" | "md";
}

export default function ProfileStatusWrapper({ accountId, size = "md" }: ProfileStatusWrapperProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [userStatuses, setUserStatuses] = useState<Record<number, string>>({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const email = localStorage.getItem("plugd_user_email");
    if (!email) return;

    setUserEmail(email);

    // Parallel fetch for speed
    Promise.all([
      fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      }).then(res => res.ok ? res.json() : null),
      fetch(`/api/status/${email}`).then(res => res.ok ? res.json() : [])
    ]).then(([authData, statusData]) => {
      if (authData?.status === "paid") {
        setIsPaidUser(true);
      }
      if (statusData) {
        const statusMap: Record<number, string> = {};
        statusData.forEach((s: any) => {
          statusMap[s.accountId] = s.status;
        });
        setUserStatuses(statusMap);
      }
    }).catch(err => console.error("Parallel fetch failed:", err));
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
