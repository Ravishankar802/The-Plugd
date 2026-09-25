"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  QrCode,
  Link as LinkIcon,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  LogOut,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { BUILTIN_AVATARS, AvatarOption } from "@/lib/avatars";
import { decodeQrCode } from "@/lib/qr-reader";

export default function EditProfilePage() {
  const router = useRouter();

  // Loading state
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // User fields
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  // Avatar fields
  const [avatarChoice, setAvatarChoice] = useState<"avatar" | "upload">("avatar");
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState("/avatars/avatar-1.svg");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(BUILTIN_AVATARS[0]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarFileRef = useRef<HTMLInputElement>(null);

  // Payment fields
  const [paymentChoice, setPaymentChoice] = useState<"link" | "qr">("link");
  const [paymentLink, setPaymentLink] = useState("");
  const [paymentQrUrl, setPaymentQrUrl] = useState("");
  const [qrDecodedText, setQrDecodedText] = useState("");
  const [decodingQr, setDecodingQr] = useState(false);
  const [qrError, setQrError] = useState("");
  const qrFileRef = useRef<HTMLInputElement>(null);

  // Username validation
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available?: boolean;
    message?: string;
  }>({ checking: false });

  // Load current user profile
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.status === 401) {
          router.push("/login?redirect=/profile");
          return;
        }

        const data = await res.json();
        if (data.username) {
          setUsername(data.username);
          setOriginalUsername(data.username);
        }
        setDisplayName(data.displayName || "");
        setBio(data.bio || "");
        setPaymentLink(data.paymentLink || "");
        setPaymentQrUrl(data.paymentQr || "");

        const avUrl = data.avatarUrl || "/avatars/avatar-1.svg";
        setCurrentAvatarUrl(avUrl);

        // Check if built-in avatar
        const matchingBuiltin = BUILTIN_AVATARS.find((a) => a.url === avUrl);
        if (matchingBuiltin) {
          setSelectedAvatar(matchingBuiltin);
          setAvatarChoice("avatar");
        } else {
          setAvatarChoice("upload");
        }

        if (data.paymentQr && !data.paymentLink) {
          setPaymentChoice("qr");
        }
      } catch (err) {
        setErrorMsg("Failed to load profile details.");
      } finally {
        setInitialLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  // Check username if changed
  useEffect(() => {
    const clean = username.trim().toLowerCase().replace(/^@+/, "");
    if (!clean || clean === originalUsername.toLowerCase() || clean.length < 3) {
      setUsernameStatus({ checking: false });
      return;
    }

    const timer = setTimeout(async () => {
      setUsernameStatus({ checking: true });
      try {
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(clean)}`);
        const data = await res.json();
        if (data.available) {
          setUsernameStatus({ checking: false, available: true });
        } else {
          setUsernameStatus({
            checking: false,
            available: false,
            message: data.error || "Username is taken",
          });
        }
      } catch {
        setUsernameStatus({ checking: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username, originalUsername]);

  // Handle Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "avatars");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload photo.");
      }

      setCurrentAvatarUrl(data.url);
      setAvatarChoice("upload");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload photo.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Handle QR Upload & Client Decode
  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDecodingQr(true);
    setQrError("");
    setQrDecodedText("");

    try {
      // 1. Decode QR
      const result = await decodeQrCode(file);

      // 2. Upload QR Image
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "qr");
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (uploadRes.ok && uploadData.url) {
        setPaymentQrUrl(uploadData.url);
      }

      if (result.success && result.data) {
        setQrDecodedText(result.data);
        if (!paymentLink.trim()) {
          setPaymentLink(result.data);
        }
      } else {
        setQrError(
          result.error ||
            "Could not read a QR code from this image. Please ensure the QR is clear and well-lit, or enter your payment link directly."
        );
      }
    } catch {
      setQrError("Failed to process QR image.");
    } finally {
      setDecodingQr(false);
    }
  };

  // Save Changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    const finalAvatar =
      avatarChoice === "avatar" ? selectedAvatar.url : currentAvatarUrl;

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          displayName: displayName.trim(),
          bio: bio.trim(),
          avatarUrl: finalAvatar,
          paymentLink: paymentLink.trim(),
          paymentQr: paymentQrUrl.trim() || (qrDecodedText ? qrDecodedText : null),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile.");
      }

      setOriginalUsername(data.user.username);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {}
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const publicProfileUrl = `/@${originalUsername || username}`;

  return (
    <main className="min-h-screen bg-zinc-50/60 py-8 px-4 font-sans selection:bg-orange-500 selection:text-black">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-orange-600 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Plugd</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={publicProfileUrl}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-800 shadow-xs hover:border-zinc-300 hover:bg-zinc-50 transition"
            >
              <span>View Public Profile</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 shadow-xs hover:bg-red-50 hover:border-red-200 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Edit Form Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-9 shadow-sm">
          <div className="border-b border-zinc-100 pb-5 mb-6">
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
              Edit Profile
            </h1>
            <p className="mt-1 text-xs text-zinc-500">
              Manage your public Plugd wishlist profile, avatar, and payment links.
            </p>
          </div>

          {/* Feedback Alerts */}
          {successMsg && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AVATAR SECTION */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Profile Picture & Avatar
              </label>

              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full border-2 border-orange-500 shadow-md overflow-hidden bg-zinc-100 shrink-0">
                  <img
                    src={
                      avatarChoice === "avatar"
                        ? selectedAvatar.url
                        : currentAvatarUrl
                    }
                    alt="Current avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex rounded-xl bg-zinc-100 p-1 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={() => setAvatarChoice("avatar")}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
                        avatarChoice === "avatar"
                          ? "bg-white text-zinc-900 shadow-xs"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      Choose Avatar
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarChoice("upload")}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
                        avatarChoice === "upload"
                          ? "bg-white text-zinc-900 shadow-xs"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      Upload Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* View A: Avatar grid */}
              {avatarChoice === "avatar" ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
                  {BUILTIN_AVATARS.map((av) => {
                    const isSelected = selectedAvatar.id === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setSelectedAvatar(av)}
                        className={`relative aspect-square rounded-2xl p-1 border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                          isSelected
                            ? "border-orange-500 ring-2 ring-orange-500/30 scale-105 shadow-sm"
                            : "border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                        title={av.name}
                      >
                        <img
                          src={av.url}
                          alt={av.name}
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-cover pointer-events-none"
                        />
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-black">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* View B: Upload Custom Photo */
                <div className="pt-2">
                  <input
                    ref={avatarFileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => avatarFileRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-800 shadow-xs hover:border-orange-500 hover:bg-orange-50/30 transition cursor-pointer"
                  >
                    {uploadingAvatar ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                        <span>Uploading photo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-orange-500" />
                        <span>Upload New Photo</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* USERNAME & DISPLAY NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="edit-username"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                  >
                    Username
                  </label>
                  {usernameStatus.checking ? (
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" /> Checking...
                    </span>
                  ) : usernameStatus.available ? (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="h-3 w-3 stroke-[3]" /> Available
                    </span>
                  ) : usernameStatus.message ? (
                    <span className="text-[11px] font-semibold text-red-500">
                      {usernameStatus.message}
                    </span>
                  ) : null}
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm font-bold text-zinc-400 select-none">
                    @
                  </span>
                  <input
                    id="edit-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 pl-8 pr-3.5 text-sm font-medium text-zinc-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="edit-display-name"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                >
                  Display Name
                </label>
                <input
                  id="edit-display-name"
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 text-sm font-medium text-zinc-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* BIO */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="edit-bio"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                >
                  Bio
                </label>
                <span className="text-[10px] text-zinc-400">
                  {bio.length}/500
                </span>
              </div>
              <textarea
                id="edit-bio"
                rows={2}
                maxLength={500}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell your friends what you're wishing for..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs sm:text-sm font-medium text-zinc-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 resize-none"
              />
            </div>

            {/* PAYMENT SUPPORT */}
            <div className="space-y-3 pt-2">
              <div className="border-b border-zinc-100 pb-2">
                <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Supporter Payment / Gift Link
                </span>
              </div>

              <div className="flex rounded-xl bg-zinc-100 p-1 w-full max-w-xs">
                <button
                  type="button"
                  onClick={() => setPaymentChoice("link")}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    paymentChoice === "link"
                      ? "bg-white text-zinc-900 shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span>Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentChoice("qr")}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    paymentChoice === "qr"
                      ? "bg-white text-zinc-900 shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Payment QR</span>
                </button>
              </div>

              {paymentChoice === "link" ? (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={paymentLink}
                    onChange={(e) => setPaymentLink(e.target.value)}
                    placeholder="Paste your payment link (UPI, GPay, PhonePe, Paytm)"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 text-xs sm:text-sm font-medium text-zinc-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    ref={qrFileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleQrUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => qrFileRef.current?.click()}
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 p-5 text-center hover:border-orange-500 hover:bg-orange-50/30 transition cursor-pointer"
                  >
                    {decodingQr ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                        <span className="text-xs font-semibold text-zinc-600">Reading QR code...</span>
                      </div>
                    ) : paymentQrUrl ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={paymentQrUrl}
                          alt="Payment QR"
                          className="h-16 w-16 rounded-xl object-contain border border-zinc-200 bg-white p-1"
                        />
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> QR uploaded & processed! Click to replace
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5">
                        <QrCode className="h-6 w-6 text-orange-500" />
                        <span className="text-xs font-bold text-zinc-800">
                          Upload Payment QR
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          We will extract your payment link automatically
                        </span>
                      </div>
                    )}
                  </div>

                  {qrDecodedText && (
                    <div className="rounded-xl bg-emerald-50 p-2.5 text-xs text-emerald-800 border border-emerald-200 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">Extracted link:</p>
                        <p className="font-mono text-[11px] truncate">{qrDecodedText}</p>
                      </div>
                    </div>
                  )}

                  {qrError && (
                    <div className="rounded-xl bg-amber-50 p-2.5 text-xs text-amber-800 border border-amber-200 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p>{qrError}</p>
                        <button
                          type="button"
                          onClick={() => setPaymentChoice("link")}
                          className="mt-1 font-bold text-orange-600 underline"
                        >
                          Switch to entering payment link directly
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SAVE BUTTON */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <Link
                href={publicProfileUrl}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving || usernameStatus.available === false}
                className="h-11 px-6 rounded-xl bg-orange-500 font-extrabold text-sm text-black shadow-xs hover:bg-orange-600 transition active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
