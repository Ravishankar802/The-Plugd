import Link from "next/link";
import { Lock, LogIn, Sparkles, ArrowLeft } from "lucide-react";

interface PrivateWishlistNoticeProps {
  displayName: string;
  username: string;
  avatarUrl?: string | null;
  isLoggedIn?: boolean;
}

export default function PrivateWishlistNotice({
  displayName,
  username,
  avatarUrl,
  isLoggedIn = false,
}: PrivateWishlistNoticeProps) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-logo text-2xl font-extrabold text-orange-500">Plugd</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Explore Plugd</span>
          </Link>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white p-8 text-center shadow-sm space-y-6">
          {/* Avatar with lock badge */}
          <div className="relative mx-auto h-24 w-24">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-zinc-100 shadow-md overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-black text-orange-500">
                  {displayName.slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white shadow-md border-2 border-white">
              <Lock className="h-4 w-4" />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-zinc-900">{displayName}</h1>
            <p className="text-xs font-semibold text-zinc-500 mt-0.5">@{username}</p>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-100 space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200/70 px-3 py-1 text-[11px] font-bold text-zinc-700">
              <Lock className="h-3 w-3" />
              <span>Private Wishlist</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              This wishlist is currently private. Only @{username} can view it.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5 pt-2">
            {!isLoggedIn ? (
              <Link
                href={`/login?redirect=/${username}`}
                className="w-full h-11 rounded-2xl bg-zinc-900 text-white text-xs font-bold shadow-xs hover:bg-zinc-800 transition flex items-center justify-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Log in to view if this is you</span>
              </Link>
            ) : null}

            <Link
              href="/"
              className="w-full h-11 rounded-2xl bg-orange-500 text-black text-xs font-extrabold shadow-xs hover:bg-orange-600 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Create Your Own Wishlist for Free</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400">
        <p>© {new Date().getFullYear()} Plugd • Make wishlists for anything you want</p>
      </footer>
    </div>
  );
}
