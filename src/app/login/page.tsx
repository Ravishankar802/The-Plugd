"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotNotice, setForgotNotice] = useState(false);

  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const initialMessage = searchParams.get("message");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!login.trim() || !password) {
      setError("Please enter your email or username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: login.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log in.");
      }

      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto px-4">
      {/* Centered Auth Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white p-7 sm:p-9 shadow-sm">
        {/* Brand Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block group focus:outline-none">
            <span className="font-logo text-3xl sm:text-4xl font-extrabold tracking-normal text-orange-500 select-none leading-none">
              Plugd
            </span>
          </Link>
          <h1 className="mt-4 text-xl sm:text-2xl font-black tracking-tight text-zinc-900">
            Log in to Plugd
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Welcome back! Enter your details below.
          </p>
        </div>

        {/* Informational Message */}
        {initialMessage && !error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-orange-50 p-3 text-xs font-semibold text-orange-700 border border-orange-200">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-500" />
            <span>{initialMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Forgot Password Notice */}
        {forgotNotice && (
          <div className="mb-5 rounded-xl bg-zinc-50 p-3.5 text-xs text-zinc-600 border border-zinc-200">
            <p className="font-bold text-zinc-800 mb-1">Forgot your password?</p>
            <p>
              Please contact Plugd support at{" "}
              <a
                href="mailto:support@theplugd.com"
                className="font-bold text-orange-600 hover:underline"
              >
                support@theplugd.com
              </a>{" "}
              to recover your account.
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Email or Username */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-identifier"
              className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
            >
              Email or username
            </label>
            <input
              id="login-identifier"
              type="text"
              name="login"
              autoComplete="username"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="e.g. alex or alex@example.com"
              className="w-full h-11 sm:h-12 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Field 2: Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotNotice(!forgotNotice)}
                className="text-[11px] font-bold text-zinc-500 hover:text-orange-600 transition"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative flex items-center">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-11 sm:h-12 rounded-xl border border-zinc-200 bg-zinc-50/50 pl-3.5 pr-11 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-zinc-400 hover:text-zinc-700 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 sm:h-12 mt-2 rounded-xl bg-orange-500 font-extrabold text-sm text-black shadow-xs transition hover:bg-orange-600 hover:shadow-md active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-black" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Log In</span>
            )}
          </button>
        </form>
      </div>

      {/* Footer Card: Sign Up Prompt */}
      <div className="mt-4 rounded-2xl border border-zinc-200/90 bg-white p-4 text-center shadow-xs">
        <p className="text-xs text-zinc-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-orange-600 hover:text-orange-700 hover:underline transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-10 px-4 bg-zinc-50/60 selection:bg-orange-500 selection:text-black font-sans">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
