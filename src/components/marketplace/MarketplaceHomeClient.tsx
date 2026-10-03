"use client";

import { useState } from "react";
import MarketplaceNavbar from "./MarketplaceNavbar";
import MarketplaceHero from "./MarketplaceHero";
import MarketplaceCatalog from "./MarketplaceCatalog";
import CheckoutModal from "@/components/CheckoutModal";
import { Template, TEMPLATES } from "@/lib/templates";

export default function MarketplaceHomeClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);

  function handleQuickUnlock(template?: Template) {
    if (template) {
      setSelectedTemplate(template);
    }
    setCheckoutModalOpen(true);
  }

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-white selection:text-black overflow-x-hidden">
      {/* Sticky Framer-style Marketplace Header (PLUGD on left, Search on right, empty center) */}
      <MarketplaceNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Intro: Templates + Exact Sentence */}
      <MarketplaceHero />

      {/* Moods Categories + Framer Toolbar + 3-Column Template Grid */}
      <MarketplaceCatalog
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTemplateSelect={(t) => {
          setSelectedTemplate(t);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Clean Marketplace Footer */}
      <footer className="border-t border-white/10 bg-[#09090b] py-12 text-xs font-mono text-zinc-500">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono tracking-[0.24em] text-white uppercase font-bold">
              PLUGD
            </span>
            <span className="text-zinc-600">·</span>
            <span>Interactive experience marketplace</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-zinc-400">
            <a href="/my-templates" className="hover:text-white transition">My Templates</a>
            <a href="/privacy-policy" className="hover:text-white transition">Privacy</a>
            <a href="/terms-of-service" className="hover:text-white transition">Terms</a>
          </div>

          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Plugd.
          </p>
        </div>
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        target="her"
        mood={selectedTemplate.id}
      />
    </div>
  );
}
