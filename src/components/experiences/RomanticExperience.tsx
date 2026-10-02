"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Heart, ArrowDown, Send, RotateCcw } from "lucide-react";

interface RomanticExperienceProps {
  gift: {
    slug: string;
    target: string;
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [holdingProgress, setHoldingProgress] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  const isHer = gift.target === "her";
  const recipient = gift.recipientName || (isHer ? "my girl" : "my man");
  const sender = gift.senderName || (isHer ? "your man" : "your girl");

  // Interactive physics state
  const touchState = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDown: false,
    hasTouched: false,
    dragDistance: 0,
    shockwaveRadius: 0,
    shockwaveAlpha: 0,
  });

  const scrollRef = useRef(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Poetic kinetic lines triggered as the user journeys through the world
  const phrases = [
    { threshold: 0.05, text: "hey." },
    { threshold: 0.18, text: "come closer." },
    { threshold: 0.32, text: "i notice everything." },
    { threshold: 0.48, text: "you smiled. i saw that." },
    { threshold: 0.65, text: "okay, don't get emotional." },
    { threshold: 0.82, text: "fine. one last thing." },
    { threshold: 0.94, text: "always you." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 350 interactive 3D particles
    const particleCount = window.innerWidth < 640 ? 220 : 380;
    const particles: Particle3D[] = [];

    const colors = [
      "rgba(255, 107, 138, ", // Rose
      "rgba(255, 182, 193, ", // Pink
      "rgba(254, 215, 170, ", // Amber warmth
      "rgba(255, 255, 255, ", // Pure starlight
      "rgba(244, 63, 94, ",  // Deep crimson
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 400 + 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: Math.random() * 2.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    // Resize handling with devicePixelRatio
    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);

    // Smooth scroll listener
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

    // Mouse / Touch movement tracking with elastic inertia
    function handlePointerMove(clientX: number, clientY: number) {
      touchState.current.targetX = clientX - width / 2;
      touchState.current.targetY = clientY - height / 2;
      if (!hasInteracted) setHasInteracted(true);
    }

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const triggerShockwave = () => {
      touchState.current.shockwaveRadius = 10;
      touchState.current.shockwaveAlpha = 1;
      setHasInteracted(true);
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

      // Elastic smoothing for pointer
      touchState.current.x += (touchState.current.targetX - touchState.current.x) * 0.08;
      touchState.current.y += (touchState.current.targetY - touchState.current.y) * 0.08;

      // Expand & fade shockwave
      if (touchState.current.shockwaveAlpha > 0.01) {
        touchState.current.shockwaveRadius += dt * 380;
        touchState.current.shockwaveAlpha *= 0.94;
      }

      // 1. Deep space backdrop with velocity-driven color wash
      ctx.fillStyle = "#060608";
      ctx.fillRect(0, 0, width, height);

      // 2. Cosmic Ambient Radial Glow
      const glowGradient = ctx.createRadialGradient(
        width / 2 + touchState.current.x * 0.15,
        height / 2 + touchState.current.y * 0.15,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );

      // Hue shifts dynamically based on scroll progression:
      // Start deep midnight -> warm sunset crimson -> neon rose -> celestial diamond
      if (p < 0.25) {
        glowGradient.addColorStop(0, "rgba(244, 63, 94, 0.12)");
        glowGradient.addColorStop(0.5, "rgba(136, 19, 55, 0.05)");
      } else if (p < 0.6) {
        glowGradient.addColorStop(0, "rgba(251, 146, 60, 0.14)");
        glowGradient.addColorStop(0.5, "rgba(244, 63, 94, 0.07)");
      } else if (p < 0.85) {
        glowGradient.addColorStop(0, "rgba(217, 70, 239, 0.15)");
        glowGradient.addColorStop(0.5, "rgba(244, 63, 94, 0.06)");
      } else {
        glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
        glowGradient.addColorStop(0.5, "rgba(244, 63, 94, 0.1)");
      }
      glowGradient.addColorStop(1, "rgba(6, 6, 8, 0)");

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Shockwave circle ring if active
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

      // 3. Coordinate Choreography across Scenes
      globalAngle += dt * (0.4 + p * 1.5);
      const cameraZ = 350 + Math.sin(p * Math.PI) * 150;
      const fov = 320;

      // Convergence factor: At 0% wide, at 85%-100% collapses to singular core
      const collapseFactor = p >= 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1;
      const orbitExpansion = Math.sin(p * Math.PI) * 1.6 + 0.6;

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Render connected constellation filaments between neighboring particles in Phase 3
      if (p > 0.3 && p < 0.85) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 40; i++) {
          const a = particles[i];
          const b = particles[(i + 1) % 40];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            const az = a.z + cameraZ;
            const bz = b.z + cameraZ;
            if (az > 20 && bz > 20) {
              const ax = (a.x * fov) / az;
              const ay = (a.y * fov) / az;
              const bx = (b.x * fov) / bz;
              const by = (b.y * fov) / bz;
              ctx.strokeStyle = `rgba(244, 63, 94, ${0.18 * (1 - dist / 130)})`;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.stroke();
            }
          }
        }
      }

      // Render 3D Particles with physical projection
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // 3D rotation matrix around Y and X axes
        const rotY = globalAngle + (pt.baseZ * 0.002);
        const rotX = p * Math.PI * 1.2;

        // Apply orbit dynamics & continuous scroll displacement
        let x = pt.baseX * orbitExpansion * collapseFactor;
        let y = pt.baseY * orbitExpansion * collapseFactor;
        let z = pt.baseZ * collapseFactor;

        // Interactive touch deflection
        const dx = x - touchState.current.x;
        const dy = y - touchState.current.y;
        const distToTouch = Math.hypot(dx, dy);
        if (distToTouch < 180 && distToTouch > 1) {
          const repelForce = (1 - distToTouch / 180) * 45;
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
          const projSize = Math.max(pt.size * scale * (collapseFactor > 0.3 ? 1 : 2), 0.6);

          ctx.beginPath();
          ctx.arc(projX, projY, projSize, 0, Math.PI * 2);
          ctx.fillStyle = `${pt.color}${pt.alpha * Math.min(1, projectedZ / 200)})`;
          ctx.fill();

          // Highlight sparkles on closer particles
          if (scale > 1.2) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(255, 182, 193, 0.8)";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 4. Central Sacred Singularity Core (The Heart of the Artifact)
      const corePulse = Math.sin(currentTime * 0.004) * 6;
      const coreRadius = Math.max(12 + (1 - collapseFactor) * 35 + corePulse, 8);

      const coreGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, coreRadius * 3);
      coreGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      coreGlow.addColorStop(0.3, "rgba(244, 63, 94, 0.8)");
      coreGlow.addColorStop(0.7, "rgba(251, 146, 60, 0.3)");
      coreGlow.addColorStop(1, "rgba(244, 63, 94, 0)");

      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 3, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 24;
      ctx.shadowColor = "rgba(255, 107, 138, 1)";
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
  }, [hasInteracted]);

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
    }, 45);
  }

  function stopHold() {
    if (secretUnlocked) return;
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldingProgress(0);
  }

  const textBody = `I just finished the website you sent me... WHAT THE FUCK IS THIS 😭❤️`;
  const smsLink = `sms:?&body=${encodeURIComponent(textBody)}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(textBody)}`;

  return (
    <div
      ref={containerRef}
      className="relative bg-[#060608] text-white selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden min-h-[700vh]"
    >
      {/* Fixed Fullscreen GPU Interactive Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-auto z-0 touch-none"
      />

      {/* Persistent Audio-Visual Watermark & Progress Pill */}
      <header className="fixed top-5 left-0 right-0 z-30 mx-auto max-w-sm px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 rounded-full bg-black/60 border border-white/10 px-3.5 py-1.5 backdrop-blur-xl shadow-2xl">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-zinc-300">
            For {recipient}
          </span>
        </div>

        <div className="rounded-full bg-black/60 border border-white/10 px-3 py-1.5 backdrop-blur-xl text-[10px] font-mono text-zinc-400">
          From {sender}
        </div>
      </header>

      {/* Dynamic Kinetic Typography HUD — Glides through 3D space with scroll */}
      <div className="fixed inset-0 pointer-events-none z-20 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="transition-all duration-700 ease-out transform">
          <h2
            key={activePhraseIndex}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-[-0.03em] leading-tight drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-500"
          >
            {phrases[activePhraseIndex]?.text}
          </h2>
          <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.3em] text-rose-300/80">
            Phase 0{activePhraseIndex + 1} // Scroll to travel
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 01 — THE SPARK (0vh - 100vh)                      */}
      {/* ======================================================== */}
      <section className="relative h-screen flex flex-col items-center justify-between p-6 z-10 pointer-events-none">
        <div />
        <div className="space-y-4 max-w-md text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-rose-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Artifact</span>
          </div>

          <p className="font-serif italic text-xl sm:text-2xl text-zinc-300 font-light">
            &ldquo;touch the screen. drag the light. scroll down.&rdquo;
          </p>

          {gift.customNote && (
            <div className="mx-auto max-w-xs rounded-2xl border border-white/10 bg-black/60 p-4 text-xs font-light text-rose-200/90 italic backdrop-blur-md shadow-2xl">
              &ldquo;{gift.customNote}&rdquo;
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 text-zinc-500 animate-bounce duration-1000">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
            Scroll to pull the universe
          </span>
          <ArrowDown className="h-4 w-4 text-zinc-400" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 02 — THE DUAL ORBIT ACCELERATION (100vh - 250vh)  */}
      {/* ======================================================== */}
      <section className="relative h-[150vh] flex items-center justify-center p-6 z-10 pointer-events-none">
        <div className="max-w-md text-center space-y-4 rounded-3xl border border-white/5 bg-black/40 p-8 backdrop-blur-xl shadow-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-amber-300">
            Orbital Synchronization
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-zinc-200 font-normal leading-relaxed">
            A text was too small.
            An Instagram story was too loud.
            So I built you a gravity field.
          </p>
          <span className="text-xs font-mono text-zinc-500 block">
            Drag your finger across to warp trajectory
          </span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 03 — THE SHATTER & HYPERSPACE TUNNEL (250vh - 420vh) */}
      {/* ======================================================== */}
      <section className="relative h-[170vh] flex items-center justify-center p-6 z-10 pointer-events-none">
        <div className="max-w-md text-center space-y-4 rounded-3xl border border-rose-500/20 bg-black/50 p-8 backdrop-blur-xl shadow-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-rose-400">
            Hyperspace Transit
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-white font-normal leading-relaxed">
            Every particle in this world is tethered to you right now.
          </p>
          <span className="text-xs font-mono text-rose-300/80 block">
            (Yes, someone really coded this for you)
          </span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 04 — THE TACTILE VAULT CHAMBER (420vh - 580vh)     */}
      {/* ======================================================== */}
      <section className="relative h-[160vh] flex flex-col items-center justify-center p-6 z-20 pointer-events-auto">
        <div className="w-full max-w-sm mx-auto text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-rose-400">
              The Classified Chamber
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              {secretUnlocked ? "Decryption complete." : "Press & hold the core."}
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              {secretUnlocked
                ? "Scroll to the final event."
                : "Hold your thumb on the diamond to ignite the transmission."}
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
                ? "border-rose-500 bg-rose-950/30 shadow-[0_0_80px_rgba(244,63,94,0.4)]"
                : "border-white/20 bg-black/60 hover:border-white/40 active:scale-95"
            }`}
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(244, 63, 94, 0.9)"
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
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 block">
                  {holdingProgress > 0 ? `${holdingProgress}%` : "Hold here"}
                </span>
              </div>
            ) : (
              <div className="space-y-2 pointer-events-none animate-in zoom-in-95 duration-500">
                <Sparkles className="mx-auto h-8 w-8 text-rose-400" />
                <p className="font-serif italic text-sm text-rose-200 leading-snug">
                  &ldquo;Out of 8 billion people, I would choose you in every lifetime.&rdquo;
                </p>
                <span className="text-[10px] font-mono text-zinc-400 block">— {sender}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 05 — THE FINAL COLLAPSE & DIGITAL ARTIFACT         */}
      {/* ======================================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 z-20 pointer-events-auto">
        <div className="w-full max-w-md mx-auto space-y-8 text-center my-auto">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-rose-400">
              The Singularity
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl font-normal text-white tracking-tight leading-none">
              always you.
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-zinc-300 font-light">
              This universe stays online forever for you.
            </p>
          </div>

          {/* Holographic Certificate of Permanence */}
          <div className="rounded-[36px] border border-rose-500/30 bg-gradient-to-b from-[#131318] via-[#0b0b0e] to-[#060608] p-7 sm:p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                Official Digital Artifact
              </span>
              <span className="text-xs">✨</span>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/60 p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>DEDICATED TO:</span>
                <span className="text-white font-semibold">{recipient}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>CONSTRUCTED BY:</span>
                <span className="text-white font-semibold">{sender}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>STATUS:</span>
                <span className="text-rose-400 font-semibold">IRREVOCABLY LOVED</span>
              </div>
            </div>

            {/* Direct 1-Tap Text Reaction */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-zinc-400 text-center font-light">
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
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-3.5 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-100 hover:border-white/30 hover:bg-white/[0.08] transition active:scale-98"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Replay Button */}
          <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
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

        <footer className="pt-12 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
          One tiny thing.
        </footer>
      </section>
    </div>
  );
}
