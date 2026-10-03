"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col space-y-3 text-left transition-all duration-300"
    >
      {/* Top Large Visual Preview */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13] transition-all duration-300 group-hover:border-white/25 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
        onClick={() => (onPreview ? onPreview(template) : onSelect(template))}
      >
        <TemplatePreviewArt
          template={template}
          size={featured ? "large" : "medium"}
        />

        {/* Hover Action Overlay */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center gap-2.5 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {onPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-white shadow-xl hover:bg-white hover:text-black transition"
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
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-black shadow-xl hover:bg-zinc-200 transition"
          >
            <span>Unlock — $2.99</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Under Preview: Framer Style Metadata */}
      <div className="flex items-center justify-between gap-3 px-0.5">
        <div className="space-y-0.5 min-w-0">
          <Link
            href={`/t/${template.slug}`}
            className="block text-sm sm:text-base font-medium text-white truncate hover:text-zinc-300 transition-colors"
          >
            {template.name}
          </Link>
          <p className="text-xs text-zinc-500 font-normal truncate">
            {template.creator}
          </p>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center rounded-lg bg-white/[0.06] border border-white/10 px-2.5 py-1 text-xs font-mono font-medium text-zinc-200">
            ${template.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
