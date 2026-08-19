"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Loader2, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Upload,
  CheckCircle2,
  Gift,
  Star,
  EyeOff,
  Eye,
  Archive,
  Edit3,
  X
} from "lucide-react";

export default function ItemsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // New Item details
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Edit Item details
  const [editName, setEditName] = useState("");
  const [editShortDescription, setEditShortDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editIsPublished, setEditIsPublished] = useState(true);
  const [editIsArchived, setEditIsArchived] = useState(false);
  const [editSlug, setEditSlug] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = async () => {
    try {
      const [itemsRes, catsRes] = await Promise.all([
        fetch("/api/items"),
        fetch("/api/categories")
      ]);

      if (itemsRes.ok && catsRes.ok) {
        const itemsData = await itemsRes.json();
        const catsData = await catsRes.json();
        setItems(itemsData);
        setCategories(catsData);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
      return;
    }

    setUploadingImage(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "items");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        if (isEdit) setEditImageUrl(data.url);
        else setImageUrl(data.url);
      } else {
        setError(data.error || "Failed to upload item image.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !imageUrl || uploadingImage) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          shortDescription: shortDescription.trim(),
          description: description.trim(),
          imageUrl,
          categoryId: categoryId || null,
          isFeatured,
          isPublished,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Item goal created successfully!");
        setName("");
        setShortDescription("");
        setDescription("");
        setImageUrl("");
        setCategoryId("");
        setIsFeatured(false);
        setIsPublished(true);
        setShowAddForm(false);
        setItems([...items, data]);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to create item.");
      }
    } catch (err) {
      console.error("Error creating item:", err);
      setError("Failed to create item.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editName.trim() || !editImageUrl || uploadingImage) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingItem.id,
          name: editName.trim(),
          slug: editSlug.trim(),
          shortDescription: editShortDescription.trim(),
          description: editDescription.trim(),
          imageUrl: editImageUrl,
          categoryId: editCategoryId || null,
          isFeatured: editIsFeatured,
          isPublished: editIsPublished,
          isArchived: editIsArchived,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Item goal updated successfully!");
        setItems(items.map(item => item.id === editingItem.id ? data : item));
        setEditingItem(null);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to update item.");
      }
    } catch (err) {
      console.error("Error editing item:", err);
      setError("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this support goal? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/items?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete support goal.");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const newItems = [...items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Update display orders locally
    const reordered = newItems.map((item, idx) => ({
      ...item,
      displayOrder: idx,
    }));

    setItems(reordered);

    // Save to DB
    try {
      await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reorders: reordered.map((item) => ({ id: item.id, displayOrder: item.displayOrder })),
        }),
      });
    } catch (err) {
      console.error("Failed to save item order:", err);
    }
  };

  const handleQuickToggle = async (item: any, field: "isFeatured" | "isPublished" | "isArchived") => {
    const originalValue = item[field];
    const newValue = !originalValue;

    // Optimistically update UI
    setItems(items.map(i => i.id === item.id ? { ...i, [field]: newValue } : i));

    try {
      const res = await fetch("/api/items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          [field]: newValue
        })
      });
      if (!res.ok) {
        // Revert on error
        setItems(items.map(i => i.id === item.id ? { ...i, [field]: originalValue } : i));
        const data = await res.json();
        alert(data.error || "Failed to update item.");
      }
    } catch (err) {
      console.error("Failed to toggle field:", err);
      // Revert on error
      setItems(items.map(i => i.id === item.id ? { ...i, [field]: originalValue } : i));
    }
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setEditName(item.name || "");
    setEditSlug(item.slug || "");
    setEditShortDescription(item.shortDescription || "");
    setEditDescription(item.description || "");
    setEditImageUrl(item.imageUrl || "");
    setEditCategoryId(item.categoryId || "");
    setEditIsFeatured(item.isFeatured || false);
    setEditIsPublished(item.isPublished !== false);
    setEditIsArchived(item.isArchived || false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-zinc-100 tracking-tight">Support Goals</h1>
          <p className="text-zinc-400 text-sm mt-1.5 font-normal">
            Add and manage things you would like your audience to help you get.
          </p>
        </div>

        {!showAddForm && !editingItem && (
          <button
            onClick={() => setShowAddForm(true)}
            className="self-start sm:self-center h-12 px-5 bg-orange-500 hover:bg-orange-600 text-black font-extrabold rounded-xl text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-orange-500/5"
          >
            <Plus className="w-4 h-4" /> Add Support Goal
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-semibold">{error}</p>
      )}
      {success && (
        <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" /> {success}
        </p>
      )}

      {/* CREATE NEW SUPPORT GOAL FORM */}
      {showAddForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-lg font-bold text-zinc-200">Add Support Goal</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-1.5 text-zinc-500 hover:text-zinc-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateItem} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Goal Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Goal Name *</label>
                <input
                  type="text"
                  placeholder="e.g. MacBook Pro, Coffee, Books"
                  className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-semibold"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Category *</label>
                <select
                  className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium cursor-pointer"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon ? `${c.icon} ` : ""}{c.name}
                    </option>
                  ))}
                  <option value="uncategorized">No category (Uncategorized)</option>
                </select>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Tagline / Short Description</label>
                <input
                  type="text"
                  placeholder="e.g. For building my next startup."
                  className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  maxLength={80}
                />
              </div>

              {/* Full Description / Why I want this */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">The Story / Why I want this</label>
                <textarea
                  placeholder="e.g. My current laptop is struggling with development. I am saving toward a MacBook Pro that I'll use to build my next product."
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-850 rounded-xl p-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium resize-none leading-relaxed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                />
              </div>

              {/* Goal Image Upload */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Goal Image *</label>
                {imageUrl ? (
                  <div className="relative border border-zinc-850 rounded-xl p-3 bg-zinc-950/40 w-fit flex flex-col items-center gap-3">
                    <img 
                      src={imageUrl} 
                      alt="Goal" 
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Remove Image
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 cursor-pointer bg-zinc-950/20 hover:bg-zinc-950/40 transition-all h-36"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-zinc-500" />
                        <span className="text-xs text-zinc-400 font-semibold">Upload Goal Image</span>
                        <span className="text-[9px] text-zinc-600 font-medium">JPEG, PNG, WEBP up to 5MB</span>
                      </>
                    )}
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e, false)}
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-col sm:flex-row gap-6 md:col-span-2 pt-2">
                {/* Feature */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-orange-500 rounded border-zinc-800 bg-zinc-950 text-orange-500"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <div>
                    <span className="text-sm font-bold text-zinc-200">Feature this Goal</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Will display prominently at the top of your page</p>
                  </div>
                </label>

                {/* Publish */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-orange-500 rounded border-zinc-800 bg-zinc-950 text-orange-500"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <div>
                    <span className="text-sm font-bold text-zinc-200">Publish Goal</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Visible on your public profile immediately</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4 border-t border-zinc-800 pt-6">
              <button
                type="submit"
                disabled={loading || !imageUrl || uploadingImage}
                className="h-12 px-6 bg-orange-500 text-black font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-orange-500/5"
              >
                Create Support Goal
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="h-12 px-6 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT MODAL DIALOG */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingItem(null)} />
          <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-zinc-200">Edit Support Goal</h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-zinc-500 hover:text-zinc-200 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditItemSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Goal Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Goal Name *</label>
                  <input
                    type="text"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-semibold"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    maxLength={50}
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Custom URL Slug</label>
                  <input
                    type="text"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-semibold"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    maxLength={50}
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Category *</label>
                  <select
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium cursor-pointer"
                    value={editCategoryId}
                    onChange={(e) => setEditCategoryId(e.target.value)}
                  >
                    <option value="">No category (Uncategorized)</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon ? `${c.icon} ` : ""}{c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Tagline / Short Description</label>
                  <input
                    type="text"
                    className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                    value={editShortDescription}
                    onChange={(e) => setEditShortDescription(e.target.value)}
                    maxLength={80}
                  />
                </div>

                {/* Full Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">The Story / Why I want this</label>
                  <textarea
                    rows={4}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl p-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium resize-none leading-relaxed"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    maxLength={500}
                  />
                </div>

                {/* Goal Image Upload */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Goal Image *</label>
                  {editImageUrl ? (
                    <div className="relative border border-zinc-850 rounded-xl p-3 bg-zinc-950/40 w-fit flex flex-col items-center gap-3">
                      <img 
                        src={editImageUrl} 
                        alt="Goal" 
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setEditImageUrl("")}
                        className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Image
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => editFileInputRef.current?.click()}
                      className="border border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 cursor-pointer bg-zinc-950/20 hover:bg-zinc-950/40 transition-all h-36"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-zinc-500" />
                          <span className="text-xs text-zinc-400 font-semibold">Upload Goal Image</span>
                          <span className="text-[9px] text-zinc-600 font-medium">JPEG, PNG, WEBP up to 5MB</span>
                        </>
                      )}
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={editFileInputRef}
                    onChange={(e) => handleImageUpload(e, true)}
                    className="hidden" 
                    accept="image/*"
                  />
                </div>

                {/* Toggles */}
                <div className="flex flex-col sm:flex-row gap-6 md:col-span-2 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-orange-500 rounded border-zinc-800 bg-zinc-950 text-orange-500"
                      checked={editIsFeatured}
                      onChange={(e) => setEditIsFeatured(e.target.checked)}
                    />
                    <span className="text-sm font-bold text-zinc-200">Feature this Goal</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-orange-500 rounded border-zinc-800 bg-zinc-950 text-orange-500"
                      checked={editIsPublished}
                      onChange={(e) => setEditIsPublished(e.target.checked)}
                    />
                    <span className="text-sm font-bold text-zinc-200">Published</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-orange-500 rounded border-zinc-800 bg-zinc-950 text-orange-500"
                      checked={editIsArchived}
                      onChange={(e) => setEditIsArchived(e.target.checked)}
                    />
                    <span className="text-sm font-bold text-zinc-200">Archived</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 border-t border-zinc-800 pt-6">
                <button
                  type="submit"
                  disabled={loading || !editImageUrl || uploadingImage}
                  className="h-12 px-6 bg-orange-500 text-black font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-orange-500/5"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="h-12 px-6 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ITEMS LIST */}
      {!showAddForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-200">Current Goals</h2>

          {items.length === 0 ? (
            <div className="border border-dashed border-zinc-800 rounded-xl p-16 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-600">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-zinc-300 text-sm">No items yet</p>
                <p className="text-xs text-zinc-500 mt-1 leading-normal">
                  Add the first thing you'd love your audience to support.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => {
                const cat = categories.find((c) => c.id === item.categoryId);
                return (
                  <div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-950/40 border border-zinc-800 rounded-xl gap-4 hover:border-zinc-750 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Image */}
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-16 h-12 object-cover rounded-lg bg-zinc-900 border border-zinc-800 shrink-0"
                      />

                      {/* Info */}
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-zinc-200 text-sm truncate">{item.name}</span>
                          
                          {/* Badges */}
                          {item.isFeatured && (
                            <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-orange-500" /> Featured
                            </span>
                          )}
                          {!item.isPublished && (
                            <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-zinc-850 border border-zinc-800 text-zinc-500">
                              Draft
                            </span>
                          )}
                          {item.isArchived && (
                            <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-500">
                              Archived
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 truncate max-w-sm">{item.shortDescription || "No tagline description"}</p>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
                          Category: {cat ? `${cat.icon || ""} ${cat.name}` : "Uncategorized"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2.5 shrink-0">
                      {/* Reordering */}
                      <div className="flex items-center bg-zinc-950 border border-zinc-850 rounded-lg p-0.5">
                        <button
                          onClick={() => handleMove(index, "up")}
                          disabled={index === 0}
                          className="p-1.5 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                          title="Move Up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <div className="w-[1px] h-4 bg-zinc-850" />
                        <button
                          onClick={() => handleMove(index, "down")}
                          disabled={index === items.length - 1}
                          className="p-1.5 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                          title="Move Down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleQuickToggle(item, "isFeatured")}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            item.isFeatured 
                              ? "bg-orange-500/10 border-orange-500/30 text-orange-500" 
                              : "bg-zinc-950 hover:bg-zinc-900 border-zinc-850 text-zinc-500 hover:text-zinc-300"
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleQuickToggle(item, "isPublished")}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            item.isPublished 
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                              : "bg-zinc-950 hover:bg-zinc-900 border-zinc-850 text-zinc-500 hover:text-zinc-300"
                          }`}
                          title={item.isPublished ? "De-publish / Draft" : "Publish"}
                        >
                          {item.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-500 hover:text-zinc-200 rounded-lg transition-colors cursor-pointer"
                          title="Edit Goal"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 bg-zinc-950 hover:bg-red-500/10 border border-zinc-850 hover:border-red-500/20 text-zinc-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                          title="Delete Goal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
