"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ProfileActionsProps {
  handle: string;
}

export default function ProfileActions({ handle }: ProfileActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `https://the-plugd.vercel.app/u/${handle}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 px-6 py-2.5 bg-transparent border border-border text-foreground rounded-lg font-bold hover:bg-accent transition-all active:scale-[0.98] cursor-pointer w-full sm:w-auto min-w-[120px] justify-center"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Share
          </>
        )}
      </button>
      <Link 
        href={`https://x.com/${handle}`}
        target="_blank"
        className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background border border-foreground rounded-lg font-bold hover:opacity-90 transition-all active:scale-[0.98] w-full sm:w-auto min-w-[140px] justify-center"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Follow on X
      </Link>
    </div>
  );
}
