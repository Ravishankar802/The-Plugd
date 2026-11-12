"use client";

import { useSyncExternalStore } from "react";

export interface CartItem {
  slug: string;
  playbookId: string;
  title: string;
  thumbnail: string;
  price: number; // Discounted selling price in USD (e.g. 1.00, 3.00)
  originalPrice: number; // Original list price in USD (e.g. 2.49, 9.00)
  discountPercent?: number; // e.g. 60
  dodoProductId?: string;
  authorName?: string;
}

const CART_STORAGE_KEY = "plugd_cart_items";

/**
 * Retrieve all items currently in the cart from localStorage.
 */
export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("[CART_READ_ERROR]", err);
    return [];
  }
}

/**
 * Add a playbook item to the cart.
 * Prevents duplicates by slug.
 * Dispatches 'plugd-cart-change' custom event.
 */
export function addToCart(item: CartItem): { success: boolean; alreadyInCart: boolean } {
  if (typeof window === "undefined") return { success: false, alreadyInCart: false };
  try {
    const items = getCartItems();
    const existingIndex = items.findIndex((i) => i.slug === item.slug);
    if (existingIndex >= 0) {
      return { success: false, alreadyInCart: true };
    }
    const updated = [...items, item];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    dispatchCartChange();
    return { success: true, alreadyInCart: false };
  } catch (err) {
    console.error("[CART_ADD_ERROR]", err);
    return { success: false, alreadyInCart: false };
  }
}

/**
 * Remove an item from the cart by its playbook slug.
 */
export function removeFromCart(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const items = getCartItems();
    const filtered = items.filter((i) => i.slug !== slug);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filtered));
    dispatchCartChange();
  } catch (err) {
    console.error("[CART_REMOVE_ERROR]", err);
  }
}

/**
 * Clear all items from the cart.
 */
export function clearCart(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    dispatchCartChange();
  } catch (err) {
    console.error("[CART_CLEAR_ERROR]", err);
  }
}

/**
 * Check if a specific playbook slug is already in the cart.
 */
export function isInCart(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const items = getCartItems();
  return items.some((i) => i.slug === slug);
}

/**
 * Calculate cart summary metrics: count, discounted total, original total, and total savings.
 */
export function getCartSummary(): {
  count: number;
  total: number;
  originalTotal: number;
  savings: number;
} {
  const items = getCartItems();
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
}

/**
 * Notify all listeners across the window that the cart contents have changed.
 */
export function dispatchCartChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("plugd-cart-change"));
}

/**
 * Trigger the cart drawer to open from any component.
 */
export function openCartDrawer(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("plugd-open-cart"));
}

let cachedPurchasedSlugsPromise: Promise<string[]> | null = null;
let cachedPurchasedSlugs: string[] | null = null;

/**
 * Fetch and cache the list of playbook slugs owned by the current customer.
 */
export async function getCustomerPurchasedSlugs(): Promise<string[]> {
  if (typeof window === "undefined") return [];
  if (cachedPurchasedSlugs) return cachedPurchasedSlugs;
  if (cachedPurchasedSlugsPromise) return cachedPurchasedSlugsPromise;

  cachedPurchasedSlugsPromise = fetch("/api/customer/playbooks")
    .then((res) => (res.ok ? res.json() : { purchasedSlugs: [] }))
    .then((data) => {
      const slugs = Array.isArray(data.purchasedSlugs)
        ? (data.purchasedSlugs as string[])
        : Array.isArray(data.playbooks)
        ? data.playbooks.map((p: { courseSlug: string }) => p.courseSlug)
        : [];
      cachedPurchasedSlugs = slugs;
      return slugs;
    })
    .catch(() => {
      return [];
    })
    .finally(() => {
      cachedPurchasedSlugsPromise = null;
    });

  return cachedPurchasedSlugsPromise;
}

const emptyItems: CartItem[] = [];

function subscribeCart(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("plugd-cart-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("plugd-cart-change", callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedRawCart: string | null = null;
let cachedItemsSnapshot: CartItem[] = emptyItems;

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return emptyItems;
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY) || "";
    if (raw !== cachedRawCart) {
      cachedRawCart = raw;
      cachedItemsSnapshot = raw ? (JSON.parse(raw) as CartItem[]) : emptyItems;
    }
    return cachedItemsSnapshot;
  } catch {
    return emptyItems;
  }
}

/**
 * Reactive hook returning all items currently in the cart.
 */
export function useCartItems(): CartItem[] {
  return useSyncExternalStore(subscribeCart, getCartSnapshot, () => emptyItems);
}

/**
 * Reactive hook returning the total number of items in the cart.
 */
export function useCartCount(): number {
  const items = useCartItems();
  return items.length;
}

/**
 * Reactive hook returning whether a specific playbook slug is in the cart.
 */
export function useIsInCart(slug: string): boolean {
  const items = useCartItems();
  return items.some((i) => i.slug.toLowerCase() === slug.toLowerCase());
}
