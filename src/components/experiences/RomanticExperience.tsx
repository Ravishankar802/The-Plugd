"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Heart, ArrowDown, Send, RotateCcw } from "lucide-react";
import { getMoodById } from "@/lib/experiences";

interface RomanticExperienceProps {
  gift: {
    slug: string;
    target: string;
    mood?: string;
    recipientName: string | null;
    senderName: string | null;
    customNote: string | null;
  };
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
  alpha: number;
}

export default function RomanticExperience({ gift }: RomanticExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [holdingProgress, setHoldingProgress] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  const isHer = gift.target === "her";
  const recipient = gift.recipientName || (isHer ? "you" : "you");
  const sender = gift.senderName || (isHer ? "your man" : "your girl");
  const moodConfig = getMoodById(gift.mood || "after-dark", isHer ? "her" : "him");

  // Interactive physics state
  const touchState = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    shockwaveRadius: 0,
    shockwaveAlpha: 0,
  });

  const scrollRef = useRef(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Adult, intimate, provocative kinetic lines tailored to the mood
  const moodPhrases: Record<string, { threshold: number; text: string; subtext?: string }[]> = {
    "after-dark": [
      { threshold: 0.04, text: "after dark." },
      { threshold: 0.18, text: "lock the door." },
      { threshold: 0.34, text: "come closer." },
      { threshold: 0.50, text: "don't look away." },
      { threshold: 0.68, text: "you know what happens next." },
      { threshold: 0.84, text: "tonight is yours." },
      { threshold: 0.94, text: "still you." },
    ],
    "come-closer": [
      { threshold: 0.04, text: "closer." },
      { threshold: 0.18, text: "don't make me wait." },
      { threshold: 0.34, text: "my hands have memory." },
      { threshold: 0.50, text: "you've been warned." },
      { threshold: 0.68, text: "stay right here." },
      { threshold: 0.84, text: "i want you." },
      { threshold: 0.94, text: "always." },
    ],
    "i-want-you": [
      { threshold: 0.04, text: "i want you." },
      { threshold: 0.18, text: "stop thinking." },
      { threshold: 0.34, text: "you started this." },
      { threshold: 0.50, text: "come over." },
      { threshold: 0.68, text: "zero rules tonight." },
      { threshold: 0.84, text: "all mine." },
      { threshold: 0.94, text: "you know." },
    ],
    "bad-ideas": [
      { threshold: 0.04, text: "bad ideas." },
      { threshold: 0.18, text: "we're not sleeping tonight." },
      { threshold: 0.34, text: "we'll deal with tomorrow tomorrow." },
      { threshold: 0.50, text: "zero regrets." },
      { threshold: 0.68, text: "dangerously close." },
      { threshold: 0.84, text: "too late to behave." },
      { threshold: 0.94, text: "you and me." },
    ],
  };

  const phrases = moodPhrases[gift.mood || "after-dark"] || moodPhrases["after-dark"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of particles adapted to device
    const particleCount = window.innerWidth < 640 ? 240 : 380;
    const particles: Particle3D[] = [];

    // Mood-specific color spectrums: Adult wine, crimson, deep rose, amber, pure starlight
    const palette =
      moodConfig.theme === "amber"
        ? [
            "rgba(251, 146, 60, ",  // Warm amber
            "rgba(245, 158, 11, ",  // Golden honey
            "rgba(244, 63, 94, ",   // Rose
            "rgba(255, 255, 255, ", // Light
            "rgba(180, 83, 9, ",    // Deep cognac
          ]
        : moodConfig.theme === "wine"
        ? [
            "rgba(225, 29, 72, ",   // Crimson rose
            "rgba(159, 18, 57, ",   // Deep wine
            "rgba(255, 182, 193, ", // Soft blush
            "rgba(255, 255, 255, ", // Starlight
            "rgba(88, 28, 135, ",   // Midnight purple
          ]
        : [
            "rgba(244, 63, 94, ",   // Rose
            "rgba(225, 29, 72, ",   // Crimson
            "rgba(254, 205, 211, ", // Silk
            "rgba(255, 255, 255, ", // Starlight
            "rgba(136, 19, 55, ",   // Deep burgundy
          ];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 420 + 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.35,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: Math.random() * 2.4 + 0.7,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);

    function handleScroll() {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      const clamped = Math.min(Math.max(current, 0), 1);
      scrollRef.current = clamped;
      setScrollProgress(clamped);

      // Determine active kinetic phrase
      for (let i = phrases.length - 1; i >= 0; i--) {
        if (clamped >= phrases[i].threshold) {
          setActivePhraseIndex(i);
          break;
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    function handlePointerMove(clientX: number, clientY: number) {
      touchState.current.targetX = clientX - width / 2;
      touchState.current.targetY = clientY - height / 2;
    }

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const triggerShockwave = () => {
      touchState.current.shockwaveRadius = 15;
      touchState.current.shockwaveAlpha = 1;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mousedown", triggerShockwave);
    window.addEventListener("touchstart", triggerShockwave, { passive: true });

    let lastTime = performance.now();
    let globalAngle = 0;

    // ========================================================
    // CORE 60FPS WEBGPU / CANVAS PHYSICS & SCROLL RENDER LOOP
    // ========================================================
    function render(currentTime: number) {
      if (!ctx) return;
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const p = scrollRef.current; // Continuous 0.0 -> 1.0 scroll input

      // Elastic pointer smoothing
      touchState.current.x += (touchState.current.targetX - touchState.current.x) * 0.08;
      touchState.current.y += (touchState.current.targetY - touchState.current.y) * 0.08;

      // Expand & fade shockwave
      if (touchState.current.shockwaveAlpha > 0.01) {
        touchState.current.shockwaveRadius += dt * 420;
        touchState.current.shockwaveAlpha *= 0.93;
      }

      // 1. Deep space canvas backdrop (No stark contrast jumps)
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, width, height);

      // 2. Cosmic Ambient Radial Glow tailored to adult mood
      const glowGradient = ctx.createRadialGradient(
        width / 2 + touchState.current.x * 0.12,
        height / 2 + touchState.current.y * 0.12,
        15,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );

      if (p < 0.25) {
        glowGradient.addColorStop(0, "rgba(225, 29, 72, 0.18)"); // Crimson flame
        glowGradient.addColorStop(0.5, "rgba(76, 5, 25, 0.08)");
      } else if (p < 0.6) {
        glowGradient.addColorStop(0, "rgba(251, 146, 60, 0.16)"); // Warm amber
        glowGradient.addColorStop(0.5, "rgba(159, 18, 57, 0.09)");
      } else if (p < 0.85) {
        glowGradient.addColorStop(0, "rgba(192, 38, 211, 0.18)"); // Electric wine
        glowGradient.addColorStop(0.5, "rgba(136, 19, 55, 0.08)");
      } else {
        glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.22)"); // Singularity starlight
        glowGradient.addColorStop(0.5, "rgba(225, 29, 72, 0.12)");
      }
      glowGradient.addColorStop(1, "rgba(5, 5, 7, 0)");

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Shockwave circle on touch
      if (touchState.current.shockwaveAlpha > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          width / 2 + touchState.current.x,
          height / 2 + touchState.current.y,
          touchState.current.shockwaveRadius,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(255, 182, 193, ${touchState.current.shockwaveAlpha * 0.6})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      }

      // 3. 3D Coordinate Space Rotation & Projection
      globalAngle += dt * (0.35 + p * 1.4);
      const cameraZ = 340 + Math.sin(p * Math.PI) * 160;
      const fov = 320;

      const collapseFactor = p >= 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
      const orbitExpansion = Math.sin(p * Math.PI) * 1.5 + 0.6;

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Luminous filament bonds between adjacent particles
      if (p > 0.25 && p < 0.88) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 45; i++) {
          const a = particles[i];
          const b = particles[(i + 1) % 45];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            const az = a.z + cameraZ;
            const bz = b.z + cameraZ;
            if (az > 20 && bz > 20) {
              const ax = (a.x * fov) / az;
              const ay = (a.y * fov) / az;
              const bx = (b.x * fov) / bz;
              const by = (b.y * fov) / bz;
              ctx.strokeStyle = `rgba(225, 29, 72, ${0.16 * (1 - dist / 120)})`;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.stroke();
            }
          }
        }
      }

      // Render 3D Particles with depth sorting & deflection
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        const rotY = globalAngle + pt.baseZ * 0.002;
        const rotX = p * Math.PI * 1.1;

        let x = pt.baseX * orbitExpansion * collapseFactor;
        let y = pt.baseY * orbitExpansion * collapseFactor;
        let z = pt.baseZ * collapseFactor;

        // Interactive touch deflection
        const dx = x - touchState.current.x;
        const dy = y - touchState.current.y;
        const distToTouch = Math.hypot(dx, dy);
        if (distToTouch < 170 && distToTouch > 1) {
          const repelForce = (1 - distToTouch / 170) * 40;
          x += (dx / distToTouch) * repelForce;
          y += (dy / distToTouch) * repelForce;
        }

        // Apply 3D Rotation
        const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        const z1 = z * Math.cos(rotY) + x * Math.sin(rotY);

        const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);

        // Perspective Project
        const projectedZ = z2 + cameraZ;
        if (projectedZ > 10) {
          const scale = fov / projectedZ;
          const projX = x1 * scale;
          const projY = y2 * scale;
          const projSize = Math.max(pt.size * scale * (collapseFactor > 0.3 ? 1 : 2.2), 0.6);

          ctx.beginPath();
          ctx.arc(projX, projY, projSize, 0, Math.PI * 2);
          ctx.fillStyle = `${pt.color}${pt.alpha * Math.min(1, projectedZ / 200)})`;
          ctx.fill();

          if (scale > 1.25) {
            ctx.shadowBlur = 9;
            ctx.shadowColor = "rgba(255, 182, 193, 0.85)";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 4. Central Sacred Core (Singularity Pulse)
      const corePulse = Math.sin(currentTime * 0.004) * 6;
      const coreRadius = Math.max(14 + (1 - collapseFactor) * 36 + corePulse, 8);

      const coreGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, coreRadius * 3.5);
      coreGlow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      coreGlow.addColorStop(0.35, "rgba(225, 29, 72, 0.85)");
      coreGlow.addColorStop(0.75, "rgba(251, 146, 60, 0.35)");
      coreGlow.addColorStop(1, "rgba(225, 29, 72, 0)");

      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 28;
      ctx.shadowColor = "rgba(244, 63, 94, 1)";
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mousedown", triggerShockwave);
      window.removeEventListener("touchstart", triggerShockwave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [moodConfig]);

  // Touch & hold interaction for the secret chamber
  function startHold() {
    if (secretUnlocked) return;
    let progress = 0;
    holdTimerRef.current = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        setHoldingProgress(100);
        setSecretUnlocked(true);
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      } else {
        setHoldingProgress(progress);
      }
    }, 40);
  }

  function stopHold() {
    if (secretUnlocked) return;
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldingProgress(0);
  }

  const textBody = `I just finished the website you sent me... WHAT THE FUCK 😭❤️`;
  const smsLink = `sms:?&body=${encodeURIComponent(textBody)}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(textBody)}`;

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050507] text-white selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden min-h-[700vh]"
    >
      {/* Fixed Fullscreen GPU Interactive Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-auto z-0 touch-none"
      />

      {/* Persistent Audio-Visual Watermark & Progress Pill */}
      <header className="fixed top-5 left-0 right-0 z-40 mx-auto max-w-sm px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 rounded-full bg-black/75 border border-white/10 px-3.5 py-1.5 backdrop-blur-xl shadow-2xl">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-zinc-300">
            For {recipient}
          </span>
        </div>

        <div className="rounded-full bg-black/75 border border-white/10 px-3 py-1.5 backdrop-blur-xl text-[10px] font-mono text-zinc-400">
          From {sender}
        </div>
      </header>

      {/* ======================================================== */}
      {/* SEAMLESS FULL-VIEWPORT SENSUAL VISUAL LAYERS (BORDERLESS) */}
      {/* Visuals blend into the void with silky masks & opacity   */}
      {/* ======================================================== */}

      {/* Layer 1: Red Light / Shadow Silhouette (Emerges around 15% - 35% scroll) */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 ease-out flex items-center justify-center overflow-hidden"
        style={{
          opacity: scrollProgress > 0.12 && scrollProgress < 0.45 ? 0.35 : 0,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.7] contrast-[1.2] scale-110 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80')`,
            maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, transparent 70%)",
          }}
        />
      </div>

      {/* Layer 2: Intimate Tangled Hands / Silhouette (Emerges around 45% - 70% scroll) */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 ease-out flex items-center justify-center overflow-hidden"
        style={{
          opacity: scrollProgress > 0.42 && scrollProgress < 0.78 ? 0.32 : 0,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.65] contrast-[1.25] scale-110 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80')`,
            maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, transparent 70%)",
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* PERFECT TEXT LEGIBILITY SYSTEM                          */}
      {/* Intelligent localized vignette + dark contrast pill     */}
      {/* Visual hierarchy: Primary Experience -> Text -> Motion  */}
      {/* ======================================================== */}
      <div className="fixed inset-0 pointer-events-none z-30 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="relative inline-flex flex-col items-center max-w-lg transition-all duration-500 ease-out">
          {/* Localized Dark Contrast Backdrop Behind Kinetic Text */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -inset-y-6 bg-black/65 rounded-3xl backdrop-blur-xl border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.95)] pointer-events-none"
          />

          <div className="relative z-10 px-6 py-4">
            <h2
              key={activePhraseIndex}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-[-0.03em] leading-tight drop-shadow-[0_8px_24px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-500"
            >
              {phrases[activePhraseIndex]?.text}
            </h2>
            <p className="mt-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-rose-300 font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {moodConfig.name} • SCROLL TO PULL
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 01 — THE PITCH BLACK SPARK (0vh - 100vh)          */}
      {/* ======================================================== */}
      <section className="relative h-screen flex flex-col items-center justify-between p-6 z-20 pointer-events-none">
        <div />
        <div className="space-y-4 max-w-md text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-black/80 px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.26em] text-rose-300 backdrop-blur-xl shadow-2xl">
            <Sparkles className="h-3.5 w-3.5 text-rose-400" />
            <span>Private Artifact</span>
          </div>

          <p className="font-serif italic text-2xl sm:text-3xl text-zinc-200 font-light drop-shadow-md">
            &ldquo;turn your brightness up. scroll slowly.&rdquo;
          </p>

          {gift.customNote && (
            <div className="mx-auto max-w-xs rounded-2xl border border-rose-500/20 bg-black/80 p-4 text-xs font-light text-rose-200/90 italic backdrop-blur-xl shadow-2xl">
              &ldquo;{gift.customNote}&rdquo;
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 text-zinc-400 animate-bounce duration-1000">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-semibold">
            Scroll to pull closer
          </span>
          <ArrowDown className="h-4 w-4 text-rose-400" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 02 — THE DUAL ORBITAL TENSION (100vh - 250vh)     */}
      {/* ======================================================== */}
      <section className="relative h-[150vh] flex items-center justify-center p-6 z-20 pointer-events-none">
        <div className="max-w-md text-center space-y-3 rounded-3xl border border-white/10 bg-black/75 p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-rose-400 font-semibold">
            Gravitational Pull
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-white font-normal leading-relaxed drop-shadow-md">
            Every room gets quiet the second you look at me.
          </p>
          <span className="text-xs font-mono text-zinc-400 block">
            Drag your finger across to warp the field
          </span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 03 — HYPERSPACE TRANSIT (250vh - 420vh)           */}
      {/* ======================================================== */}
      <section className="relative h-[170vh] flex items-center justify-center p-6 z-20 pointer-events-none">
        <div className="max-w-md text-center space-y-3 rounded-3xl border border-rose-500/30 bg-black/80 p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-rose-400 font-semibold">
            Transit
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-white font-normal leading-relaxed drop-shadow-md">
            I don&apos;t think you realize what you do to me.
          </p>
          <span className="text-xs font-mono text-rose-300 block">
            (Yes, this whole website was coded for you)
          </span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 04 — THE TACTILE VAULT CHAMBER (420vh - 580vh)     */}
      {/* ======================================================== */}
      <section className="relative h-[160vh] flex flex-col items-center justify-center p-6 z-30 pointer-events-auto">
        <div className="w-full max-w-sm mx-auto text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-rose-400 font-semibold">
              Tactile Vault
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white drop-shadow-md">
              {secretUnlocked ? "Transmission unsealed." : "Press & hold the core."}
            </h3>
            <p className="text-xs text-zinc-300 font-light">
              {secretUnlocked
                ? "Scroll down to the final reveal."
                : "Hold your thumb on the diamond to ignite."}
            </p>
          </div>

          {/* Interactive Touch Pad */}
          <div
            onMouseDown={startHold}
            onMouseUp={stopHold}
            onTouchStart={startHold}
            onTouchEnd={stopHold}
            className={`relative mx-auto aspect-square w-64 rounded-full border transition-all duration-300 select-none cursor-pointer flex flex-col items-center justify-center p-6 shadow-2xl ${
              secretUnlocked
                ? "border-rose-500 bg-rose-950/40 shadow-[0_0_90px_rgba(244,63,94,0.5)]"
                : "border-white/20 bg-black/80 hover:border-white/40 active:scale-95"
            }`}
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(244, 63, 94, 0.95)"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="754"
                strokeDashoffset={754 - (754 * holdingProgress) / 100}
                className="transition-all duration-75"
              />
            </svg>

            {!secretUnlocked ? (
              <div className="space-y-2 pointer-events-none">
                <Heart
                  className={`mx-auto h-10 w-10 transition-transform duration-200 ${
                    holdingProgress > 0 ? "scale-125 text-rose-500 fill-rose-500" : "text-white"
                  }`}
                />
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-300 font-semibold block">
                  {holdingProgress > 0 ? `${holdingProgress}%` : "Hold here"}
                </span>
              </div>
            ) : (
              <div className="space-y-2 pointer-events-none animate-in zoom-in-95 duration-500 text-center px-3">
                <Sparkles className="mx-auto h-8 w-8 text-rose-400" />
                <p className="font-serif italic text-base sm:text-lg text-white font-normal leading-snug">
                  &ldquo;Out of 8 billion people, I would choose you in every lifetime.&rdquo;
                </p>
                <span className="text-[10px] font-mono text-rose-300 block font-semibold">— {sender}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 05 — THE FINAL CLIMAX & DIGITAL CERTIFICATE        */}
      {/* ======================================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 z-30 pointer-events-auto">
        <div className="w-full max-w-md mx-auto space-y-8 text-center my-auto">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-rose-400 font-semibold">
              The Climax
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl font-normal text-white tracking-tight leading-none drop-shadow-2xl">
              always you.
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-zinc-300 font-light">
              This universe stays online forever for you.
            </p>
          </div>

          {/* Holographic Certificate of Permanence */}
          <div className="rounded-[36px] border border-rose-500/40 bg-gradient-to-b from-[#131318]/90 via-[#0b0b0e]/95 to-[#060608] p-7 sm:p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-semibold">
                Official Digital Artifact
              </span>
              <span className="text-xs text-rose-400">✨</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/80 p-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>DEDICATED TO:</span>
                <span className="text-white font-semibold">{recipient}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>CONSTRUCTED BY:</span>
                <span className="text-white font-semibold">{sender}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>MOOD:</span>
                <span className="text-rose-400 font-semibold uppercase">{moodConfig.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>STATUS:</span>
                <span className="text-rose-400 font-semibold">IRREVOCABLY LOVED</span>
              </div>
            </div>

            {/* Direct 1-Tap Reaction Action */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-zinc-300 text-center font-light">
                Tell {sender} what just happened:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={smsLink}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white py-3.5 px-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition active:scale-98 shadow-xl"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Text</span>
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] py-3.5 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-100 hover:border-white/30 hover:bg-white/[0.1] transition active:scale-98"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Replay Button */}
          <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-400">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Replay universe</span>
            </button>
            <span>•</span>
            <span>Screenshot to keep 📸</span>
          </div>
        </div>

        <footer className="pt-12 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          One tiny thing.
        </footer>
      </section>
    </div>
  );
}
