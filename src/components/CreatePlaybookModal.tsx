"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Check, ArrowRight, BookOpen, Layers } from "lucide-react";

interface CreatePlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePlaybookModal({
  isOpen,
  onClose,
}: CreatePlaybookModalProps) {
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-[#faf8f5] border border-[#dcd8d0] p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e5e4]">
          <div className="flex items-center gap-2 text-[#1c1917]">
            <div className="h-7 w-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold">Creator Studio</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#78716c] hover:text-[#1c1917] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-[#1c1917]">Draft Proposal Received</h4>
            <p className="text-xs sm:text-[13px] text-[#57534e] max-w-sm mx-auto leading-relaxed">
              Your playbook topic &ldquo;<strong>{topic}</strong>&rdquo; has been registered. Our curriculum team will prepare your automated PPT template and author workspace.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setTopic("");
                  onClose();
                }}
                className="px-5 py-2 rounded-full bg-[#1c1917] hover:bg-[#2563eb] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm sm:text-[15px] font-semibold text-[#1c1917]">
                Publish a New Playbook on Plugd
              </h4>
              <p className="text-xs text-[#78716c] leading-relaxed">
                Turn your high-value business system or AI workflow into a production playbook with 100% unique slide designs, dual-format delivery, and recurring lifetime royalty payouts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-white border border-[#e7e5e4] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1c1917]">
                  <Layers className="h-3.5 w-3.5 text-[#2563eb]" />
                  <span>Unique PPT Decks</span>
                </div>
                <p className="text-[11px] text-[#78716c]">Automated 100% distinct slide templates.</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#e7e5e4] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1c1917]">
                  <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Dual Format</span>
                </div>
                <p className="text-[11px] text-[#78716c]">Slides + comprehensive written guides.</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <label htmlFor="playbook-topic" className="block text-xs font-semibold text-[#292524]">
                Playbook Title or Core Idea
              </label>
              <input
                id="playbook-topic"
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Build an AI Newsletter that prints $5k/mo"
                className="w-full h-10 px-3.5 rounded-xl border border-[#d6d3d1] bg-white text-xs sm:text-[13px] text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#1c1917] shadow-2xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#d6d3d1] text-xs font-semibold text-[#57534e] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !topic.trim()}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1c1917] hover:bg-[#2563eb] disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>{isSubmitting ? "Submitting..." : "Start Playbook Draft"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
