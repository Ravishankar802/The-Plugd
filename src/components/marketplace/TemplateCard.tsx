"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { Template } from "@/lib/templates";
import TemplatePreviewArt from "./TemplatePreviewArt";

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onPreview?: (template: Template) => void;
  featured?: boolean;
}

export default function TemplateCard({
  template,
  onSelect,
  onPreview,
  featured = false,
}: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const targetLabel =
    template.target === "her"
      ? "For Her"
      : template.target === "him"
      ? "For Him"
      : "For Anyone";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]"
    >
      {/* Top Visual Preview */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-t-2xl sm:rounded-t-3xl"
        onClick={() => (onPreview ? onPreview(template) : onSelect(template))}
      >
        <TemplatePreviewArt
          template={template}
          size={featured ? "large" : "medium"}
        />

        {/* Hover Action Overlay */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center gap-3 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {onPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs font-mono uppercase tracking-wider text-white shadow-xl hover:bg-white hover:text-black transition"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black shadow-xl hover:bg-zinc-200 transition"
          >
            <span>Unlock — $2.99</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Bottom Editorial Content */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 text-left space-y-3">
        {/* Title, Creator, Description */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <Link
              href={`/t/${template.slug}`}
              className="font-serif text-lg sm:text-xl font-normal text-white group-hover:text-rose-200 transition-colors"
            >
              {template.name}
            </Link>

            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {template.creator}
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-light line-clamp-1">
            {template.tagline}
          </p>
        </div>

        {/* Tags & Price Row */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="rounded-full bg-white/[0.04] border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
              {template.mood}
            </span>
            <span className="rounded-full bg-white/[0.04] border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
              {targetLabel}
            </span>
          </div>

          {/* Price & Action */}
          <button
            onClick={() => onSelect(template)}
            className="group/btn inline-flex items-center gap-1 font-mono text-xs text-white hover:text-rose-300 transition"
          >
            <span className="font-semibold text-rose-300">$2.99</span>
            <span className="text-zinc-600">/</span>
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 group-hover/btn:text-white">
              Own Forever →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
