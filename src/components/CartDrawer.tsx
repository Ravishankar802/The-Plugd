"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onCloseRef.current?.();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99] bg-black/50 backdrop-blur-2xs transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-[100] w-80 sm:w-96 bg-[#faf8f5] text-[#1c1917] border-l border-[#dcd8d0] shadow-2xl flex flex-col transition-transform duration-250 ease-out ${
          isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
        aria-label="My Cart"
      >
        <div className="flex h-[56px] items-center justify-between px-5 border-b border-[#e7e5e4] shrink-0">
          <div className="flex items-center gap-2 font-bold text-base text-[#1c1917]">
            <ShoppingBag className="h-4 w-4 text-[#2563eb]" />
            <span>My Cart</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#f0eee6] border border-[#e4e0d5] flex items-center justify-center text-[#78716c]">
            <ShoppingBag className="h-8 w-8 text-[#a8a29e]" />
          </div>
          <div className="space-y-1 max-w-xs">
            <h4 className="font-bold text-base text-[#1c1917]">My Cart is empty</h4>
            <p className="text-xs text-[#78716c] leading-relaxed">
              Explore 101 practical playbooks across AI, wealth, digital products, and high-income side hustles.
            </p>
          </div>
          <Link
            href="/"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1c1917] hover:bg-[#2563eb] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </aside>
    </>,
    document.body
  );
}
