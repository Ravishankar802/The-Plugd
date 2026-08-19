"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Gift, 
  Folder, 
  CreditCard, 
  Palette, 
  LogOut, 
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface DashboardSidebarProps {
  email: string;
  username?: string | null;
  isAdmin: boolean;
}

export default function DashboardSidebar({ email, username, isAdmin }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { 
      name: "Overview", 
      href: "/dashboard", 
      icon: LayoutDashboard,
      active: pathname === "/dashboard"
    },
    { 
      name: "Items", 
      href: "/dashboard/items", 
      icon: Gift,
      active: pathname === "/dashboard/items"
    },
    { 
      name: "Categories", 
      href: "/dashboard/categories", 
      icon: Folder,
      active: pathname === "/dashboard/categories"
    },
    { 
      name: "Payments", 
      href: "/dashboard/payments", 
      icon: CreditCard,
      active: pathname === "/dashboard/payments"
    },
    { 
      name: "Appearance", 
      href: "/dashboard/appearance", 
      icon: Palette,
      active: pathname === "/dashboard/appearance"
    },
  ];

  const publicPageHref = username ? `/@${username}` : null;

  const NavLinks = () => (
    <div className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
              item.active 
                ? "bg-orange-500/10 border-orange-500/20 text-orange-500 font-semibold" 
                : "text-zinc-400 hover:text-zinc-100 border-transparent hover:bg-zinc-900/50"
            }`}
          >
            <Icon size={18} />
            <span className="text-[0.95rem] tracking-tight">{item.name}</span>
          </Link>
        );
      })}

      {publicPageHref && (
        <a
          href={publicPageHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all border text-zinc-400 hover:text-zinc-100 border-transparent hover:bg-zinc-900/50 group"
        >
          <div className="flex items-center gap-3">
            <ExternalLink size={18} />
            <span className="text-[0.95rem] tracking-tight">View Public Page</span>
          </div>
        </a>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 z-40 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Plugd" width={32} height={32} />
          <span className="font-bold text-lg text-zinc-100">Plugd</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-zinc-400 hover:text-zinc-100"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-45"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar / Mobile Menu drawer */}
      <aside 
        className={`fixed top-16 md:top-0 bottom-0 left-0 z-45 w-[280px] bg-zinc-950 border-r border-zinc-900 flex flex-col h-[calc(100vh-64px)] md:h-screen transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Logo (desktop only) */}
        <div className="hidden md:flex items-center gap-3 px-6 pt-6 pb-4">
          <Link href="/dashboard" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <Image src="/logo.png" alt="Plugd" width={48} height={48} />
            <span className="font-bold text-xl text-zinc-100 font-sans tracking-tight">Plugd</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <NavLinks />
        </nav>

        {/* Bottom sign-in info */}
        <div className="p-4 border-t border-zinc-900 bg-zinc-950/50">
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4 space-y-4">
            <div className="min-w-0">
              <p className="text-[0.75rem] text-zinc-500 uppercase font-bold tracking-wider mb-1">Signed in as</p>
              <p className="text-zinc-200 font-medium text-[0.9rem] tracking-tight truncate" title={email}>{email}</p>
              {username && (
                <p className="text-orange-500 font-bold text-xs mt-0.5">@{username}</p>
              )}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowLogoutConfirm(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-all text-xs font-semibold"
            >
              <LogOut size={14} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-sm w-full shadow-2xl flex flex-col items-center text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-full flex items-center justify-center">
              <LogOut className="text-zinc-400 w-5 h-5" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-zinc-100">Confirm Logout</h3>
              <p className="text-sm text-zinc-400 leading-normal">
                Are you sure you want to log out of your session?
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-800 font-bold transition-all text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all text-sm cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
