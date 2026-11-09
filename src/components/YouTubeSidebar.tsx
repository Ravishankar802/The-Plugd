"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  BookOpen,
  ShoppingBag,
  ChevronRight,
  User,
  X,
} from "lucide-react";
import { getFollowedAuthors, type FollowedAuthor } from "@/lib/following-store";
import { getAvatarBgColor } from "@/lib/book-utils";

interface YouTubeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean;
  onOpenCart?: () => void;
}

export default function YouTubeSidebar({
  isOpen,
  onClose,
  isSignedIn,
  onOpenCart,
}: YouTubeSidebarProps) {
  const pathname = usePathname();
  const [followedAuthors, setFollowedAuthors] = useState<FollowedAuthor[]>([]);

  useEffect(() => {
    const update = () => {
      setFollowedAuthors(getFollowedAuthors());
    };
    update();
    window.addEventListener("plugd-following-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("plugd-following-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 sm:w-72 bg-[#faf8f5] text-[#1c1917] border-r border-[#dcd8d0] shadow-2xl flex flex-col transition-transform duration-250 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar navigation"
      >
        {/* Top Header inside Drawer */}
        <div className="flex h-[56px] items-center px-4 gap-3 border-b border-[#e7e5e4] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="p-2 -ml-1 rounded-full hover:bg-black/5 text-[#1c1917] transition-colors cursor-pointer"
            aria-label="Close sidebar menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href="/"
            onClick={onClose}
            className="inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
          >
            <Image
              src="/icon.png"
              alt="Plugd Playbooks"
              width={26}
              height={26}
              className="rounded-md shrink-0"
            />
            <span className="text-[17px] font-bold tracking-tight text-[#1c1917]">
              Plugd Playbooks
            </span>
          </Link>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto py-2.5 px-3 space-y-3 font-sans text-[13.5px]">
          {/* Main: Home */}
          <div>
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                pathname === "/"
                  ? "bg-[#e7e4dd] text-[#1c1917] font-semibold"
                  : "text-[#1c1917] hover:bg-black/5"
              }`}
            >
              <Home className="h-5 w-5 text-[#1c1917]" />
              <span>Home</span>
            </Link>
          </div>

          <div className="border-t border-[#e7e5e4] my-2" />

          {/* Following Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#78716c] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                Following
                <ChevronRight className="h-3.5 w-3.5 text-[#a8a29e]" />
              </span>
              {followedAuthors.length > 0 && (
                <span className="text-[11px] font-normal text-[#a8a29e]">
                  {followedAuthors.length}
                </span>
              )}
            </div>

            {followedAuthors.length > 0 ? (
              <div className="space-y-0.5">
                {followedAuthors.map((author) => {
                  const initial = author.name.charAt(0).toUpperCase();
                  const bg = author.avatarBg || getAvatarBgColor(author.name);
                  const href = author.slug ? `/${author.slug}` : "/";
                  return (
                    <Link
                      key={author.name}
                      href={href}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-[#1c1917] hover:bg-black/5 transition-colors group"
                      title={author.name}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="h-6 w-6 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-2xs"
                          style={{ backgroundColor: bg }}
                        >
                          {initial}
                        </div>
                        <span className="truncate text-[13px] font-medium text-[#292524] group-hover:text-[#1c1917]">
                          {author.name}
                        </span>
                      </div>
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#2563eb] shrink-0 ml-2"
                        title="Active creator"
                      />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="px-3 py-3 rounded-xl bg-black/[0.02] text-xs text-[#78716c] leading-relaxed">
                Follow your favorite authors to see their latest playbooks right here.
              </div>
            )}
          </div>

          <div className="border-t border-[#e7e5e4] my-2" />

          {/* You Section */}
          <div className="space-y-1">
            <div className="flex items-center px-3 py-1.5 text-xs font-semibold text-[#78716c] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                You
                <ChevronRight className="h-3.5 w-3.5 text-[#a8a29e]" />
              </span>
            </div>

            <Link
              href="/my-playbooks"
              onClick={onClose}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                pathname === "/my-playbooks"
                  ? "bg-[#e7e4dd] text-[#1c1917] font-semibold"
                  : "text-[#1c1917] hover:bg-black/5"
              }`}
            >
              <BookOpen className="h-5 w-5 text-[#57534e]" />
              <span>Your Playbooks</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCart?.();
              }}
              className="w-full flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium text-[#1c1917] hover:bg-black/5 transition-colors cursor-pointer text-left"
            >
              <ShoppingBag className="h-5 w-5 text-[#57534e]" />
              <span>Your Cart</span>
            </button>
          </div>

          {/* Sign in promo if user is not signed in */}
          {!isSignedIn && (
            <>
              <div className="border-t border-[#e7e5e4] my-2" />
              <div className="p-3 rounded-2xl bg-white border border-[#e7e5e4] space-y-2.5 shadow-2xs">
                <p className="text-xs text-[#57534e] leading-snug">
                  Sign in to follow authors, save your progress, and access your purchased playbooks.
                </p>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full border border-[#2563eb] text-[#2563eb] hover:bg-[#eff6ff] px-3.5 py-1.5 text-xs font-semibold transition-colors shadow-2xs"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Sign in</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
