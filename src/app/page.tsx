"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

/* Interactive character scramble / cyber-decode hook */
function useScrambleText(targetText: string, speed = 35) {
  const [displayText, setDisplayText] = useState(targetText);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_#@%&*";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  return displayText;
}

export default function PortfolioPage() {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const [activeAboutTab, setActiveAboutTab] = useState("origin");

  // Hero parallax scroll tracking
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroBgScale = useTransform(heroScroll, [0, 1], [1.08, 1.34]);
  const heroBgY = useTransform(heroScroll, [0, 1], [0, 180]);
  const heroTextY = useTransform(heroScroll, [0, 0.85], [0, -140]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroTextBlur = useTransform(heroScroll, [0, 0.75], ["blur(0px)", "blur(12px)"]);
  const heroSliceX = useTransform(heroScroll, [0, 1], [18, -42]);
  const heroSliceY = useTransform(heroScroll, [0, 1], [-10, 92]);
  const heroSliceOpacity = useTransform(heroScroll, [0, 0.25, 0.85], [0.12, 0.28, 0]);

  // About scroll tracking
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  const aboutGlowY = useTransform(aboutScroll, [0, 0.5, 1], [60, 0, -60]);
  const aboutGlowOpacity = useTransform(aboutScroll, [0, 0.5, 1], [0.12, 0.32, 0.14]);

  const scrambledTitle = useScrambleText("hi, i'm Ravi", 40);

  const aboutTabs = [
    { id: "origin", label: "ORIGIN" },
    { id: "taste", label: "TASTE" },
    { id: "lore", label: "LORE" },
    { id: "polymath", label: "POLYMATH" },
    { id: "side-quests", label: "SIDE-QUESTS" },
  ];

  const collectionGrids = [
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
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-black text-[#e2e2e6] relative w-full overflow-hidden selection:bg-[#d3170a]/30 selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO (BLADE RUNNER 2049 CINEMATIC ATMOSPHERE)
          ========================================================================= */}
      <section
        ref={heroRef}
        id="hero"
        className="relative isolate min-h-[100svh] overflow-hidden bg-black"
      >
        {/* Layer 0: Main Blade Runner 2049 Background Image with Parallax Scale & Y */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroBgScale, y: heroBgY }}
        >
          <Image
            src="/bladerunner2049.jpg"
            alt="Blade Runner 2049"
            fill
            priority
            className="h-full w-full object-cover object-center will-change-transform brightness-[0.92] contrast-[1.05]"
          />
        </motion.div>

        {/* Layer 1: Parallax Displacement Slice (Polygon Mask Blend) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[url('/bladerunner2049.jpg')] bg-cover bg-center mix-blend-screen will-change-transform [clip-path:polygon(0_8%,100%_0,100%_18%,0_28%)]"
          style={{
            opacity: heroSliceOpacity,
            x: heroSliceX,
            y: heroSliceY,
          }}
        />

        {/* Layer 2: CRT Scanline & Phosphor Screen Blend */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen animate-hero-static [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.16)_0px,rgba(255,255,255,0.16)_1px,transparent_1px,transparent_4px),radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_72%_76%,rgba(211,23,10,0.24),transparent_35%)] opacity-20"
        />

        {/* Layer 3: Technical 32px Matrix Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.08]"
        />

        {/* Layer 4: 5px Micro Phosphor Dot Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] opacity-[0.09] animate-hero-static [background-image:radial-gradient(rgba(255,255,255,0.95)_0.7px,transparent_0.7px)] [background-size:5px_5px]"
        />

        {/* Layer 5: Vertical CRT Scan Roll Light Beam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.24),rgba(211,23,10,0.18),transparent)] mix-blend-screen blur-sm animate-scan-roll opacity-20"
        />

        {/* Layer 6: Diagonal Specular Atmosphere Streak */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-18%] top-[-28%] z-[5] h-[42rem] rotate-[-9deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] blur-2xl opacity-15"
        />

        {/* Layer 7: Warm Amber / Black Bottom Horizon Gradient (Transition bridge into About) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-72 bg-gradient-to-t from-black via-black/80 to-transparent"
        />

        {/* Hero Content: Display Title "hi, i'm Ravi" */}
        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-20 text-center sm:px-6">
          <motion.div
            className="relative w-full max-w-5xl -translate-y-8 sm:-translate-y-16 lg:-translate-y-20 select-none"
            style={{
              y: heroTextY,
              opacity: heroTextOpacity,
              filter: heroTextBlur,
            }}
          >
            {/* Diffuse dark backing behind text */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-64 w-[min(92vw,50rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/65 blur-[72px] sm:h-[22rem] md:h-[26rem]"
            />

            {/* Pixel Typography Header */}
            <h1 className="font-doto text-[2.5rem] leading-[1.04] font-semibold tracking-normal text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.22)] sm:text-[3.75rem] md:text-[5rem] lg:text-[6.25rem]">
              <span>{scrambledTitle}</span>
              <span className="inline-block w-[0.25em] h-[0.75em] bg-white ml-2 align-middle shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse" />
            </h1>
          </motion.div>
        </div>

        {/* Minimal Monospace Scroll / Enter Indicator */}
        <div className="absolute bottom-10 inset-x-0 z-20 flex justify-center">
          <button
            onClick={scrollToAbout}
            aria-label="Scroll to About section"
            className="group flex items-center gap-3 px-5 py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/10 hover:border-white/25 text-[11px] font-mono tracking-[0.22em] text-white/60 hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d3170a] shadow-[0_0_8px_#d3170a] animate-ping" />
            <span>ENTER / SCROLL</span>
            <svg
              className="w-3 h-3 text-white/40 group-hover:text-white transform group-hover:translate-y-0.5 transition-all duration-300"
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
          SECTION 2: ABOUT
          Recreating the exact ohshin.dev header card & two-column chassis
          ========================================================================= */}
      <section
        ref={aboutRef}
        id="about"
        className="relative isolate min-h-screen overflow-hidden bg-black font-mono text-[#e2e2e6] pt-12 pb-24"
      >
        {/* Subtle dot matrix background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-10 [background-image:radial-gradient(rgba(255,255,255,0.52)_0.62px,transparent_0.62px)] [background-size:6px_6px]"
        />

        {/* Atmospheric ambient rust/red radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_12%,rgba(211,23,10,0.14),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.05),transparent_30%)]"
        />

        {/* Floating ambient glow orb with scroll translation */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#d3170a]/16 blur-3xl"
          style={{ y: aboutGlowY, opacity: aboutGlowOpacity }}
        />

        <div className="mx-auto w-full max-w-[1460px] px-4 sm:px-8 lg:px-10 relative z-10 grid gap-8">
          {/* Top Header Card: ABOUT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="relative isolate overflow-hidden rounded-[2rem] bg-white/[0.075] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42),0_0_74px_rgba(211,23,10,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/12 backdrop-blur-2xl animate-glass-breathe sm:p-7 lg:rounded-[2.5rem] lg:p-9">
              {/* Animated Sheen Reflection Bar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -z-10 w-1/2 animate-glass-sheen left-[-35%] bg-white/[0.045]"
              />

              {/* Metadata Row */}
              <div className="grid gap-2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/50 sm:grid-cols-3 sm:items-start sm:gap-3 sm:text-[0.62rem] sm:tracking-[0.28em]">
                <p className="text-white/80">profile / ravi</p>
                <p className="sm:col-span-2 sm:text-right">mumbai / bengaluru, india</p>
              </div>

              {/* Large Display Title: ABOUT */}
              <div className="pt-10 sm:pt-14 lg:pt-16">
                <h2 className="font-doto text-[clamp(4.2rem,19vw,15rem)] font-black uppercase leading-[0.75] tracking-normal text-white">
                  about
                </h2>
              </div>
            </header>
          </motion.div>

          {/* Main About Two-Column Chassis (Kept clean & empty as requested) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative isolate min-w-0 w-full overflow-hidden rounded-[1.5rem] bg-white/[0.07] p-5 sm:p-7 lg:p-9 shadow-[0_24px_100px_rgba(0,0,0,0.42),0_0_64px_rgba(211,23,10,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/12 backdrop-blur-2xl animate-glass-breathe sm:rounded-[2rem] lg:rounded-[2.35rem]"
          >
            {/* Animated Sheen Bar */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -z-10 w-1/2 animate-glass-sheen left-[-42%] bg-white/[0.035]"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Category Pills + Clean Empty Body Chassis */}
              <div className="lg:col-span-7 flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
                {/* Category Pills Header */}
                <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/[0.08]">
                  {aboutTabs.map((tab) => {
                    const isActive = activeAboutTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveAboutTab(tab.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-white/16 text-white border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                            : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/75 hover:bg-white/[0.08]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Empty Body Chassis (Pure, finished glass surface - no placeholder text) */}
                <div className="flex-1 mt-6 rounded-[1.4rem] bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_2px_12px_rgba(0,0,0,0.6)] ring-1 ring-white/6 min-h-[300px] sm:min-h-[340px] relative overflow-hidden" />
              </div>

              {/* Right Column: Clean Empty Photograph Chassis (No placeholder text or plus icons) */}
              <div className="lg:col-span-5 flex flex-col min-h-[420px] sm:min-h-[480px]">
                <div className="w-full h-full rounded-[1.6rem] bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_4px_16px_rgba(0,0,0,0.7)] ring-1 ring-white/8 min-h-[380px] sm:min-h-[440px] relative overflow-hidden" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ARCHIVES & COLLECTIONS (8 GRIDS)
          Replicating the exact ohshin.dev collection card design, Doto titles,
          monospaced labels, sheen animations, and two-column layout.
          ========================================================================= */}
      <section className="relative isolate min-h-screen overflow-hidden bg-black font-mono text-[#e2e2e6] pb-32">
        {/* Subtle dot matrix background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-10 [background-image:radial-gradient(rgba(255,255,255,0.52)_0.62px,transparent_0.62px)] [background-size:6px_6px]"
        />

        <div className="mx-auto w-full max-w-[1460px] px-4 sm:px-8 lg:px-10 relative z-10 grid gap-8">
          {/* Section Divider Bar */}
          <div className="flex items-end justify-between gap-4 border-b border-white/[0.08] pb-4 pt-8">
            <h2 className="font-doto text-[1.75rem] sm:text-[2.5rem] font-bold uppercase tracking-normal text-white">
              archives &amp; collections
            </h2>
            <p className="font-mono text-[0.56rem] sm:text-[0.62rem] uppercase tracking-[0.26em] text-white/40">
              08 categories
            </p>
          </div>

          {/* 8 Collection Grids (2 columns on desktop, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {collectionGrids.map((grid, index) => (
              <motion.article
                key={grid.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (index % 2) * 0.12,
                }}
                className="relative isolate min-w-0 overflow-hidden rounded-[2rem] bg-white/[0.075] p-5 sm:p-7 shadow-[0_18px_70px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.10)] ring-1 ring-white/10 backdrop-blur-2xl animate-glass-breathe flex flex-col justify-between min-h-[380px] sm:min-h-[420px]"
              >
                {/* Animated Glass Sheen Reflection Bar */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -z-10 w-1/2 animate-glass-sheen left-[-42%] bg-white/[0.032]"
                />

                {/* Card Header */}
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-doto text-[2rem] sm:text-[3rem] font-black uppercase leading-none tracking-normal text-white">
                      {grid.title}
                    </h3>
                    <p className="font-mono text-[0.54rem] sm:text-[0.58rem] uppercase tracking-[0.24em] text-white/45 mt-2">
                      grid {grid.num}
                    </p>
                  </div>
                  <p className="font-mono text-[0.56rem] sm:text-[0.6rem] uppercase tracking-[0.22em] text-white/40 text-right">
                    {grid.tag}
                  </p>
                </div>

                {/* Finished Shelf Bed Chassis (Clean & empty as instructed - no placeholder text) */}
                <div className="flex-1 w-full rounded-[1.4rem] bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_2px_12px_rgba(0,0,0,0.6)] ring-1 ring-white/6 min-h-[200px] sm:min-h-[240px] relative overflow-hidden" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
