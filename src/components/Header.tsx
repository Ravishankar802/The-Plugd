"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Plus,
  User,
  LogOut,
  Search,
  X,
  BookOpen,
  ShoppingBag,
} from "lucide-react";
import { performLogout } from "@/lib/auth-client";
import YouTubeSidebar from "@/components/YouTubeSidebar";
import CreatePlaybookModal from "@/components/CreatePlaybookModal";
import CartDrawer from "@/components/CartDrawer";

interface HeaderProps {
  activeCourse?: string;
  onOpenCheckout?: (slug?: "men" | "women") => void;
  isLanding?: boolean;
  hasAccess?: boolean;
  variant?: "platform" | "dating" | "app";
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  showSearch?: boolean;
}

export default function Header({
  activeCourse,
  onOpenCheckout,
  isLanding = false,
  hasAccess = false,
  variant,
  searchQuery = "",
  onSearchChange,
  showSearch = true,
}: HeaderProps) {
  const mode = variant || (isLanding ? "dating" : "app");

  // YouTube sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // User auth state detection
  const [isSignedIn, setIsSignedIn] = useState(hasAccess);
  const [userName, setUserName] = useState("Reader");
  const [userEmail, setUserEmail] = useState("");
  const [userInitial, setUserInitial] = useState("R");

  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = () => {
      const hasCookie =
        typeof document !== "undefined" &&
        document.cookie.includes("plugd_access_key");
      const storedEmail =
        typeof window !== "undefined"
          ? localStorage.getItem("plugd_user_email")
          : null;
      const storedName =
        typeof window !== "undefined"
          ? localStorage.getItem("plugd_user_name")
          : null;
      const storedSignedIn =
        typeof window !== "undefined"
          ? localStorage.getItem("plugd_signed_in") === "true"
          : false;

      const authed =
        hasAccess || hasCookie || storedSignedIn || Boolean(storedEmail);
      setIsSignedIn(authed);

      if (storedName) {
        setUserName(storedName);
        setUserInitial(storedName.trim().charAt(0).toUpperCase());
      } else if (storedEmail) {
        setUserEmail(storedEmail);
        const namePart = storedEmail.split("@")[0] || "Reader";
        setUserName(namePart);
        setUserInitial(namePart.trim().charAt(0).toUpperCase());
      } else if (authed) {
        setUserName("Reader");
        setUserInitial("R");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("plugd-auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("plugd-auth-change", checkAuth);
    };
  }, [hasAccess]);

  // Click outside profile dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const handleCloseSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const handleOpenCart = useCallback(() => setIsCartOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);
  const handleOpenCreate = useCallback(() => setIsCreateOpen(true), []);
  const handleCloseCreate = useCallback(() => setIsCreateOpen(false), []);

  // Shared YouTube Sidebar & Modals
  const sidebarAndModals = (
    <>
      <YouTubeSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        isSignedIn={isSignedIn}
        onOpenCart={handleOpenCart}
      />
      <CreatePlaybookModal
        isOpen={isCreateOpen}
        onClose={handleCloseCreate}
      />
      <CartDrawer isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );

  // Platform Header (Canonical YouTube-inspired top navigation)
  if (mode === "platform") {
    return (
      <>
        {sidebarAndModals}
        <header className="sticky top-0 z-40 w-full border-b border-[#dcd8d0] bg-[#e7e4dd]/95 backdrop-blur-md">
          <div className="mx-auto flex h-[56px] w-full max-w-[1600px] items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
            {/* Left: Hamburger Menu & Brand Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleOpenSidebar}
                className="p-2 -ml-1.5 rounded-full hover:bg-black/5 text-[#1c1917] transition-colors cursor-pointer"
                aria-label="Guide / Sidebar menu"
                title="Sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
                aria-label="Plugd Playbooks home"
              >
                <Image
                  src="/icon.png"
                  alt="Plugd Playbooks"
                  width={28}
                  height={28}
                  className="rounded-md shrink-0"
                  priority
                />
                <span className="text-[17.5px] sm:text-[18px] font-bold tracking-tight text-[#1c1917]">
                  Plugd Playbooks
                </span>
              </Link>
            </div>

            {/* Center: Search Field */}
            {showSearch && (
              <div className="flex flex-1 items-center justify-center max-w-[620px] px-1 sm:px-4">
                <div className="w-full flex items-center">
                  <div className="relative flex-1 flex items-center">
                    <Search className="absolute left-3.5 h-4 w-4 text-[#78716c] pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                      placeholder="Search Playbooks"
                      className="w-full h-9 sm:h-10 pl-9 pr-8 rounded-l-full border border-[#d6d3d1] bg-white text-[13.5px] sm:text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#1c1917] transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => onSearchChange?.("")}
                        className="absolute right-2.5 text-[#78716c] hover:text-[#1c1917] p-0.5 rounded-full hover:bg-[#dcd8d0] transition-colors cursor-pointer"
                        title="Clear search"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div
                    className="h-9 sm:h-10 px-4 sm:px-5 rounded-r-full border-y border-r border-[#d6d3d1] bg-[#ded9d0] text-[#44403c] flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <Search className="h-4 w-4 text-[#57534e]" />
                  </div>
                </div>
              </div>
            )}

            {/* Right: Actions, Create, & Auth */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {isSignedIn ? (
                <>
                  {/* + Create Button (YouTube style) */}
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.06] hover:bg-black/10 px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-semibold text-[#1c1917] transition-colors cursor-pointer"
                    title="Create a Playbook"
                  >
                    <Plus className="h-4 w-4 text-[#1c1917]" />
                    <span>Create</span>
                  </button>

                  {/* Profile Icon with First Letter */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-[#7c3aed] text-white font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer shadow-xs hover:ring-2 hover:ring-[#7c3aed]/40 transition-all"
                      title={userName}
                      aria-label="User account menu"
                      aria-expanded={isProfileOpen}
                    >
                      {userInitial}
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#dcd8d0] bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="px-3 py-2 border-b border-[#e7e5e4] mb-1">
                          <p className="text-xs font-semibold text-[#1c1917] truncate">
                            {userName}
                          </p>
                          <p className="text-[11px] text-[#78716c] truncate">
                            {userEmail || "Signed in"}
                          </p>
                        </div>
                        <Link
                          href="/my-playbooks"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1c1917] hover:bg-black/5 transition-colors"
                        >
                          <BookOpen className="h-4 w-4 text-[#78716c]" />
                          <span>Your Playbooks</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1c1917] hover:bg-black/5 transition-colors text-left cursor-pointer"
                        >
                          <ShoppingBag className="h-4 w-4 text-[#78716c]" />
                          <span>Your Cart</span>
                        </button>
                        <div className="border-t border-[#e7e5e4] my-1" />
                        <button
                          type="button"
                          onClick={performLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="h-4 w-4 text-red-600" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 justify-center rounded-full border border-[#d6d3d1] bg-white px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-[#1c1917] hover:bg-black/5 hover:border-[#1c1917] transition-colors shadow-2xs"
                >
                  <User className="h-3.5 w-3.5 text-[#2563eb]" />
                  <span>Sign in</span>
                </Link>
              )}
            </div>
          </div>
        </header>
      </>
    );
  }

  // Dating Playbook Landing Header
  if (mode === "dating") {
    return (
      <>
        {sidebarAndModals}
        <header className="sticky top-0 z-40 w-full border-b border-[#dcd8d0] bg-[#e7e4dd]/95 backdrop-blur-md transition-all">
          <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6">
            {/* Brand Logo & Lockup */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenSidebar}
                className="p-2 -ml-2 rounded-full hover:bg-black/5 text-[#1c1917] transition-colors cursor-pointer"
                aria-label="Open sidebar menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
                aria-label="The Dating Playbook, home"
              >
                <Image
                  src="/icon.png"
                  alt="The Dating Playbook"
                  width={28}
                  height={28}
                  className="rounded-md shrink-0"
                  priority
                />
                <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#1c1917] transition-colors group-hover:text-[#78716c]">
                  The Dating Playbook
                </span>
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-5 sm:gap-7">
              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-6" aria-label="Sections">
                <a
                  href="#curriculum"
                  className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
                >
                  What&apos;s inside
                </a>
                <a
                  href="#testimonials"
                  className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
                >
                  In their words
                </a>
                <a
                  href="#faq"
                  className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
                >
                  FAQ
                </a>
                {isSignedIn ? (
                  <button
                    type="button"
                    onClick={performLogout}
                    className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
                  >
                    <User className="h-4 w-4 text-[#2563eb]" />
                    <span>Sign in</span>
                  </Link>
                )}
              </nav>

              {/* Header Purchase CTA */}
              <div className="hidden sm:block">
                {hasAccess ? (
                  <Link
                    href="/learn/men"
                    className="btn btn-surface btn-small cursor-pointer"
                  >
                    <span className="btn-dot" aria-hidden="true" />
                    <span>Go to Playbook →</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => (onOpenCheckout ? onOpenCheckout("men") : undefined)}
                    className="btn btn-surface btn-small cursor-pointer"
                    data-cta="nav"
                  >
                    <span className="btn-dot" aria-hidden="true" />
                    <span>Get the playbook for $3</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  // Non-Landing Header (Overview pages, Learn pages, etc.)
  return (
    <>
      {sidebarAndModals}
      <header className="sticky top-0 z-40 w-full border-b border-[#e7e5e4] bg-[#faf8f5]/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[56px] sm:h-[64px] max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-3">
          {/* Brand Logo & Hamburger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenSidebar}
              className="p-2 -ml-1.5 rounded-full hover:bg-black/5 text-[#1c1917] transition-colors cursor-pointer"
              aria-label="Guide / Sidebar menu"
              title="Sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
              aria-label="Plugd, home"
            >
              <Image
                src="/icon.png"
                alt="Plugd"
                width={28}
                height={28}
                className="rounded-md shrink-0"
                priority
              />
              <span className="text-[16px] sm:text-[17px] font-bold tracking-tight text-[#1c1917]">
                {activeCourse === "men" ||
                activeCourse === "women" ||
                activeCourse === "dating-playbook"
                  ? "The Dating Playbook"
                  : "Plugd"}
              </span>
            </Link>
          </div>

          {/* Right Navigation & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isSignedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.06] hover:bg-black/10 px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-semibold text-[#1c1917] transition-colors cursor-pointer"
                  title="Create a Playbook"
                >
                  <Plus className="h-4 w-4 text-[#1c1917]" />
                  <span>Create</span>
                </button>

                <div className="relative" ref={profileDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-[#7c3aed] text-white font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer shadow-xs hover:ring-2 hover:ring-[#7c3aed]/40 transition-all"
                    title={userName}
                    aria-label="User account menu"
                  >
                    {userInitial}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#dcd8d0] bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3 py-2 border-b border-[#e7e5e4] mb-1">
                        <p className="text-xs font-semibold text-[#1c1917] truncate">
                          {userName}
                        </p>
                        <p className="text-[11px] text-[#78716c] truncate">
                          {userEmail || "Signed in"}
                        </p>
                      </div>
                      <Link
                        href="/my-playbooks"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1c1917] hover:bg-black/5 transition-colors"
                      >
                        <BookOpen className="h-4 w-4 text-[#78716c]" />
                        <span>Your Playbooks</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsCartOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1c1917] hover:bg-black/5 transition-colors text-left cursor-pointer"
                      >
                        <ShoppingBag className="h-4 w-4 text-[#78716c]" />
                        <span>Your Cart</span>
                      </button>
                      <div className="border-t border-[#e7e5e4] my-1" />
                      <button
                        type="button"
                        onClick={performLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 text-red-600" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 justify-center rounded-full border border-[#d6d3d1] bg-white px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-[#1c1917] hover:bg-black/5 hover:border-[#1c1917] transition-colors shadow-2xs"
              >
                <User className="h-3.5 w-3.5 text-[#2563eb]" />
                <span>Sign in</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
