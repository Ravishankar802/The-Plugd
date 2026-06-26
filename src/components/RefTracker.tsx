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

      // Detect traffic source from referrer if not provided as query parameter
      let detectedSource = source;
      if (!detectedSource && typeof document !== "undefined" && document.referrer) {
        const ref = document.referrer.toLowerCase();
        if (ref.includes("whatsapp") || ref.includes("wa.me") || ref.includes("com.whatsapp")) {
          detectedSource = "whatsapp";
        } else if (ref.includes("telegram") || ref.includes("t.me") || ref.includes("org.telegram")) {
          detectedSource = "telegram";
        } else if (ref.includes("twitter") || ref.includes("x.com") || ref.includes("t.co")) {
          detectedSource = "x";
        } else if (ref.includes("reddit.com")) {
          detectedSource = "reddit";
        } else if (ref.includes("discord")) {
          detectedSource = "discord";
        } else if (ref.includes("instagram") || ref.includes("ig.me")) {
          detectedSource = "instagram";
        } else if (ref.includes("facebook") || ref.includes("fb.me")) {
          detectedSource = "facebook";
        } else if (ref.includes("linkedin") || ref.includes("lnkd.in")) {
          detectedSource = "linkedin";
        } else if (ref.includes("youtube.com") || ref.includes("youtu.be")) {
          detectedSource = "youtube";
        } else if (ref.includes("tiktok.com")) {
          detectedSource = "tiktok";
        } else if (ref.includes("threads.net")) {
          detectedSource = "threads";
        }
      }

      try {
        // Set cookie: plugd_ref=CODE; max-age=30 days; path=/
        document.cookie = `plugd_ref=${refCode}; max-age=2592000; path=/`;

        // Call tracking API
        await fetch("/api/promoters/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralCode: refCode, source: detectedSource }),
        });
      } catch (error) {
        console.error("Failed to track referral click:", error);
      }
    };

    trackClick();
  }, [refCode]);

  return null;
}
