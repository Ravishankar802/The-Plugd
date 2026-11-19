"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const horizonFlareRef = useRef<HTMLDivElement>(null);

  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutHeaderRef = useRef<HTMLDivElement>(null);
  const aboutBodyRef = useRef<HTMLDivElement>(null);

  const collectionsSectionRef = useRef<HTMLElement>(null);
  const collectionCardsRef = useRef<(HTMLElement | null)[]>([]);

  const [activeAboutTab, setActiveAboutTab] = useState("origin");

  const aboutTabs = [
    { id: "origin", label: "ORIGIN" },
    { id: "taste", label: "TASTE" },
    { id: "lore", label: "LORE" },
    { id: "polymath", label: "POLYMATH" },
    { id: "side-quests", label: "SIDE-QUESTS" },
  ];

  const collections = [
    { id: "books", title: "BOOKS", tag: "READING STACK" },
    { id: "movies", title: "MOVIES", tag: "WATCHLIST" },
    { id: "series", title: "SERIES", tag: "EPISODES" },
    { id: "anime", title: "ANIME", tag: "ARCHIVE" },
    { id: "manga", title: "MANGA", tag: "VOLUMES" },
    { id: "manhwa", title: "MANHWA", tag: "COLLECTION" },
    { id: "manhua", title: "MANHUA", tag: "CANON" },
    { id: "webnovels", title: "WEB NOVELS", tag: "LIBRARY" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // =========================================================================
      // CINEMATIC TRANSITION 01: HERO -> ABOUT
      // The background zooms into the orange haze, shadows deepen into dark void,
      // and the typography expands and dissolves into the atmospheric smoke.
      // =========================================================================
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      heroTl
        .to(
          heroBgRef.current,
          {
            scale: 1.28,
            y: "14%",
            filter: "brightness(0.55) contrast(1.25) saturate(1.4)",
            ease: "power2.out",
          },
          0
        )
        .to(
          heroOverlayRef.current,
          {
            opacity: 0.95,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          heroTextRef.current,
          {
            y: -140,
            scale: 1.08,
            letterSpacing: "0.14em",
            opacity: 0,
            filter: "blur(18px)",
            ease: "power2.in",
          },
          0
        )
        .fromTo(
          horizonFlareRef.current,
          { scaleX: 0.2, opacity: 0 },
          { scaleX: 1.2, opacity: 0.8, ease: "power1.inOut" },
          0.2
        );

      // =========================================================================
      // ABOUT SECTION ENTRANCE (SCENE TRANSITION)
      // The About header and main chassis float up with 3D perspective and sheen.
      // =========================================================================
      gsap.fromTo(
        aboutHeaderRef.current,
        {
          y: 80,
          opacity: 0,
          rotateX: 4,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 78%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        aboutBodyRef.current,
        {
          y: 90,
          opacity: 0,
          rotateX: 3,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.3,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 72%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // =========================================================================
      // CINEMATIC TRANSITION 02 & 03: COLLECTIONS ENTRANCE & CARD CHOREOGRAPHY
      // Staggered 3D reveal with perspective depth across all 8 archives.
      // =========================================================================
      collectionCardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
            rotateX: 6,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050507] text-[#e2e2e6] overflow-x-hidden selection:bg-[#d3170a]/30 selection:text-white"
    >
      {/* Universal Fine Film Grain & CRT Scanline Layers */}
      <div className="fixed inset-0 z-40 pointer-events-none film-grain" />
      <div className="fixed inset-0 z-40 pointer-events-none crt-scanlines opacity-35" />

      {/* =========================================================================
          SECTION 1: CINEMATIC HERO
          Pure Blade Runner 2049 visual world.
          Heading: "HI, I'M RAVI" (No cursor, no trailing characters, no buttons).
          ========================================================================= */}
      <section
        ref={heroRef}
        id="hero"
        className="relative isolate min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#050507]"
      >
        {/* Layer 0: Blade Runner 2049 Background with Color Grading */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/bladerunner2049.jpg"
            alt="Blade Runner 2049 Desert"
            fill
            priority
            className="h-full w-full object-cover object-center transform scale-105 filter brightness-[0.78] contrast-[1.2] saturate-[1.28]"
          />
        </div>

        {/* Layer 1: Cinematic Vignette & Deep Shadow Overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.55)_75%,#050507_100%)]" />

        {/* Layer 2: Warm Amber / Obsidian Bottom Horizon Shadow */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-[#050507]"
        />

        {/* Layer 3: Horizon Flare Bridge (Expands on scroll) */}
        <div
          ref={horizonFlareRef}
          className="absolute bottom-0 inset-x-0 z-[3] h-40 bg-gradient-to-t from-[#050507] via-[#d3170a]/15 to-transparent blur-2xl pointer-events-none"
        />

        {/* Layer 4: CRT Phosphor Micro Matrix */}
        <div className="absolute inset-0 z-[4] pointer-events-none phosphor-matrix opacity-25" />

        {/* Layer 5: Hero Main Typography */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto select-none">
          {/* Subtle diffuse shadow behind headline */}
          <div className="absolute -z-10 w-[min(90vw,48rem)] h-52 bg-black/60 blur-[70px] rounded-full" />

          {/* Clean, authoritative pixel headline: HI, I'M RAVI */}
          <h1
            ref={heroTextRef}
            className="font-doto text-[clamp(2.75rem,8.5vw,7.5rem)] font-bold tracking-tight text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.28)] uppercase will-change-transform leading-none"
          >
            HI, I&apos;M RAVI
          </h1>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT
          Replicating the exact ohshin.dev proportions, lighting, and composition.
          Both left text body and right image chassis are kept clean & empty.
          ========================================================================= */}
      <section
        ref={aboutSectionRef}
        id="about"
        className="relative isolate min-h-screen w-full bg-[#050507] font-mono text-[#e2e2e6] pt-16 pb-28"
      >
        {/* Ambient Warm Underglow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(211,23,10,0.14),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.04),transparent_35%)]" />

        <div className="mx-auto w-full max-w-[1460px] px-4 sm:px-8 lg:px-10 relative z-10 grid gap-8">
          {/* Top Header Card: ABOUT */}
          <div ref={aboutHeaderRef} className="perspective-[1000px]">
            <header className="glass-surface animate-ambient-glow relative isolate overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:rounded-[2.5rem] lg:p-10">
              {/* Specular Diagonal Sheen Sweep */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -z-10 w-1/2 animate-specular left-[-35%] bg-white/[0.05]"
              />

              {/* Metadata Row */}
              <div className="grid gap-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/50 sm:grid-cols-3 sm:items-start sm:gap-3 sm:text-[0.64rem] sm:tracking-[0.28em]">
                <p className="text-white/85">PROFILE / RAVI</p>
                <p className="sm:col-span-2 sm:text-right">
                  MUMBAI / BENGALURU, INDIA
                </p>
              </div>

              {/* Display Title: ABOUT */}
              <div className="pt-10 sm:pt-14 lg:pt-18">
                <h2 className="font-doto text-[clamp(4.2rem,19vw,16rem)] font-black uppercase leading-[0.72] tracking-normal text-white">
                  ABOUT
                </h2>
              </div>
            </header>
          </div>

          {/* Main Two-Column About Chassis */}
          <div ref={aboutBodyRef} className="perspective-[1000px]">
            <div className="glass-surface relative isolate min-w-0 w-full overflow-hidden rounded-[1.5rem] p-6 sm:p-8 lg:p-10 sm:rounded-[2rem] lg:rounded-[2.35rem]">
              {/* Specular Diagonal Sheen Sweep */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -z-10 w-1/2 animate-specular left-[-42%] bg-white/[0.04]"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Category Pills + Finished Empty Chassis */}
                <div className="lg:col-span-7 flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
                  {/* Category Pills Header */}
                  <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/[0.08]">
                    {aboutTabs.map((tab) => {
                      const isActive = activeAboutTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveAboutTab(tab.id)}
                          className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-white/16 text-white border border-white/28 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                              : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/75 hover:bg-white/[0.08]"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Empty Left Surface Bed (No placeholder text or dashed lines) */}
                  <div className="flex-1 mt-6 rounded-[1.4rem] bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_3px_16px_rgba(0,0,0,0.7)] ring-1 ring-white/6 min-h-[300px] sm:min-h-[340px] relative overflow-hidden" />
                </div>

                {/* Right Column: Empty Portrait Chassis (No placeholder text or plus icons) */}
                <div className="lg:col-span-5 flex flex-col min-h-[420px] sm:min-h-[480px]">
                  <div className="w-full h-full rounded-[1.6rem] bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_4px_20px_rgba(0,0,0,0.8)] ring-1 ring-white/8 min-h-[380px] sm:min-h-[440px] relative overflow-hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ARCHIVES & COLLECTIONS (8 GRIDS)
          No grid numbers. Finished physical shelf beds. Staggered 3D reveal.
          ========================================================================= */}
      <section
        ref={collectionsSectionRef}
        id="collections"
        className="relative isolate min-h-screen w-full bg-[#050507] font-mono text-[#e2e2e6] pb-32"
      >
        <div className="mx-auto w-full max-w-[1460px] px-4 sm:px-8 lg:px-10 relative z-10 grid gap-8">
          {/* Section Transition Header Bar */}
          <div className="flex items-end justify-between gap-4 border-b border-white/[0.08] pb-4 pt-10">
            <h2 className="font-doto text-[1.75rem] sm:text-[2.5rem] font-bold uppercase tracking-normal text-white">
              ARCHIVES &amp; COLLECTIONS
            </h2>
            <p className="font-mono text-[0.56rem] sm:text-[0.62rem] uppercase tracking-[0.26em] text-white/40">
              08 ARCHIVES
            </p>
          </div>

          {/* 8 Collection Grids (2 columns on desktop, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {collections.map((item, index) => (
              <article
                key={item.id}
                ref={(el) => {
                  collectionCardsRef.current[index] = el;
                }}
                className="glass-surface relative isolate min-w-0 overflow-hidden rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between min-h-[360px] sm:min-h-[400px] will-change-transform"
              >
                {/* Specular Diagonal Sheen Sweep */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -z-10 w-1/2 animate-specular left-[-42%] bg-white/[0.035]"
                />

                {/* Card Header (Title & Tag - No Grid Numbering) */}
                <div className="flex items-end justify-between gap-4 mb-6">
                  <h3 className="font-doto text-[2rem] sm:text-[3rem] font-black uppercase leading-none tracking-normal text-white">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[0.56rem] sm:text-[0.62rem] uppercase tracking-[0.24em] text-white/45 text-right">
                    {item.tag}
                  </p>
                </div>

                {/* Finished Shelf Bed Chassis (No dummy cards or placeholder text) */}
                <div className="flex-1 w-full rounded-[1.4rem] bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_3px_16px_rgba(0,0,0,0.7)] ring-1 ring-white/6 min-h-[190px] sm:min-h-[220px] relative overflow-hidden" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
