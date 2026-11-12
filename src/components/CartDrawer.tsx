"use client";

import { useEffect, useState, useRef, useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, ArrowRight, Trash2, ShieldCheck, Tag } from "lucide-react";
import {
  removeFromCart,
  clearCart,
  useCartItems,
} from "@/lib/cart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const items = useCartItems();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

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

  const summary = useMemo(() => {
    const count = items.length;
    const total = items.reduce((acc, item) => acc + (typeof item.price === "number" ? item.price : 3), 0);
    const originalTotal = items.reduce(
      (acc, item) => acc + (typeof item.originalPrice === "number" ? item.originalPrice : item.price || 3),
      0
    );
    const savings = Math.max(0, originalTotal - total);
    return {
      count,
      total: Math.round(total * 100) / 100,
      originalTotal: Math.round(originalTotal * 100) / 100,
      savings: Math.round(savings * 100) / 100,
    };
  }, [items]);

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slugs: items.map((i) => i.slug),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Failed to initialize checkout. Please try again.");
      }

      if (data.allOwned) {
        setCheckoutError(data.message || "You already own all playbooks in your cart.");
        setIsCheckingOut(false);
        return;
      }

      if (data.checkoutUrl) {
        // Clear cart or retain until redirect completes
        window.location.href = data.checkoutUrl;
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("Unable to create checkout session. Please try again.");
      }
    } catch (err: unknown) {
      console.error("[CART_CHECKOUT_ERROR]", err);
      const msg = err instanceof Error ? err.message : "Failed to initiate checkout.";
      setCheckoutError(msg);
      setIsCheckingOut(false);
    }
  };

  if (!isClient) return null;

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
        className={`fixed top-0 bottom-0 right-0 z-[100] w-full sm:w-[420px] bg-[#FAF8F5] text-[#1c1917] border-l border-[#dcd8d0] shadow-2xl flex flex-col transition-transform duration-250 ease-out ${
          isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
        aria-label="My Cart"
      >
        {/* Header */}
        <div className="flex h-[60px] items-center justify-between px-5 border-b border-[#e7e5e4] bg-[#F5F2EB] shrink-0">
          <div className="flex items-center gap-2 font-bold text-base text-[#1c1917]">
            <ShoppingBag className="h-4 w-4 text-[#2563eb]" />
            <span>My Cart</span>
            {items.length > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-[#2563eb] text-white text-[11px] font-bold">
                {items.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] font-semibold text-[#78716c] hover:text-red-600 px-2 py-1 rounded transition-colors cursor-pointer"
                title="Remove all items from cart"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Cart Body */}
        {items.length === 0 ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-[#f0eee6] border border-[#e4e0d5] flex items-center justify-center text-[#78716c]">
              <ShoppingBag className="h-8 w-8 text-[#a8a29e]" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h4 className="font-bold text-base text-[#1c1917]">Your cart is empty</h4>
              <p className="text-xs text-[#78716c] leading-relaxed">
                Discover 109 practical Playbooks across AI automations, digital agencies, solopreneur systems, and wealth building.
              </p>
            </div>
            <Link
              href="/"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1c1917] hover:bg-[#2563eb] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Browse Playbooks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#e7e5e4] p-4 sm:p-5 space-y-3">
              {items.map((item) => {
                const discount =
                  item.discountPercent ||
                  (item.originalPrice > item.price
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : 0);

                return (
                  <div key={item.slug} className="pt-3 first:pt-0 flex gap-3 sm:gap-3.5 items-start group">
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-24 sm:w-28 rounded-lg overflow-hidden bg-[#eeebe5] border border-[#e5e1d8] shrink-0">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#eeebe5]" />
                      )}
                    </div>

                    {/* Metadata & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                      <div>
                        <Link
                          href={`/${item.slug}`}
                          onClick={onClose}
                          className="font-semibold text-xs sm:text-[13px] text-[#1c1917] hover:text-[#2563eb] line-clamp-2 leading-snug transition-colors"
                          title={item.title}
                        >
                          {item.title}
                        </Link>
                        {item.authorName && (
                          <span className="text-[11px] text-[#78716c] block mt-0.5 truncate">
                            {item.authorName}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        {/* Price & Discount */}
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-sm sm:text-base text-[#1c1917]">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-xs text-[#a8a29e] line-through font-medium">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                              <Tag className="h-2.5 w-2.5" />
                              {discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.slug)}
                          className="text-[#a8a29e] hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                          title="Remove from cart"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Error Message */}
            {checkoutError && (
              <div className="mx-4 sm:mx-5 mb-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 leading-snug">
                {checkoutError}
              </div>
            )}

            {/* Sticky Order Summary & Checkout Footer */}
            <div className="border-t border-[#e7e5e4] bg-[#F5F2EB] p-4 sm:p-5 space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#78716c]">
                  <span>List Price ({summary.count} {summary.count === 1 ? "item" : "items"})</span>
                  <span className="line-through">${summary.originalTotal.toFixed(2)}</span>
                </div>
                {summary.savings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Instant Native Discount</span>
                    <span>-${summary.savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-[#e7e5e4] pt-2 flex justify-between items-baseline font-bold text-base text-[#1c1917]">
                  <span>Total (USD)</span>
                  <span className="text-lg text-[#1c1917]">${summary.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isCheckingOut ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <span className="font-normal opacity-80">•</span>
                    <span>${summary.total.toFixed(2)}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716c] pt-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Lifetime access • One-time secure payment</span>
              </div>
            </div>
          </>
        )}
      </aside>
    </>,
    document.body
  );
}
