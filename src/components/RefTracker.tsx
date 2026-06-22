"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RefTracker() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");
  const source = searchParams.get("src") || searchParams.get("source");

  useEffect(() => {
    if (!refCode) return;

    const trackClick = async () => {
      // Check cookies for existing ref
      const cookies = document.cookie.split("; ");
      const existingRef = cookies.find(row => row.startsWith("plugd_ref="))?.split("=")[1];

      // Skip if already tracked for this ref code
      if (existingRef === refCode) return;

      try {
        // Set cookie: plugd_ref=CODE; max-age=30 days; path=/
        document.cookie = `plugd_ref=${refCode}; max-age=2592000; path=/`;

        // Call tracking API
        await fetch("/api/promoters/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralCode: refCode, source }),
        });
      } catch (error) {
        console.error("Failed to track referral click:", error);
      }
    };

    trackClick();
  }, [refCode]);

  return null;
}
