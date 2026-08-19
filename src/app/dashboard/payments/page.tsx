"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Loader2, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  QrCode,
  Building
} from "lucide-react";

export default function PaymentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // UPI settings
  const [upiEnabled, setUpiEnabled] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiQrUrl, setUpiQrUrl] = useState("");
  const [uploadingQr, setUploadingQr] = useState(false);

  // Bank settings
  const [bankEnabled, setBankEnabled] = useState(false);
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/payments");
        if (res.ok) {
          const data = await res.json();
          setUpiEnabled(data.upiEnabled || false);
          setUpiId(data.upiId || "");
          setUpiQrUrl(data.upiQrUrl || "");
          setBankEnabled(data.bankEnabled || false);
          setAccountHolder(data.accountHolder || "");
          setAccountNumber(data.accountNumber || "");
          setIfsc(data.ifsc || "");
          setBankName(data.bankName || "");
        }
      } catch (err) {
        console.error("Failed to load payment settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
      return;
    }

    setUploadingQr(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "upi_qrs");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUpiQrUrl(data.url);
      } else {
        setError(data.error || "Failed to upload QR code.");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file.");
    } finally {
      setUploadingQr(false);
    }
  };

  const handleRemoveQr = () => {
    setUpiQrUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    // Confirm sensitive changes
    if (!confirm("Are you sure you want to save these payment details? Please verify they are 100% correct, as supporters will send money directly to these accounts.")) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          upiEnabled,
          upiId: upiId.trim(),
          upiQrUrl,
          bankEnabled,
          accountHolder: accountHolder.trim(),
          accountNumber: accountNumber.trim(),
          ifsc: ifsc.trim().toUpperCase(),
          bankName: bankName.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Payment settings saved successfully!");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError(data.error || "Failed to save settings.");
      }
    } catch (err) {
      console.error("Error saving payments:", err);
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 font-sans max-w-3xl">
      <div>
        <h1 className="text-3xl font-black text-zinc-100 tracking-tight">Payment Settings</h1>
        <p className="text-zinc-400 text-sm mt-1.5 font-normal">
          Configure how your audience supports you directly.
        </p>
      </div>

      {/* Direct Payment Notice */}
      <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-5 md:p-6 space-y-3 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-zinc-100 text-sm">Direct Supporter Payments</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Payments from your supporters go **directly to you**. Plugd does not receive, hold, split, or redistribute supporter money, and we charge **0% platform fees**.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* UPI Payments SECTION */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                <QrCode className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-100 text-sm">UPI Payments</h3>
                <p className="text-[11px] text-zinc-500">Enable support via UPI app scan or direct UPI ID</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={upiEnabled}
                onChange={(e) => setUpiEnabled(e.target.checked)}
              />
              <div className="w-11 h-6 bg-zinc-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-zinc-950 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-zinc-700 after:border-zinc-950 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 peer-checked:after:bg-black"></div>
            </label>
          </div>

          {upiEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
              {/* UPI ID */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">UPI ID *</label>
                  <input
                    type="text"
                    placeholder="e.g. ravi@upi, ravi@oksbi"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-semibold"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required={upiEnabled}
                  />
                  <p className="text-[10px] text-zinc-500">Provide your actual UPI ID. Test this ID before sharing!</p>
                </div>
              </div>

              {/* UPI QR Code */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">UPI QR Code Image</label>
                {upiQrUrl ? (
                  <div className="relative border border-zinc-850 rounded-xl p-3 bg-zinc-950/40 w-fit flex flex-col items-center gap-3">
                    <img 
                      src={upiQrUrl} 
                      alt="UPI QR Code" 
                      className="w-32 h-32 object-contain bg-white rounded-lg p-1"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveQr}
                      className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Remove QR
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 cursor-pointer bg-zinc-950/20 hover:bg-zinc-950/40 transition-all h-36"
                  >
                    {uploadingQr ? (
                      <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-zinc-500" />
                        <span className="text-xs text-zinc-400 font-semibold">Upload QR Image</span>
                        <span className="text-[9px] text-zinc-600 font-medium">JPEG, PNG, WEBP up to 5MB</span>
                      </>
                    )}
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bank Transfer SECTION */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                <Building className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-100 text-sm">Bank Transfer</h3>
                <p className="text-[11px] text-zinc-500">Provide bank details for IMPS/NEFT/RTGS transfers</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={bankEnabled}
                onChange={(e) => setBankEnabled(e.target.checked)}
              />
              <div className="w-11 h-6 bg-zinc-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-zinc-950 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-zinc-700 after:border-zinc-950 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 peer-checked:after:bg-black"></div>
            </label>
          </div>

          {bankEnabled && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Note about bank privacy */}
              <div className="bg-zinc-950/60 border border-zinc-850 rounded-xl p-4 text-[11px] text-zinc-400 leading-normal flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <p className="font-medium">
                  **Privacy Protection**: Bank details are hidden by default on your public profile page. Supporters must explicitly choose the **Bank Transfer** option to reveal them, avoiding unnecessary exposure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Holder Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Account Holder Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Ravi Shankar"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    required={bankEnabled}
                  />
                </div>

                {/* Bank Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Bank Name</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC Bank, ICICI Bank"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>

                {/* Account Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Account Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. 50100123456789"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium font-sans"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required={bankEnabled}
                  />
                </div>

                {/* IFSC Code */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">IFSC Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC0001234"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium font-sans uppercase"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    maxLength={11}
                    required={bankEnabled}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 font-semibold">{error}</p>
        )}
        {success && (
          <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {success}
          </p>
        )}

        {/* Save button */}
        <button
          type="submit"
          disabled={saving || (!upiEnabled && !bankEnabled)}
          className="h-14 px-8 bg-orange-500 text-black font-extrabold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm cursor-pointer shadow-lg shadow-orange-500/10"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin text-black" />
          ) : (
            "Save Payment Details"
          )}
        </button>
      </form>
    </div>
  );
}
