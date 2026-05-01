"use client";

import { useState, useRef, useEffect } from "react";
import { X, Loader2, Trash2, Upload, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NICHES = [
  "Founder", "Builder", "Developer", "Designer", "Indie Hacker", 
  "AI", "Creator", "Student", "Crypto", "Marketer", "Writer", "Other"
];

const FOLLOWERS_RANGES = [
  "0 - 100", "100 - 500", "500 - 1K", "1K - 5K", "5K - 10K", "10K+"
];

export default function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [avatarPath, setAvatarPath] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    xHandle: "",
    bio: "",
    niche: "",
    followersRange: "",
    email: "",
    confirmed: false
  });

  const isFormValid = 
    formData.name.trim() !== "" &&
    formData.xHandle.trim() !== "" &&
    formData.bio.trim() !== "" &&
    formData.niche !== "" &&
    formData.followersRange !== "" &&
    formData.email.trim() !== "" &&
    formData.confirmed &&
    avatarPath !== "";

  useEffect(() => {
    if (!isOpen) {
      // Reset form on close if needed
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleXHandleChange = (val: string) => {
    let cleaned = val.trim();
    if (cleaned !== "" && !cleaned.startsWith("@")) {
      cleaned = "@" + cleaned;
    }
    setFormData({ ...formData, xHandle: cleaned });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Max 2MB.");
      return;
    }

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.filePath) {
        setAvatarPath(data.filePath);
        setPreviewUrl(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setAvatarPath("");
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);

    try {
      // Strip @ for storage
      const xHandleToStore = formData.xHandle.startsWith("@") 
        ? formData.xHandle.substring(1) 
        : formData.xHandle;

      const submissionData = {
        ...formData,
        xHandle: xHandleToStore,
        avatarPath
      };

      // 1. Create account entry (unpaid)
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) throw new Error("Failed to create account");
      const { accountId } = await res.json();

      // 2. Create checkout session
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });

      if (!checkoutRes.ok) throw new Error("Failed to create checkout session");
      const { url } = await checkoutRes.json();

      // 3. Redirect to payment
      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between sticky top-0 bg-[#111111] z-20">
          <div>
            <h2 className="text-xl font-bold text-white">Add Your Account</h2>
            <p className="text-sm text-gray-400 mt-1">Get discovered by X builders, founders and creators.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[0.85rem] font-medium text-gray-400">Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. John Doe"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* X Username */}
          <div className="space-y-1.5">
            <label className="text-[0.85rem] font-medium text-gray-400">X Username</label>
            <input
              required
              type="text"
              placeholder="@username"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
              value={formData.xHandle}
              onChange={(e) => handleXHandleChange(e.target.value)}
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[0.85rem] font-medium text-gray-400">One-line Bio</label>
              <span className={`text-[0.75rem] ${formData.bio.length > 100 ? "text-red-500" : "text-gray-500"}`}>
                {formData.bio.length}/100
              </span>
            </div>
            <input
              required
              maxLength={100}
              type="text"
              placeholder="Founder | Building in public | Shipping daily"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          {/* Niche */}
          <div className="space-y-3">
            <label className="text-[0.85rem] font-medium text-gray-400">Niche</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NICHES.map((niche) => (
                <button
                  key={niche}
                  type="button"
                  onClick={() => setFormData({ ...formData, niche })}
                  className={`py-2 px-3 rounded-lg text-sm transition-all border ${
                    formData.niche === niche 
                      ? "bg-white text-black border-white font-semibold" 
                      : "bg-[#1a1a1a] text-white border-[#2a2a2a] hover:border-gray-600"
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>

          {/* Followers Range */}
          <div className="space-y-3">
            <label className="text-[0.85rem] font-medium text-gray-400">Followers Range</label>
            <div className="flex flex-wrap gap-2">
              {FOLLOWERS_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFormData({ ...formData, followersRange: range })}
                  className={`py-2 px-3 rounded-lg text-sm transition-all border ${
                    formData.followersRange === range 
                      ? "bg-white text-black border-white font-semibold" 
                      : "bg-[#1a1a1a] text-white border-[#2a2a2a] hover:border-gray-600"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="space-y-3">
            <label className="text-[0.85rem] font-medium text-gray-400">Profile Picture</label>
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="relative w-12 h-12">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-12 h-12 rounded-full object-cover border border-[#2a2a2a]"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                  <Upload className="w-5 h-5 text-gray-600" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:border-gray-600 transition-all flex items-center gap-2"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {avatarPath ? "Change Picture" : "Upload Picture"}
                </button>
                <p className="text-[0.7rem] text-gray-500 mt-1.5">JPG, PNG or WebP. Max 2MB.</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[0.85rem] font-medium text-gray-400">Email</label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <p className="text-[0.75rem] text-gray-500">We&apos;ll only use this email for your receipt. It won&apos;t be shown publicly.</p>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
              className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                formData.confirmed 
                  ? "bg-white border-white text-black" 
                  : "bg-[#1a1a1a] border-[#2a2a2a]"
              }`}
            >
              {formData.confirmed && <Check className="w-4 h-4" />}
            </button>
            <label 
              className="text-sm text-gray-400 cursor-pointer select-none"
              onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
            >
              I confirm this information is accurate and belongs to me.
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 sticky bottom-0 bg-[#111111] pb-2 z-10">
            <button
              disabled={!isFormValid || isLoading}
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay $1 to Get Listed"}
            </button>
            <p className="text-center text-[0.7rem] text-gray-500 mt-3">
              Secure payment via Dodo Payments. Your listing goes live automatically after payment.
            </p>
          </div>
          
        </form>
      </div>
    </div>
  );
}
