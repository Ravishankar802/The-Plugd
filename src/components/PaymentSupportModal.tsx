"use client";

import { useState } from "react";
import { X, ExternalLink, Copy, Check, QrCode } from "lucide-react";

interface PaymentSupportModalProps {
  open: boolean;
  onClose: () => void;
  creatorName: string;
  username: string;
  paymentLink?: string | null;
  paymentQr?: string | null;
}

export default function PaymentSupportModal({
  open,
  onClose,
  creatorName,
  username,
  paymentLink,
  paymentQr,
}: PaymentSupportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = async () => {
    if (!paymentLink) return;
    try {
      await navigator.clipboard.writeText(paymentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const isQrImage = paymentQr && (
    paymentQr.startsWith("/uploads/") ||
    paymentQr.startsWith("http://") ||
    paymentQr.startsWith("https://") ||
    paymentQr.startsWith("data:image/")
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center pt-2 pb-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 mb-3 shadow-xs">
            <QrCode className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-zinc-900">
            Support {creatorName}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Send support or gift toward items on @{username}&apos;s wishlist.
          </p>
        </div>

        {/* QR Code Section (if present) */}
        {isQrImage && (
          <div className="my-3 flex flex-col items-center justify-center rounded-2xl border border-zinc-200/90 bg-zinc-50 p-4">
            <img
              src={paymentQr!}
              alt={`Payment QR code for ${creatorName}`}
              className="h-48 w-48 object-contain rounded-xl border border-zinc-200 bg-white p-2 shadow-xs"
            />
            <p className="mt-2.5 text-[11px] font-semibold text-zinc-500 text-center">
              Scan with your preferred payment or UPI app
            </p>
          </div>
        )}

        {/* Payment Link Section */}
        {paymentLink ? (
          <div className="space-y-3 pt-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-zinc-700 truncate min-w-0">
                {paymentLink}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 p-1.5 rounded-lg text-zinc-500 hover:text-orange-600 hover:bg-white transition"
                title="Copy link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl bg-orange-500 font-extrabold text-sm text-black flex items-center justify-center gap-1.5 shadow-xs hover:bg-orange-600 transition active:scale-[0.99]"
            >
              <span>Open Payment Link</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <p className="text-center text-[10px] text-zinc-400 pt-1">
              100% Direct Payment • Plugd takes 0% cut on gifts & support
            </p>
          </div>
        ) : !isQrImage ? (
          <div className="py-6 text-center text-xs text-zinc-500">
            {creatorName} hasn&apos;t added a payment link yet.
          </div>
        ) : (
          <p className="text-center text-[10px] text-zinc-400 pt-1">
            100% Direct Payment • Plugd takes 0% cut on gifts & support
          </p>
        )}
      </div>
    </div>
  );
}
