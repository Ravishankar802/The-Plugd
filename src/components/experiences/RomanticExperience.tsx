"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Heart, ArrowDown, Send, RotateCcw, Volume2, VolumeX, Eye } from "lucide-react";

interface RomanticExperienceProps {
  gift: {
    slug: string;
    target: string;
    recipientName: string | null;
    senderName: string | null;
    customNote: string | null;
  };
}

export default function RomanticExperience({ gift }: RomanticExperienceProps) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [holdingProgress, setHoldingProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [revealedSecret, setRevealedSecret] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState<
    { id: number; x: number; y: number; size: number; delay: number }[]
  >([]);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isHer = gift.target === "her";
  const recipient = gift.recipientName || (isHer ? "you" : "you");
  const sender = gift.senderName || (isHer ? "your man" : "your girl");

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(currentScrollY / maxScroll, 0), 1) : 0;
      setScrollY(currentScrollY);
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Generate random ambient star particles
    const particles = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 5,
    }));
    setFloatingParticles(particles);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle "Press and Hold" interaction in discovery chamber
  function startHold() {
    if (revealedSecret) return;
    setIsHolding(true);
    let current = 0;
    holdTimerRef.current = setInterval(() => {
      current += 4;
      if (current >= 100) {
        setHoldingProgress(100);
        setRevealedSecret(true);
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      } else {
        setHoldingProgress(current);
      }
    }, 40);
  }

  function stopHold() {
    if (revealedSecret) return;
    setIsHolding(false);
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldingProgress(0);
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Pre-filled text to send back to sender
  const textBody = `I just finished the website you made for me... WHAT THE FUCK 😭❤️`;
  const smsLink = `sms:?&body=${encodeURIComponent(textBody)}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    textBody
  )}`;

  return (
    <div className="relative min-h-screen bg-[#060608] text-zinc-100 selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Top Floating Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating Ambient Film Grain & Star Dust Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 opacity-30 mix-blend-screen"
      >
        {floatingParticles.map((p) => (
          <span
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
            }}
            className="absolute rounded-full bg-white shadow-[0_0_8px_white] animate-pulse"
          />
        ))}
      </div>

      {/* Subtle Floating Soundwave / Watermark Header */}
      <header className="fixed top-5 left-0 right-0 z-40 mx-auto max-w-sm px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 rounded-full bg-black/60 border border-white/10 px-3 py-1 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400">
            For {recipient}
          </span>
        </div>

        <div className="rounded-full bg-black/60 border border-white/10 px-2.5 py-1 backdrop-blur-md text-[10px] font-mono text-zinc-500">
          From {sender}
        </div>
      </header>

      {/* ============================================================ */}
      {/* SECTION 01 — THE OPENING : FULL-SCREEN CINEMATIC INVITATION */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-between px-6 py-16 sm:py-24 text-center overflow-hidden">
        {/* Ambient Warm Light Leak Behind Hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[550px] w-[95vw] max-w-2xl rounded-full bg-gradient-to-b from-rose-600/20 via-pink-600/10 to-transparent blur-3xl animate-pulse duration-1000"
        />

        <div className="my-auto space-y-6 max-w-lg z-10 animate-in fade-in zoom-in-95 duration-1000">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1 text-[11px] font-mono tracking-[0.24em] uppercase text-rose-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>A private corner of the web</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-5xl sm:text-7xl font-normal text-white tracking-[-0.04em] leading-[1.05]">
              for you.
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-zinc-400 font-light">
              &ldquo;put your phone on silent. scroll slowly.&rdquo;
            </p>
          </div>

          {gift.customNote && (
            <div className="mx-auto max-w-xs rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs font-light text-rose-200/90 italic backdrop-blur-md">
              &ldquo;{gift.customNote}&rdquo;
            </div>
          )}
        </div>

        {/* Scroll Hint */}
        <div className="z-10 flex flex-col items-center gap-2 text-zinc-500 animate-bounce duration-1000">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
            Scroll down to enter
          </span>
          <ArrowDown className="h-4 w-4 text-zinc-400" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 02 — THE ATMOSPHERE : EXPANDING NIGHT PHOTOGRAPHY    */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden">
        {/* Full-width dramatic film image container */}
        <div className="relative w-full max-w-4xl mx-auto rounded-[36px] overflow-hidden border border-white/10 shadow-[0_30px_100px_-20px_rgba(244,63,94,0.25)] group">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80"
              alt="Night flowers"
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] scale-105 transition-transform duration-1000 ease-out"
              style={{
                transform: `scale(${1.05 + Math.min(scrollY * 0.0003, 0.15)}) translateY(${Math.min(
                  scrollY * 0.02,
                  40
                )}px)`,
              }}
            />

            {/* Dark vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/70 via-transparent to-[#060608]/70" />

            {/* Inset kinetic text */}
            <div className="absolute bottom-8 left-6 right-6 sm:bottom-14 sm:left-12 sm:right-12 z-20 space-y-2">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.26em] text-rose-300">
                01 • THE QUIET HOURS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
                stay here for a second.
              </h2>
              <p className="font-serif italic text-base sm:text-xl text-zinc-300/90 font-light max-w-md">
                a text was too small. an instagram story was too loud.
                so i wanted a whole place just to tell you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 03 — CONTINUOUS VISUAL STORY : LAYERED MEMORY DRIFT  */}
      {/* ============================================================ */}
      <section className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-24">
        {/* Frame 1: Tangled Moments */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 relative">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&auto=format&fit=crop&q=80"
                alt="Hands low light"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                EXPOSURE: 02 // SUBTLE GRAIN
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-4 md:pl-4 text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-rose-400">
              The Reflex
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white leading-tight">
              i notice everything.
            </h3>
            <p className="font-serif italic text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
              the way you look when you think nobody is watching.
              the exact pitch of your voice when you get excited.
            </p>
          </div>
        </div>

        {/* Frame 2: Midnight City Reflections (Reversed) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:order-1 order-2 space-y-4 text-left md:pr-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-pink-400">
              At 2:00 AM
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white leading-tight">
              still you.
            </h3>
            <p className="font-serif italic text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
              when the whole world shuts off, you are still the first thought
              that crosses my mind.
            </p>
          </div>

          <div className="md:col-span-7 md:order-2 order-1 relative">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80"
                alt="Tokyo neon night"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                LOCATION: MIDNIGHT DRIFT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 04 — INTERACTIVE DISCOVERY : PRESS & HOLD TO DEVELOP */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-96 w-96 rounded-full bg-rose-500/10 blur-3xl"
        />

        <div className="relative z-10 w-full max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-rose-400">
              Tactile Discovery
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              {revealedSecret ? "developed." : "press and hold the frame."}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              {revealedSecret
                ? "keep scrolling. there is still one more thing."
                : "hold your thumb down to burn the negative into light."}
            </p>
          </div>

          {/* Touch Plate Card */}
          <div
            onMouseDown={startHold}
            onMouseUp={stopHold}
            onTouchStart={startHold}
            onTouchEnd={stopHold}
            className={`relative mx-auto aspect-[3/4] w-full max-w-xs rounded-[32px] overflow-hidden border transition-all duration-500 select-none cursor-pointer flex flex-col justify-end p-6 ${
              revealedSecret
                ? "border-rose-500 shadow-[0_0_60px_rgba(244,63,94,0.35)]"
                : isHolding
                ? "border-rose-400 scale-[0.98]"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            {/* The Hidden Image (reveals as holding progress rises) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80"
              alt="Moonlit night"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              style={{
                opacity: revealedSecret ? 0.9 : Math.max(0.15, holdingProgress / 100),
                filter: revealedSecret ? "none" : "blur(8px) contrast(1.2)",
              }}
            />

            {/* Dark Mask Overlay */}
            <div
              className="absolute inset-0 bg-[#070709] transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: revealedSecret ? 0.2 : 1 - holdingProgress / 120,
              }}
            />

            {/* Glowing progress ring indicator */}
            {!revealedSecret && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none space-y-3 z-20">
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
                  <Heart
                    className={`h-8 w-8 transition-transform duration-200 ${
                      isHolding ? "scale-125 text-rose-500 fill-rose-500" : "text-white"
                    }`}
                  />
                  {/* Progress SVG */}
                  <svg className="absolute inset-0 h-full w-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="rgba(244,63,94,0.8)"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray="226"
                      strokeDashoffset={226 - (226 * holdingProgress) / 100}
                      className="transition-all duration-75"
                    />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  {isHolding ? `Developing... ${holdingProgress}%` : "Hold here"}
                </span>
              </div>
            )}

            {/* Revealed Text on Plate */}
            {revealedSecret && (
              <div className="relative z-20 space-y-1 text-left animate-in fade-in zoom-in-95 duration-700">
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300">
                  Unveiled Record
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-white font-normal leading-snug">
                  &ldquo;in every room, in every crowded moment, you are the calm.&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 05 — THE SURPRISE : THE 3D POLAROID REVEAL          */}
      {/* ============================================================ */}
      <section className="relative py-24 px-4 sm:px-8 max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.26em] text-zinc-500">
            A SUDDEN DISCOVERY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            okay, one more thing.
          </h2>
        </div>

        {/* 3D-angled Polaroid Card */}
        <div className="relative mx-auto max-w-xs sm:max-w-sm rounded-[28px] bg-[#fbfbf9] p-4 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-zinc-900 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border border-white/20">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=1200&auto=format&fit=crop&q=80"
              alt="Golden light sunset"
              className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.1]"
            />
            <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-mono text-white/90">
              ORIGINAL POLAROID
            </div>
          </div>

          <div className="space-y-1 text-left px-1 pb-2">
            <p className="font-serif italic text-base sm:text-lg text-zinc-900 leading-snug">
              &ldquo;out of 8 billion people, i would still choose you.&rdquo;
            </p>
            <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-t border-zinc-200">
              <span>FOR {recipient}</span>
              <span>FOREVER</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 06 — THE EMOTIONAL CLIMAX & DIGITAL CERTIFICATE     */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-between px-6 py-20 text-center">
        {/* Ambient bottom illumination */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-2xl rounded-full bg-gradient-to-t from-rose-500/15 via-pink-500/5 to-transparent blur-3xl"
        />

        <div className="my-auto w-full max-w-md space-y-8 z-10">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-rose-400">
              The Final Word
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.08]">
              always you.
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-zinc-300 font-light">
              this tiny piece of the internet belongs to you now.
            </p>
          </div>

          {/* Certificate of Permanence */}
          <div className="rounded-[32px] border border-rose-500/30 bg-gradient-to-b from-[#131318] via-[#0d0d10] to-[#070709] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                Official Digital Certificate
              </span>
              <span className="text-xs">✨</span>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/60 p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>DEDICATED TO:</span>
                <span className="text-white font-semibold">{recipient}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>AUTHENTICATED BY:</span>
                <span className="text-white font-semibold">{sender}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>STATUS:</span>
                <span className="text-rose-400 font-semibold">IRREVOCABLY LOVED</span>
              </div>
            </div>

            {/* Direct Reaction Actions to Text Sender */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-zinc-400 text-center font-light">
                Tell {sender} you saw it:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={smsLink}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white py-3.5 px-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition active:scale-98 shadow-lg"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Text</span>
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-3.5 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-100 hover:border-white/30 hover:bg-white/[0.08] transition active:scale-98"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Replay Button */}
          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Replay from top</span>
            </button>
            <span>•</span>
            <span>Screenshot to keep 📸</span>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="z-10 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
          One tiny thing.
        </footer>
      </section>
    </div>
  );
}
