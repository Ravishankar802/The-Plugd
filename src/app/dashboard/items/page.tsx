"use client";

import {
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Upload,
  Check,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
};

type CatalogItem = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  shortDescription?: string | null;
  category: Category;
};

type WishlistItem = {
  id: string;
  slug: string;
  itemType: "CATALOG" | "CUSTOM";
  name: string;
  image: string | null;
  shortDescription?: string | null;
  description?: string | null;
  personalNote?: string | null;
  externalUrl?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  category?: Category | null;
};

export default function WishlistDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);

  // Custom Item Form State
  const [customFormOpen, setCustomFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WishlistItem | null>(null);
  const [customName, setCustomName] = useState("");
  const [customCategoryId, setCustomCategoryId] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [customShortDescription, setCustomShortDescription] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [customExternalUrl, setCustomExternalUrl] = useState("");
  const [customPersonalNote, setCustomPersonalNote] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const [authRes, wishlistRes, categoriesRes, catalogRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/wishlist"),
        fetch("/api/categories"),
        fetch("/api/catalog?limit=30"),
      ]);

      if (authRes.ok) {
        const auth = await authRes.json();
        setUsername(auth.user?.username || "");
      }
      if (wishlistRes.ok) setWishlist(await wishlistRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (catalogRes.ok) setCatalog(await catalogRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData().finally(() => setLoading(false));
  }, []);

  const handleSearchChange = async (val: string) => {
    setQuery(val);
    setSearching(true);
    try {
      const res = await fetch(`/api/catalog${val ? `?q=${encodeURIComponent(val)}&limit=30` : "?limit=30"}`);
      if (res.ok) {
        setCatalog(await res.json());
      }
    } finally {
      setSearching(false);
    }
  };

  const publicUrl = username
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/@${username}`
    : "";

  const handleCopyUrl = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCustomForm = () => {
    setCustomName("");
    setCustomCategoryId("");
    setCustomImage("");
    setCustomShortDescription("");
    setCustomDescription("");
    setCustomExternalUrl("");
    setCustomPersonalNote("");
    setEditingItem(null);
  };

  const showToast = (type: "success" | "error", message: string) => {
    if (type === "success") {
      setSuccess(message);
      setError("");
      setTimeout(() => setSuccess(""), 3500);
    } else {
      setError(message);
      setSuccess("");
      setTimeout(() => setError(""), 4000);
    }
  };

  const addCatalogItem = async (catalogItemId: string) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catalogItemId }),
      });

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.error || "Could not add item to wishlist.");
        return;
      }

      setWishlist(data);
      showToast("success", "Added to wishlist.");
    } catch {
      showToast("error", "Failed to add item to wishlist.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "Image file size exceeds 5MB limit.");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "wishlist_custom");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setCustomImage(data.url);
        showToast("success", "Image uploaded.");
      } else {
        showToast("error", data.error || "Image upload failed.");
      }
    } catch {
      showToast("error", "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const saveCustomItem = async () => {
    if (!customName.trim()) {
      showToast("error", "Please provide a name for your custom wishlist item.");
      return;
    }

    const payload = {
      name: customName.trim(),
      categoryId: customCategoryId || null,
      image: customImage || null,
      shortDescription: customShortDescription.trim(),
      description: customDescription.trim(),
      externalUrl: customExternalUrl.trim(),
      personalNote: customPersonalNote.trim(),
    };

    try {
      const response = await fetch("/api/wishlist", {
        method: editingItem ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { id: editingItem.id, ...payload } : payload),
      });

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.error || "Could not save custom item.");
        return;
      }

      setWishlist(data);
      setCustomFormOpen(false);
      resetCustomForm();
      showToast("success", editingItem ? "Custom item updated." : "Custom item added to wishlist!");
    } catch {
      showToast("error", "Failed to save custom item.");
    }
  };

  const removeItem = async (id: string) => {
    try {
      const response = await fetch(`/api/wishlist?id=${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.error || "Could not remove item.");
        return;
      }
      setWishlist(data);
      showToast("success", "Item removed from wishlist.");
    } catch {
      showToast("error", "Failed to remove item.");
    }
  };

  const toggleItem = async (item: WishlistItem, field: "isFeatured" | "isPublished") => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          [field]: !item[field],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.error || "Could not update item.");
        return;
      }
      setWishlist(data);
      showToast("success", field === "isFeatured" ? (item.isFeatured ? "Unfeatured" : "Featured on top") : (item.isPublished ? "Item hidden" : "Item published"));
    } catch {
      showToast("error", "Failed to update item.");
    }
  };

  const reorder = async (index: number, direction: "up" | "down") => {
    const next = [...wishlist];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;

    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    const reorders = next.map((item, orderIndex) => ({ id: item.id, displayOrder: orderIndex }));

    setWishlist(next.map((item, orderIndex) => ({ ...item, displayOrder: orderIndex })));

    try {
      const response = await fetch("/api/wishlist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorders }),
      });

      if (response.ok) {
        setWishlist(await response.json());
      }
    } catch {
      showToast("error", "Failed to save reorder.");
    }
  };

  const beginEdit = (item: WishlistItem) => {
    if (item.itemType !== "CUSTOM") return;

    setEditingItem(item);
    setCustomFormOpen(true);
    setCustomName(item.name);
    setCustomCategoryId(item.category?.id || "");
    setCustomImage(item.image || "");
    setCustomShortDescription(item.shortDescription || "");
    setCustomDescription(item.description || "");
    setCustomExternalUrl(item.externalUrl || "");
    setCustomPersonalNote(item.personalNote || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const alreadyWishlistedIds = useMemo(() => {
    return new Set(wishlist.map((w) => w.name.toLowerCase()));
  }, [wishlist]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 font-sans max-w-5xl">
      {/* Page Header with Public Link & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-100">My Wishlist</h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-400">
            Manage the items on your public wishlist. Add from our catalog or create custom goals.
          </p>
        </div>

        {username ? (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 text-xs font-bold text-zinc-200 transition hover:border-zinc-700 hover:text-white"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
              <span>{copied ? "Copied Link" : "Copy URL"}</span>
            </button>
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-orange-500 px-4 text-xs font-bold text-black transition hover:bg-orange-400"
            >
              <span>Preview Page</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : null}
      </div>

      {/* Notifications Toast */}
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-300 animate-in fade-in">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{success}</span>
        </div>
      )}

      {/* 1. SECTION: Add from Catalog */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              Catalog Discovery
            </div>
            <h2 className="mt-1 text-xl font-black text-zinc-100">Add from Catalog</h2>
            <p className="text-xs text-zinc-400">Search over 170+ standardized creator items and add them in 1 click.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search (e.g. iPhone, Camera, Japan, Coffee)..."
              className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-xs font-medium text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Catalog grid */}
        {catalog.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.slice(0, query ? 18 : 6).map((item) => {
              const isAdded = alreadyWishlistedIds.has(item.name.toLowerCase());
              return (
                <div
                  key={item.id}
                  className="flex gap-3.5 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-3.5 transition hover:border-zinc-700"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-900 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <Sparkles className="h-6 w-6 text-zinc-600" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                        {item.category.name}
                      </span>
                      <h3 className="truncate text-xs font-bold text-zinc-100">{item.name}</h3>
                      {item.shortDescription ? (
                        <p className="line-clamp-1 text-[11px] text-zinc-400">{item.shortDescription}</p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => addCatalogItem(item.id)}
                      disabled={isAdded}
                      className={`inline-flex h-8 items-center justify-center gap-1 rounded-xl px-3 text-[11px] font-bold transition ${
                        isAdded
                          ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                          : "bg-orange-500 text-black hover:bg-orange-400"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>In Wishlist</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          <span>Add to Wishlist</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-6 text-center space-y-3">
            <p className="text-xs text-zinc-400">
              No catalog items found matching &ldquo;{query}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setCustomName(query);
                setCustomFormOpen(true);
                setEditingItem(null);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-orange-500 px-4 text-xs font-bold text-black hover:bg-orange-400 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create Custom Item for &ldquo;{query}&rdquo;</span>
            </button>
          </div>
        )}
      </section>

      {/* 2. SECTION: Create Custom Wishlist Item */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              Custom Item Flow
            </div>
            <h2 className="mt-1 text-xl font-black text-zinc-100">
              {editingItem ? `Edit Custom Item: ${editingItem.name}` : "Create Custom Wishlist Item"}
            </h2>
            <p className="text-xs text-zinc-400">
              Wishlisting a dream studio, personal project, trip, or unique goal? Add it here.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (customFormOpen) {
                resetCustomForm();
                setCustomFormOpen(false);
              } else {
                setCustomFormOpen(true);
              }
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-xs font-bold text-zinc-200 transition hover:border-zinc-500 hover:text-white shrink-0"
          >
            {customFormOpen ? (
              <>
                <X className="h-3.5 w-3.5" />
                <span>Close Form</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 text-orange-500" />
                <span>+ Create Custom Item</span>
              </>
            )}
          </button>
        </div>

        {customFormOpen && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 md:p-6 space-y-5 animate-in fade-in duration-200">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Item Name */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. My Dream Recording Studio, Trip to Kyoto, Road Trip Van..."
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-100 outline-none focus:border-orange-500 transition"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Category
                </label>
                <select
                  value={customCategoryId}
                  onChange={(e) => setCustomCategoryId(e.target.value)}
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-xs font-medium text-zinc-100 outline-none focus:border-orange-500 transition"
                >
                  <option value="">Select a category (optional)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload or URL */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Image (Upload or paste URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customImage}
                    onChange={(e) => setCustomImage(e.target.value)}
                    placeholder="https://..."
                    className="h-11 flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-100 outline-none focus:border-orange-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 text-xs font-bold text-zinc-200 transition hover:bg-zinc-700 shrink-0"
                  >
                    {uploadingImage ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    <span>Upload</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Short Description
                </label>
                <input
                  type="text"
                  value={customShortDescription}
                  onChange={(e) => setCustomShortDescription(e.target.value)}
                  placeholder="One sentence describing what this is..."
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-100 outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Personal Note (Shown on Public Wishlist Card) */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Personal Note (Visible on your public wishlist card)
                </label>
                <textarea
                  value={customPersonalNote}
                  onChange={(e) => setCustomPersonalNote(e.target.value)}
                  placeholder="Tell your audience why this wishlist item matters to you..."
                  rows={2}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs font-medium text-zinc-100 outline-none focus:border-orange-500 transition resize-none"
                />
              </div>

              {/* Long Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Full Details (Optional)
                </label>
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Additional context or links..."
                  rows={3}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs font-medium text-zinc-100 outline-none focus:border-orange-500 transition resize-none"
                />
              </div>

              {/* External Link */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  External Reference Link (Optional)
                </label>
                <input
                  type="url"
                  value={customExternalUrl}
                  onChange={(e) => setCustomExternalUrl(e.target.value)}
                  placeholder="https://example.com/item"
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-100 outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={saveCustomItem}
                className="h-11 rounded-xl bg-orange-500 px-6 text-xs font-bold text-black transition hover:bg-orange-400"
              >
                {editingItem ? "Save Changes" : "Create Custom Item"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetCustomForm();
                  setCustomFormOpen(false);
                }}
                className="h-11 rounded-xl border border-zinc-800 bg-zinc-900 px-5 text-xs font-bold text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. SECTION: Manage Current Wishlist Items */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-zinc-100">Wishlist Items ({wishlist.length})</h2>
            <p className="text-xs text-zinc-400">
              Reorder items, feature standout picks, and manage what appears on your public page.
            </p>
          </div>
        </div>

        {wishlist.length > 0 ? (
          <div className="space-y-3">
            {wishlist.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 md:flex-row md:items-center md:justify-between transition hover:border-zinc-700"
              >
                {/* Left: Thumbnail and metadata */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-900 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-zinc-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-zinc-100">{item.name}</h3>
                      {item.isFeatured ? (
                        <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 text-[10px] font-bold text-orange-400">
                          Featured
                        </span>
                      ) : null}
                      {!item.isPublished ? (
                        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-400">
                          Hidden
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-[11px] text-zinc-400">
                      {item.category?.name || "Wishlist"} •{" "}
                      {item.itemType === "CUSTOM" ? "Custom Item" : "Catalog Item"}
                    </p>
                    {item.personalNote ? (
                      <p className="mt-1 text-[11px] text-zinc-300 italic line-clamp-1">
                        &ldquo;{item.personalNote}&rdquo;
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                  {/* Reorder Arrows */}
                  <div className="flex rounded-xl border border-zinc-800 bg-zinc-900">
                    <button
                      type="button"
                      onClick={() => reorder(index, "up")}
                      disabled={index === 0}
                      className="p-2 text-zinc-400 hover:text-white disabled:opacity-20 transition"
                      title="Move up"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <div className="w-px bg-zinc-800" />
                    <button
                      type="button"
                      onClick={() => reorder(index, "down")}
                      disabled={index === wishlist.length - 1}
                      className="p-2 text-zinc-400 hover:text-white disabled:opacity-20 transition"
                      title="Move down"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Feature Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item, "isFeatured")}
                    className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition ${
                      item.isFeatured
                        ? "bg-orange-500 text-black"
                        : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700"
                    }`}
                    title="Feature this item on your public profile"
                  >
                    <Star className="h-3.5 w-3.5" fill={item.isFeatured ? "currentColor" : "none"} />
                    <span>{item.isFeatured ? "Featured" : "Feature"}</span>
                  </button>

                  {/* Publish/Hide Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item, "isPublished")}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-xs font-bold text-zinc-300 hover:border-zinc-700 transition"
                    title={item.isPublished ? "Hide from public profile" : "Publish to profile"}
                  >
                    {item.isPublished ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    <span>{item.isPublished ? "Visible" : "Hidden"}</span>
                  </button>

                  {/* Edit Custom Item */}
                  {item.itemType === "CUSTOM" ? (
                    <button
                      type="button"
                      onClick={() => beginEdit(item)}
                      className="inline-flex h-9 items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-xs font-bold text-zinc-300 hover:border-zinc-700 transition"
                      title="Edit custom item"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                  ) : null}

                  {/* Delete Item */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-xs font-bold text-red-400 hover:bg-red-500/20 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-8 text-center space-y-3">
            <p className="text-sm font-bold text-zinc-300">Your wishlist is currently empty.</p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Add wishlist items from our catalog above or create a custom item to get started.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
