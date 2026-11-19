"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function PortfolioPage() {
  const [activeAboutTab, setActiveAboutTab] = useState("ORIGIN");

  const aboutTabs = [
    { id: "ORIGIN", label: "ORIGIN" },
    { id: "TASTE", label: "TASTE" },
    { id: "LORE", label: "LORE" },
    { id: "POLYMATH", label: "POLYMATH" },
    { id: "SIDE-QUESTS", label: "SIDE-QUESTS" },
  ];

  const gridCategories = [
    { id: "books", title: "BOOKS", tag: "READING STACK", num: "01" },
    { id: "movies", title: "MOVIES", tag: "WATCHLIST", num: "02" },
    { id: "series", title: "SERIES", tag: "EPISODES", num: "03" },
    { id: "anime", title: "ANIME", tag: "ARCHIVE", num: "04" },
    { id: "manga", title: "MANGA", tag: "VOLUMES", num: "05" },
    { id: "manhwa", title: "MANHWA", tag: "COLLECTION", num: "06" },
    { id: "manhua", title: "MANHUA", tag: "CANON", num: "07" },
    { id: "webnovels", title: "WEB NOVELS", tag: "LIBRARY", num: "08" },
  ];

  const scrollToAbout = () => {
    const el = document.getElementById("about-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070709] text-white selection:bg-orange-500/30 selection:text-orange-200">
      {/* CRT Scanline & Phosphor Overlay */}
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />

      {/* =========================================================================
          FRAME 1: HERO (BLADE RUNNER 2049 BACKGROUND + "hi, i'm Ravi")
          ========================================================================= */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Blade Runner 2049 Atmospheric Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bladerunner2049.jpg"
            alt="Blade Runner 2049"
            fill
            priority
            className="object-cover object-center transform scale-105 motion-safe:transition-transform motion-safe:duration-1000 ease-out"
          />
          {/* Subtle warm amber to dark gradient overlays for maximum contrast & atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/25 to-black/35" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/60" />
        </div>

        {/* Hero Pixel Typography: "hi, i'm Ravi" */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto select-none">
          <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] flex items-center justify-center flex-wrap gap-2 sm:gap-4">
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]">
              hi, i&apos;m Ravi
            </span>
            <span className="inline-block w-4 h-8 sm:w-6 sm:h-12 md:w-8 md:h-14 bg-white cursor-blink ml-1 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </h1>
        </div>

        {/* Transition Scroll Pill Button into Frame 2 */}
        <div className="absolute bottom-10 z-20 flex flex-col items-center gap-2">
          <button
            onClick={scrollToAbout}
            aria-label="Scroll to About section"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 hover:border-orange-500/50 text-xs font-mono-tech uppercase tracking-[0.2em] text-white/80 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
            <span>ENTER / SCROLL</span>
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-y-1 transition-transform duration-300 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* =========================================================================
          FRAME 2: ABOUT SECTION
          Transition smoothly from Blade Runner desert into glossy dark cyberpunk panels
          ========================================================================= */}
      <section
        id="about-section"
        className="relative z-20 w-full min-h-screen px-4 sm:px-6 lg:px-8 py-20 lg:py-28 max-w-7xl mx-auto flex flex-col gap-6"
      >
        {/* Ambient Orange Glow behind About Cards (Echoing Blade Runner Horizon) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-gradient-to-b from-orange-600/15 via-orange-950/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Top Header Card: ABOUT */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500">
          {/* Monospace Metadata Row */}
          <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono-tech text-[#8e8e93] tracking-[0.2em] mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>PROFILE / RAVI</span>
            </div>
            <div className="tracking-[0.25em] text-white/50 hidden sm:block">
              MUMBAI / BENGALURU, INDIA
            </div>
          </div>

          {/* Large Pixel Title: ABOUT */}
          <h2 className="relative z-10 font-pixel text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
            ABOUT
          </h2>
        </div>

        {/* Two-Column About Grid (Content left, Image right - both kept empty as instructed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
          {/* Left Card: Text & Tabs Shell (Content intentionally left empty for now) */}
          <div className="lg:col-span-7 glass-panel dot-matrix-bg rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[460px]">
            {/* Top Category Tabs (ORIGIN, TASTE, LORE, POLYMATH, SIDE-QUESTS) */}
            <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 pb-6 border-b border-white/[0.07]">
              {aboutTabs.map((tab) => {
                const isActive = activeAboutTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAboutTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono-tech tracking-[0.18em] transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white/15 text-white border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                        : "bg-white/[0.03] text-white/40 border border-white/[0.05] hover:text-white/80 hover:bg-white/[0.08]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Empty Body Area (Ready for text to be added later) */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-12">
              <div className="w-full h-full min-h-[220px] rounded-2xl border border-dashed border-white/[0.08] flex items-center justify-center p-6 bg-black/20">
                <span className="text-xs font-mono-tech text-white/20 tracking-[0.25em] uppercase">
                  [ ABOUT CONTENT WILL BE ADDED HERE ]
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Image Shell (Empty as instructed, ready for future image) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px]">
            <div className="relative z-10 w-full h-full min-h-[320px] rounded-2xl border border-dashed border-white/[0.12] bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col items-center justify-center gap-3 p-6 text-center group hover:border-white/25 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-white/30 group-hover:text-white/60 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="text-xs font-mono-tech text-white/30 tracking-[0.25em] uppercase">
                [ IMAGE WILL BE ADDED HERE ]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FRAME 3: 8 GRIDS (BOOKS, MOVIES, SERIES, ANIME, MANGA, MANHWA, MANHUA, WEB NOVELS)
          Replicating the exact Playlists/Books glass card design, shiny specular top,
          dot matrix background, pixel titles, side-by-side grids.
          ========================================================================= */}
      <section className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pb-32 max-w-7xl mx-auto flex flex-col gap-6">
        {/* Subtle section transition bar */}
        <div className="flex items-center justify-between py-4 border-b border-white/[0.08] mb-2">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xl sm:text-2xl text-white tracking-wider">
              ARCHIVES & COLLECTIONS
            </span>
          </div>
          <div className="font-mono-tech text-[11px] text-white/40 tracking-[0.2em] hidden sm:block">
            8 CATEGORIES / ZERO NOISE
          </div>
        </div>

        {/* 8 Grids: 2-column layout (4 rows of 2 grids side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {gridCategories.map((grid) => (
            <div
              key={grid.id}
              className="glass-panel glass-panel-interactive dot-matrix-bg rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[340px]"
            >
              {/* Header inside each Grid Card */}
              <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-pixel text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
                    {grid.title}
                  </h3>
                  <span className="font-mono-tech text-[10px] text-white/30 tracking-[0.2em] mt-1 block">
                    GRID {grid.num}
                  </span>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono-tech text-white/60 tracking-[0.2em] uppercase whitespace-nowrap">
                  {grid.tag}
                </div>
              </div>

              {/* Interior Empty Canvas Area (Content will be added later) */}
              <div className="relative z-10 flex-1 w-full rounded-2xl border border-dashed border-white/[0.08] bg-black/25 flex flex-col items-center justify-center p-6 text-center min-h-[160px] group hover:border-white/20 transition-colors">
                <span className="text-[11px] font-mono-tech text-white/25 tracking-[0.22em] uppercase">
                  [ {grid.title} SHELF — CONTENT WILL BE ADDED LATER ]
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
