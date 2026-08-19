"use client";

import { useState, useEffect } from "react";
import { 
  Loader2, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  CheckCircle2,
  FolderOpen
} from "lucide-react";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, icon }),
      });

      const data = await res.json();
      if (res.ok) {
        setName("");
        setIcon("");
        setSuccess("Category created successfully!");
        setCategories([...categories, data]);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to create category");
      }
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? Any goals inside will be moved to 'Uncategorized'.")) {
      return;
    }

    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const newCategories = [...categories];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    // Swap
    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;

    // Update display orders locally
    const reordered = newCategories.map((c, idx) => ({
      ...c,
      displayOrder: idx,
    }));

    setCategories(reordered);

    // Save to DB
    try {
      await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reorders: reordered.map((c) => ({ id: c.id, displayOrder: c.displayOrder })),
        }),
      });
    } catch (err) {
      console.error("Failed to save category order:", err);
    }
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
      <div>
        <h1 className="text-3xl font-black text-zinc-100 tracking-tight">Categories</h1>
        <p className="text-zinc-400 text-sm mt-1.5 font-normal">
          Create and organize categories (shelves) to group your items.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-zinc-200">Add New Category</h2>
          
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Category Name *</label>
              <input
                type="text"
                placeholder="e.g. Travel, Everyday, Tech"
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Optional Icon (Emoji / Symbol)</label>
              <input
                type="text"
                placeholder="e.g. ✈️, ☕, 💻, 📚"
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                maxLength={4}
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-semibold">{error}</p>
            )}
            {success && (
              <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {success}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-orange-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm cursor-pointer shadow-lg shadow-orange-500/5"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : (
                <><Plus className="w-4 h-4" /> Add Category</>
              )}
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-200">Current Categories</h2>

          {categories.length === 0 ? (
            <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-600">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-zinc-300 text-sm">Organize your Plugd</p>
                <p className="text-xs text-zinc-500 mt-1 leading-normal">
                  Create categories to make your page easier to explore.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {categories.map((c, index) => (
                <div 
                  key={c.id} 
                  className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-800 rounded-xl hover:border-zinc-750 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl w-6 text-center">{c.icon || "📁"}</span>
                    <span className="font-bold text-zinc-200 text-sm">{c.name}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-600 font-sans">
                      /{c.slug}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Reorder actions */}
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
                        disabled={index === categories.length - 1}
                        className="p-1.5 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Delete action */}
                    <button
                      onClick={() => handleDeleteCategory(c.id)}
                      className="p-2.5 bg-zinc-950 hover:bg-red-500/10 border border-zinc-850 hover:border-red-500/20 text-zinc-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
