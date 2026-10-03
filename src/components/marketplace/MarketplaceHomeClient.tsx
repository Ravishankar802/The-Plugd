"use client";

import { useRef, useState } from "react";
import MarketplaceNavbar from "./MarketplaceNavbar";
import MarketplaceHero from "./MarketplaceHero";
import MarketplaceCatalog from "./MarketplaceCatalog";
import CheckoutModal from "@/components/CheckoutModal";
import { Template, TEMPLATES } from "@/lib/templates";

export default function MarketplaceHomeClient() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleQuickUnlock(template?: Template) {
    if (template) {
      setSelectedTemplate(template);
    }
    setCheckoutModalOpen(true);
  }

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Sticky Marketplace Navbar */}
      <MarketplaceNavbar
        onExploreClick={() => scrollToSection("templates")}
        onCategoriesClick={() => scrollToSection("categories")}
        onSearchClick={() => scrollToSection("templates")}
        onUnlockClick={() => handleQuickUnlock(TEMPLATES[0])}
      />

      {/* Hero Section */}
      <MarketplaceHero onExploreClick={() => scrollToSection("templates")} />

      {/* Marketplace Catalog (Featured + Moods + Trending/Filtered Grid + For Her + For Him + Value Banner) */}
      <MarketplaceCatalog
        onTemplateSelect={(t) => {
          setSelectedTemplate(t);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 text-center text-xs font-mono text-zinc-500">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm tracking-[0.2em] text-white uppercase font-bold">
              PLUGD
            </span>
            <span className="text-zinc-600">·</span>
            <span>Digital experiences worth sending</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            <a href="/for-her" className="hover:text-white transition">For Her</a>
            <a href="/for-him" className="hover:text-white transition">For Him</a>
            <a href="/my-templates" className="hover:text-white transition">My Templates</a>
            <a href="/privacy-policy" className="hover:text-white transition">Privacy</a>
            <a href="/terms-of-service" className="hover:text-white transition">Terms</a>
          </div>

          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Plugd Inc. Buy once. Own forever.
          </p>
        </div>
      </footer>

      {/* Global Quick Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        target={selectedTemplate.target === "him" ? "him" : "her"}
        mood={selectedTemplate.id}
      />
    </div>
  );
}
