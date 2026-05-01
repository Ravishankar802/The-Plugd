"use client";

import { useState, useRef, useEffect } from "react";
import { 
  X, 
  Loader2, 
  Trash2, 
  Upload, 
  Check,
  Rocket,
  Hammer,
  Laptop,
  Palette,
  Zap,
  Bot,
  Clapperboard,
  GraduationCap,
  Coins,
  TrendingUp,
  Pen,
  Plus,
  BarChart2,
  Briefcase,
  DollarSign,
  Cloud,
  Layers,
  Building2,
  Mic
} from "lucide-react";

const NICHES = [
  { name: "Founder", icon: Rocket },
  { name: "Builder", icon: Hammer },
  { name: "Developer", icon: Laptop },
  { name: "Designer", icon: Palette },
  { name: "Indie Hacker", icon: Zap },
  { name: "AI", icon: Bot },
  { name: "Creator", icon: Clapperboard },
  { name: "Student", icon: GraduationCap },
  { name: "Crypto", icon: Coins },
  { name: "Marketer", icon: TrendingUp },
  { name: "Writer", icon: Pen },
  { name: "Investor", icon: TrendingUp },
  { name: "Trader", icon: BarChart2 },
  { name: "Freelancer", icon: Briefcase },
  { name: "Artist", icon: Palette },
  { name: "Finance", icon: DollarSign },
  { name: "SaaS", icon: Cloud },
  { name: "No-Code", icon: Layers },
  { name: "Agency", icon: Building2 },
  { name: "Podcaster", icon: Mic },
  { name: "Other", icon: Plus },
];

const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

interface AdminEditAccountModalProps {
  account: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: any) => void;
}

export default function AdminEditAccountModal({ account, isOpen, onClose, onSave }: AdminEditAccountModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (account) {
      setFormData({ ...account });
    }
  }, [account, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/accounts/${formData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        onSave(updated);
        onClose();
      }
    } catch (err) {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        setFormData({ ...formData, avatarPath: data.filePath });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#111111] border border-[#2a2a2a] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-6 border-b border-[#2a2a2a] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
            <p className="text-sm text-[#a1a1aa] mt-1">Update all details for {formData.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#2a2a2a] rounded-full text-[#a1a1aa] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <form id="admin-edit-form" onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#52525b] uppercase tracking-wider">Account Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#52525b] uppercase tracking-wider">X Username</label>
                <input
                  required
                  type="text"
                  value={formData.xHandle}
                  onChange={(e) => setFormData({ ...formData, xHandle: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#52525b] uppercase tracking-wider">Bio</label>
              <input
                required
                maxLength={100}
                type="text"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#52525b] uppercase tracking-wider">Email (Admin Editable)</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-[#52525b] uppercase tracking-wider">Profile Picture</label>
              <div className="flex items-center gap-6">
                <img src={formData.avatarPath} className="w-16 h-16 rounded-full object-cover border border-[#2a2a2a]" />
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-2 rounded-lg text-sm hover:border-[#3f3f46] transition-all flex items-center gap-2"
                >
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  Upload Logo
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#52525b] uppercase tracking-wider">Niche</label>
              <div className="flex flex-wrap gap-2">
                {NICHES.map(n => {
                  const isSelected = formData.niche.includes(n.name);
                  return (
                    <button
                      key={n.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, niche: [n.name] })}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                        isSelected ? "bg-white text-black border-white" : "bg-[#0a0a0a] text-[#a1a1aa] border-[#2a2a2a]"
                      }`}
                    >
                      {n.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#52525b] uppercase tracking-wider">Followers Range</label>
              <div className="flex flex-wrap gap-2">
                {FOLLOWERS_RANGES.map(range => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, followersRange: range })}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                      formData.followersRange === range ? "bg-white text-black border-white" : "bg-[#0a0a0a] text-[#a1a1aa] border-[#2a2a2a]"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="px-8 py-6 border-t border-[#2a2a2a] flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#a1a1aa] hover:text-white transition-colors">
            Cancel
          </button>
          <button
            form="admin-edit-form"
            disabled={saving}
            className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-black hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
