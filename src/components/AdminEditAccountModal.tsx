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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-pill border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
            <p className="text-sm text-muted mt-1 font-medium">Update all details for {formData.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full text-muted hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <form id="admin-edit-form" onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[0.95rem] font-[500] text-foreground">Account Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-muted transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.95rem] font-[500] text-foreground">X Username</label>
                <input
                  required
                  type="text"
                  value={formData.xHandle}
                  onChange={(e) => setFormData({ ...formData, xHandle: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-muted transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.95rem] font-[500] text-foreground">Bio</label>
              <input
                required
                maxLength={100}
                type="text"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-muted transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.95rem] font-[500] text-foreground">Email (Admin Editable)</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-muted transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[0.95rem] font-[500] text-foreground">Profile Picture</label>
              <div className="flex items-center gap-6">
                <img src={formData.avatarPath} className="w-16 h-16 rounded-full object-cover border border-border shadow-lg" />
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-background border border-border text-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-accent transition-all flex items-center gap-2"
                >
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  Upload Logo
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[0.95rem] font-[500] text-foreground">Niche</label>
              <div className="flex flex-wrap gap-2">
                {NICHES.map(n => {
                  const isSelected = formData.niche.includes(n.name);
                  return (
                    <button
                      key={n.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, niche: [n.name] })}
                      className={`px-3 py-1.5 rounded-lg text-[0.75rem] transition-all border ${
                        isSelected ? "bg-selected text-selected-foreground border-selected font-bold shadow-sm" : "bg-background text-muted border-border hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {n.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[0.95rem] font-[500] text-foreground">Followers Range</label>
              <div className="flex flex-wrap gap-2">
                {FOLLOWERS_RANGES.map(range => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, followersRange: range })}
                    className={`px-3 py-1.5 rounded-lg text-[0.75rem] transition-all border ${
                      formData.followersRange === range ? "bg-selected text-selected-foreground border-selected font-bold shadow-sm" : "bg-background text-muted border-border hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="px-8 py-6 border-t border-border flex justify-end gap-3 bg-pill">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted hover:text-foreground transition-colors">
            Cancel
          </button>
          <button
            form="admin-edit-form"
            disabled={saving}
            className="bg-background border border-border text-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-accent transition-all flex items-center gap-2 shadow-xl"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
