"use client";

import { useState } from "react";
import { 
  X, 
  Copy, 
  Check, 
  AlertCircle, 
  ExternalLink,
  QrCode,
  Building,
  CheckCircle2
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  paymentSettings: {
    upiEnabled: boolean;
    upiId?: string | null;
    upiQrUrl?: string | null;
    bankEnabled: boolean;
    accountHolder?: string | null;
    accountNumber?: string | null;
    ifsc?: string | null;
    bankName?: string | null;
  } | null;
}

export default function PaymentModal({ isOpen, onClose, creatorName, paymentSettings }: PaymentModalProps) {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen || !paymentSettings) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const hasUpi = paymentSettings.upiEnabled && paymentSettings.upiId;
  const hasBank = paymentSettings.bankEnabled && paymentSettings.accountNumber;

  // Generate a valid UPI deep link
  const upiDeepLink = hasUpi 
    ? `upi://pay?pa=${encodeURIComponent(paymentSettings.upiId || "")}&pn=${encodeURIComponent(creatorName)}&cu=INR`
    : "";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/40">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">Support {creatorName}</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Your support goes directly to the creator.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
          
          {/* Main Notice */}
          <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4 text-xs leading-normal flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <p className="text-zinc-400">
              Plugd does not handle or route this payment. You will transfer the funds directly to the creator using their payment details below.
            </p>
          </div>

          {/* No payment options configured */}
          {!hasUpi && !hasBank && (
            <div className="text-center py-8 space-y-2">
              <span className="text-3xl">😕</span>
              <p className="font-bold text-zinc-300">No payment methods configured</p>
              <p className="text-xs text-zinc-500">{creatorName} hasn't enabled any payment options yet.</p>
            </div>
          )}

          {/* UPI Option */}
          {hasUpi && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" /> Pay via UPI
              </h4>

              {/* QR Image */}
              {paymentSettings.upiQrUrl && (
                <div className="bg-zinc-950/50 border border-zinc-850 p-4 rounded-2xl flex flex-col items-center gap-2 max-w-[200px] mx-auto shadow-inner">
                  <img 
                    src={paymentSettings.upiQrUrl} 
                    alt="UPI QR Code" 
                    className="w-36 h-36 object-contain bg-white rounded-lg p-1"
                  />
                  <span className="text-[10px] text-zinc-500 font-semibold">Scan with any UPI App</span>
                </div>
              )}

              {/* UPI ID display & copy */}
              <div className="space-y-2">
                <div className="flex items-center justify-between h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 font-mono font-medium text-xs">
                  <span className="text-zinc-200 select-all">{paymentSettings.upiId}</span>
                  <button
                    onClick={() => handleCopy(paymentSettings.upiId || "", "upiId")}
                    className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedField === "upiId" ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Open UPI App Deep Link */}
                {upiDeepLink && (
                  <a
                    href={upiDeepLink}
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-black font-extrabold rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs shadow-lg shadow-orange-500/5"
                  >
                    <span>Open UPI App</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Bank Transfer Option */}
          {hasBank && (
            <div className="space-y-3 border-t border-zinc-800 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" /> Pay via Bank Transfer
              </h4>

              {!showBankDetails ? (
                <button
                  type="button"
                  onClick={() => setShowBankDetails(true)}
                  className="w-full h-11 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-zinc-300 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Reveal Bank Transfer Details
                </button>
              ) : (
                <div className="space-y-4 bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl animate-in fade-in duration-200">
                  {/* Account Details list */}
                  <div className="space-y-3 font-sans">
                    {/* Bank Name */}
                    {paymentSettings.bankName && (
                      <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                        <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Bank Name</span>
                        <span className="text-xs font-bold text-zinc-200">{paymentSettings.bankName}</span>
                      </div>
                    )}

                    {/* Account Holder */}
                    <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                      <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Beneficiary</span>
                      <span className="text-xs font-bold text-zinc-200 select-all">{paymentSettings.accountHolder}</span>
                    </div>

                    {/* Account Number */}
                    <div className="flex items-center justify-between border-b border-zinc-900/60 pb-1.5">
                      <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">Account No</span>
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <span className="text-zinc-200 select-all font-bold">{paymentSettings.accountNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(paymentSettings.accountNumber || "", "bankAcc")}
                          className="text-zinc-500 hover:text-zinc-200 cursor-pointer"
                        >
                          {copiedField === "bankAcc" ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>

                    {/* IFSC */}
                    <div className="flex items-center justify-between pb-0.5">
                      <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">IFSC Code</span>
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <span className="text-zinc-200 select-all font-bold uppercase">{paymentSettings.ifsc}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(paymentSettings.ifsc || "", "bankIfsc")}
                          className="text-zinc-500 hover:text-zinc-200 cursor-pointer"
                        >
                          {copiedField === "bankIfsc" ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Safety Warning */}
                  <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 text-[10px] leading-normal text-zinc-500 flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <p>
                      You are paying the creator directly. Verify the recipient details in your payment app before confirming any transfer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
