"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Upload,
  QrCode,
  Link as LinkIcon,
  Check,
  CheckCircle2,
  ArrowLeft,
  Mail,
} from "lucide-react";
import { BUILTIN_AVATARS, AvatarOption } from "@/lib/avatars";
import { decodeQrCode } from "@/lib/qr-reader";
import AuthMarketingHero from "@/components/AuthMarketingHero";

export default function SignupPage() {
  const router = useRouter();

  // Verification Step: "form" or "otp"
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendingOtp, setResendingOtp] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  // Step fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  // Avatar Choice: "avatar" or "upload"
  const [avatarChoice, setAvatarChoice] = useState<"avatar" | "upload">("avatar");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(BUILTIN_AVATARS[0]);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string>("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  // Payment Support: "link" or "qr"
  const [paymentChoice, setPaymentChoice] = useState<"link" | "qr">("link");
  const [paymentLink, setPaymentLink] = useState("");
  const [paymentQrUrl, setPaymentQrUrl] = useState("");
  const [qrDecodedText, setQrDecodedText] = useState("");
  const [decodingQr, setDecodingQr] = useState(false);
  const [qrError, setQrError] = useState("");
  const qrFileInputRef = useRef<HTMLInputElement>(null);

  // Status & Validation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available?: boolean;
    message?: string;
  }>({ checking: false });

  // Debounced check username
  useEffect(() => {
    const clean = username.trim().toLowerCase().replace(/^@+/, "");
    if (!clean || clean.length < 3) {
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
            message: data.error || "Username is not available",
          });
        }
      } catch {
        setUsernameStatus({ checking: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const interval = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCountdown]);

  // Handle Photo Upload
  const handleAvatarFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Avatar image must be under 5MB.");
      return;
    }

    setUploadingAvatar(true);
    setError("");

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
        throw new Error(data.error || "Failed to upload avatar.");
      }

      setUploadedAvatarUrl(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Handle QR Upload & Client Decode
  const handleQrFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDecodingQr(true);
    setQrError("");
    setQrDecodedText("");

    try {
      // 1. Decode QR Code
      const result = await decodeQrCode(file);

      // 2. Upload QR Image to save it
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
    } catch (err: any) {
      setQrError("Failed to process QR image. Please try again or enter your link directly.");
    } finally {
      setDecodingQr(false);
    }
  };

  // Submit Signup Form: Validates inputs & triggers 6-digit email OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate Passwords
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Determine final avatar
    const finalAvatar =
      avatarChoice === "upload" && uploadedAvatarUrl
        ? uploadedAvatarUrl
        : selectedAvatar.url;

    // Validate Payment (Required: must provide payment link or uploaded QR)
    const effectivePaymentLink = paymentLink.trim() || qrDecodedText.trim();
    const effectivePaymentQr = paymentQrUrl.trim();

    if (!effectivePaymentLink && !effectivePaymentQr) {
      setError(
        "Payment method is required. Please provide a payment link or upload a payment QR code (UPI, GPay, PhonePe, Paytm)."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-code",
          username: username.trim(),
          email: email.trim(),
          password,
          displayName: displayName.trim() || username.trim(),
          bio: bio.trim().slice(0, 500),
          avatarUrl: finalAvatar,
          paymentLink: effectivePaymentLink,
          paymentQr: effectivePaymentQr || (qrDecodedText ? qrDecodedText : null),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate account creation.");
      }

      // Seamlessly advance to OTP verification step
      setStep("otp");
      setOtp("");
      setOtpError("");
      setResendMessage("");
      setResendCountdown(60);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  // Verify OTP and complete account creation
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6) {
      setOtpError("Please enter the complete 6-digit verification code.");
      return;
    }

    const finalAvatar =
      avatarChoice === "upload" && uploadedAvatarUrl
        ? uploadedAvatarUrl
        : selectedAvatar.url;

    const effectivePaymentLink = paymentLink.trim() || qrDecodedText.trim();
    const effectivePaymentQr = paymentQrUrl.trim();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
          displayName: displayName.trim() || username.trim(),
          bio: bio.trim().slice(0, 500),
          avatarUrl: finalAvatar,
          paymentLink: effectivePaymentLink,
          paymentQr: effectivePaymentQr || (qrDecodedText ? qrDecodedText : null),
          otp: cleanOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed. Please check the code.");
      }

      // Successfully verified and account established!
      const cleanUsername = username.trim().toLowerCase().replace(/^@+/, "");
      router.push(`/${cleanUsername}`);
      router.refresh();
    } catch (err: any) {
      setOtpError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  // Resend OTP code
  const handleResendCode = async () => {
    if (resendCountdown > 0 || resendingOtp) return;
    setResendingOtp(true);
    setOtpError("");
    setResendMessage("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to resend code.");
      }

      setResendMessage("A new 6-digit code has been sent to your email.");
      setResendCountdown(60);
    } catch (err: any) {
      setOtpError(err.message || "Failed to resend verification code.");
    } finally {
      setResendingOtp(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-orange-500 selection:text-black">
      {/* LEFT COLUMN: Plugd visual / marketing area */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen sticky top-0 h-screen">
        <AuthMarketingHero />
      </div>

      {/* RIGHT COLUMN: Signup Form or Email OTP Verification */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center py-12 px-6 sm:px-12 lg:px-16 overflow-y-auto">
        {step === "otp" ? (
          <div className="w-full max-w-[420px] sm:max-w-[440px] mx-auto py-4">
            {/* Back to form */}
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setError("");
                setOtpError("");
              }}
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to account details</span>
            </button>

            {/* Header */}
            <div className="mb-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 mb-3.5 border border-orange-100">
                <Mail className="h-5 w-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
                Verify your email
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
                Enter the 6-digit code sent to{" "}
                <span className="font-bold text-zinc-900 break-all">{email}</span>.
              </p>
            </div>

            {/* OTP Error Banner */}
            {otpError && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                <span>{otpError}</span>
              </div>
            )}

            {/* Resend Success Banner */}
            {resendMessage && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3.5 text-xs font-medium text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{resendMessage}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* 6-Digit OTP Input */}
              <div className="space-y-2">
                <label
                  htmlFor="signup-otp"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                >
                  6-Digit Code
                </label>
                <input
                  id="signup-otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  autoFocus
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(val);
                    if (otpError) setOtpError("");
                  }}
                  placeholder="000000"
                  className="w-full h-14 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-center text-2xl font-mono font-bold tracking-[0.4em] text-zinc-900 placeholder:text-zinc-300 placeholder:tracking-[0.4em] outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Verify Email Button */}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full h-11 sm:h-12 rounded-xl bg-orange-500 font-extrabold text-sm text-black shadow-xs transition hover:bg-orange-600 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Verifying code...</span>
                  </>
                ) : (
                  <span>Verify Email</span>
                )}
              </button>

              {/* Resend Option */}
              <div className="text-center pt-1">
                <p className="text-xs text-zinc-500 font-medium">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendCountdown > 0 || resendingOtp}
                    className="font-bold text-orange-600 hover:text-orange-700 underline disabled:opacity-50 disabled:no-underline cursor-pointer"
                  >
                    {resendingOtp
                      ? "Sending..."
                      : resendCountdown > 0
                      ? `Resend code in ${resendCountdown}s`
                      : "Resend code"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-[460px] sm:max-w-[480px] mx-auto py-4">
            {/* Header */}
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
                Create your Plugd account
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500 font-medium">
                Share what you wish for with friends, family, and supporters.
              </p>
            </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GROUP 1: ACCOUNT CREDENTIALS */}
            <div className="space-y-4">
              <div className="border-b border-zinc-100 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  1. Account Information
                </span>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="signup-username"
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
                    id="signup-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
                    placeholder="username"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 pl-8 pr-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <p className="text-[11px] text-zinc-400">
                  Your profile URL will be{" "}
                  <span className="font-mono text-zinc-600 font-semibold">
                    theplugd.com/{username || "username"}
                  </span>
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-password"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 chars"
                      className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 pl-3.5 pr-10 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-700 transition"
                      aria-label="Toggle password"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-confirm-password"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                  >
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 pl-3.5 pr-10 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-700 transition"
                      aria-label="Toggle confirm password"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GROUP 2: PROFILE DETAILS */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-zinc-100 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  2. Public Profile
                </span>
              </div>

              {/* Display Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-display-name"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                >
                  Display Name
                </label>
                <input
                  id="signup-display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="signup-bio"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                  >
                    Bio
                  </label>
                  <span className="text-[10px] text-zinc-400">
                    {bio.length}/500
                  </span>
                </div>
                <textarea
                  id="signup-bio"
                  rows={2}
                  maxLength={500}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell people what you are wishing for or celebrating..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 resize-none"
                />
              </div>
            </div>

            {/* GROUP 3: PROFILE PICTURE / AVATAR */}
            <div className="space-y-3 pt-2">
              <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  3. Profile Picture or Avatar
                </span>
                <span className="text-[11px] text-zinc-400">Choose one</span>
              </div>

              {/* Toggle: Choose Avatar vs Upload Photo */}
              <div className="flex rounded-xl bg-zinc-100 p-1">
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

              {/* View A: Built-in Avatar Grid */}
              {avatarChoice === "avatar" ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-1">
                    {BUILTIN_AVATARS.map((av) => {
                      const isSelected = selectedAvatar.id === av.id;
                      return (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`relative aspect-square rounded-2xl p-1 border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                            isSelected
                              ? "border-orange-500 ring-2 ring-orange-500/30 scale-105 shadow-xs"
                              : "border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50"
                          }`}
                          title="Select avatar"
                        >
                          <img
                            src={av.url}
                            alt="Avatar"
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
                </div>
              ) : (
                /* View B: Upload Custom Photo */
                <div className="space-y-3">
                  <input
                    ref={avatarFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => avatarFileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 p-6 text-center hover:border-orange-500 hover:bg-orange-50/30 transition cursor-pointer"
                  >
                    {uploadingAvatar ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                        <span className="text-xs font-semibold text-zinc-600">Uploading photo...</span>
                      </div>
                    ) : uploadedAvatarUrl ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={uploadedAvatarUrl}
                          alt="Uploaded avatar"
                          className="h-16 w-16 rounded-full object-cover border-2 border-orange-500 shadow-md"
                        />
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Photo uploaded! Click to change
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-1">
                          <Upload className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-zinc-800">
                          Click to upload profile picture
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          JPEG, PNG, WEBP or GIF up to 5MB
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* GROUP 4: SUPPORT / PAYMENT */}
            <div className="space-y-3 pt-2">
              <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  4. Support / Payment
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Provide either a payment link or a payment QR code so supporters can send money directly to you.
              </p>

              {/* Segmented control for Support Link vs Payment QR */}
              <div className="flex rounded-xl bg-zinc-100 p-1">
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
                  <span>Payment Link</span>
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
                  <span>Upload Payment QR</span>
                </button>
              </div>

              {/* Option A: Payment Link Input */}
              {paymentChoice === "link" ? (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={paymentLink}
                    onChange={(e) => setPaymentLink(e.target.value)}
                    placeholder="Paste your payment link (UPI, GPay, PhonePe, Paytm)"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                  />
                  <p className="text-[10px] text-zinc-400">
                    Supports UPI, GPay, PhonePe, Paytm, or direct payment handles.
                  </p>
                </div>
              ) : (
                /* Option B: Payment QR Upload & Read */
                <div className="space-y-2">
                  <input
                    ref={qrFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleQrFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => qrFileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 p-5 text-center hover:border-orange-500 hover:bg-orange-50/30 transition cursor-pointer"
                  >
                    {decodingQr ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                        <span className="text-xs font-semibold text-zinc-600">
                          Reading QR code...
                        </span>
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-1">
                          <QrCode className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-zinc-800">
                          Upload your Payment QR Image
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
                          Switch to entering a payment link directly
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || (usernameStatus.checking || usernameStatus.available === false)}
                className="w-full h-12 rounded-xl bg-orange-500 font-extrabold text-sm text-black shadow-xs transition hover:bg-orange-600 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Sending code...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>
          </form>

          {/* Visual Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-zinc-400 font-bold tracking-wider">or</span>
            </div>
          </div>

          {/* Prominent Log in action */}
          <Link
            href="/login"
            className="w-full h-11 sm:h-12 rounded-xl border-2 border-zinc-200 bg-white text-zinc-800 font-extrabold text-sm flex items-center justify-center hover:bg-zinc-50 hover:border-zinc-300 transition active:scale-[0.99]"
          >
            Log in
          </Link>
        </div>
        )}
      </div>
    </main>
  );
}
