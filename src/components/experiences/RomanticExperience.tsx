"use client";

import { useState, useEffect } from "react";
import { Heart, Sparkles, Lock, ArrowRight, Check, Send, RotateCcw } from "lucide-react";

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
  const [step, setStep] = useState<number>(0);
  const [gaugeValue, setGaugeValue] = useState<number>(20);
  const [cardsFlipped, setCardsFlipped] = useState<Record<number, boolean>>({});
  const [decrypted, setDecrypted] = useState<boolean>(false);
  const [questionAnswered, setQuestionAnswered] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; left: number; top: number }[]>([]);

  const isHer = gift.target === "her";
  const recipient = gift.recipientName || (isHer ? "You" : "You");
  const sender = gift.senderName || (isHer ? "Your man" : "Your girl");

  function spawnHearts() {
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 50 + 20,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 1800);
  }

  // Pre-filled text to send back to sender
  const textBody = `I just finished the website you sent me... WHAT THE FUCK 😭❤️`;
  const smsLink = `sms:?&body=${encodeURIComponent(textBody)}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    textBody
  )}`;

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between items-center px-4 py-6 sm:px-6 sm:py-10 selection:bg-rose-500 selection:text-white overflow-hidden font-sans">
      {/* Dynamic Starfield / Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[500px] w-[95vw] max-w-lg rounded-full bg-gradient-to-b from-rose-500/15 via-pink-500/5 to-transparent blur-3xl animate-pulse duration-1000" />
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* Floating tap hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{ left: `${h.left}%`, top: `${h.top}%` }}
          className="pointer-events-none fixed text-2xl animate-out fade-out slide-out-to-top duration-1000 select-none z-50"
        >
          ❤️
        </span>
      ))}

      {/* Discreet Header Badge */}
      <header className="relative z-10 w-full max-w-sm flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
          A private corner of the internet
        </span>
        <span>0{step + 1} / 06</span>
      </header>

      {/* STEP 0: The Sealed Midnight Envelope */}
      {step === 0 && (
        <main className="relative z-10 w-full max-w-sm my-auto text-center space-y-6 animate-in fade-in duration-700">
          <div className="relative mx-auto rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-transparent p-7 sm:p-9 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/30 text-3xl shadow-[0_0_30px_rgba(244,63,94,0.25)] animate-bounce duration-1000">
              💌
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-rose-400">
                Created For {recipient}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                Someone made you a tiny website.
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Turn your brightness up. Put your phone on silent. Read this in private.
              </p>
            </div>

            {gift.customNote && (
              <div className="rounded-2xl bg-black/40 border border-white/5 p-4 text-xs text-rose-200/90 italic">
                &ldquo;{gift.customNote}&rdquo;
              </div>
            )}

            <button
              onClick={() => {
                spawnHearts();
                setStep(1);
              }}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-4 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-xl hover:bg-zinc-200 transition-all active:scale-[0.98]"
            >
              <span>Tap to unseal</span>
              <Sparkles className="h-4 w-4 text-rose-500 transition-transform group-hover:rotate-45" />
            </button>
          </div>

          <p className="text-[11px] font-mono text-zinc-600">
            From: {sender}
          </p>
        </main>
      )}

      {/* STEP 1: The Calibration Question */}
      {step === 1 && (
        <main className="relative z-10 w-full max-w-sm my-auto text-left space-y-5 animate-in fade-in zoom-in-95 duration-400">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
              Calibration Question
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Before we start: how much do you think {sender} likes you?
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Answer honestly. Your response is recorded.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            {[
              { id: "low", text: "🤏 A normal, reasonable amount" },
              { id: "mid", text: "🫠 Quite a lot, actually" },
              { id: "high", text: "🪐 More than is scientifically healthy" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setQuestionAnswered(opt.id);
                  spawnHearts();
                }}
                className={`w-full text-left rounded-2xl p-4 transition-all duration-200 border text-xs sm:text-sm font-medium ${
                  questionAnswered === opt.id
                    ? "border-rose-500 bg-rose-500/15 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.2)]"
                    : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/20"
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>

          {questionAnswered && (
            <div className="pt-2 animate-in fade-in duration-300 space-y-3">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-xs text-zinc-300">
                {questionAnswered === "low" && "Incorrect. Not even close."}
                {questionAnswered === "mid" && "Warmer. But still an understatement."}
                {questionAnswered === "high" && "Correct. Full evidence is presented below."}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 transition active:scale-[0.98]"
              >
                <span>Continue into the story →</span>
              </button>
            </div>
          )}
        </main>
      )}

      {/* STEP 2: The Visual Story — Things I Never Say Out Loud */}
      {step === 2 && (
        <main className="relative z-10 w-full max-w-sm my-auto text-left space-y-5 animate-in fade-in duration-400">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
              The Evidence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Things nobody else in the room notices.
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Tap each card to flip and read.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {[
              {
                id: 1,
                tag: "11:42 PM",
                title: "That look across the room",
                body: "The exact micro-expression you make when you try not to laugh. Nobody else sees it. I catch it every single time.",
              },
              {
                id: 2,
                tag: "VOICE NOTE",
                title: "Your excited cadence",
                body: "When you ramble about something completely random with that specific tone in your voice. I could listen to that on repeat for hours.",
              },
              {
                id: 3,
                tag: "THE TRUTH",
                title: "My involuntary reflex",
                body: "Whenever something funny or strange happens in a crowded room, you are the first pair of eyes I search for. Without exception.",
              },
            ].map((card) => {
              const isFlipped = Boolean(cardsFlipped[card.id]);
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    setCardsFlipped((prev) => ({ ...prev, [card.id]: !prev[card.id] }));
                    spawnHearts();
                  }}
                  className={`rounded-2xl p-4 border transition-all duration-300 cursor-pointer ${
                    isFlipped
                      ? "border-rose-500/80 bg-rose-950/20 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    <span>{card.tag}</span>
                    <span className="text-rose-400 font-sans">
                      {isFlipped ? "Revealed" : "Tap to flip →"}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">
                    {card.title}
                  </h3>
                  {isFlipped ? (
                    <p className="text-xs text-rose-200/90 leading-relaxed font-light animate-in fade-in duration-300">
                      {card.body}
                    </p>
                  ) : (
                    <p className="text-xs text-zinc-500 italic">
                      [Tap to reveal secret]
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setStep(3)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 transition active:scale-[0.98]"
          >
            <span>Next: Measure Obsession →</span>
          </button>
        </main>
      )}

      {/* STEP 3: Playful Interaction — The Obsession Meter */}
      {step === 3 && (
        <main className="relative z-10 w-full max-w-sm my-auto text-center space-y-6 animate-in fade-in duration-400">
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
              Interactive Test
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Real-time Obsession Gauge
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Tap the button repeatedly to charge the meter.
            </p>
          </div>

          {/* Meter Box */}
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-baseline font-mono text-xs text-zinc-400">
              <span>SYSTEM INTENSITY</span>
              <span className="text-rose-400 text-lg font-bold">
                {gaugeValue >= 100 ? "OVERFLOW" : `${gaugeValue}%`}
              </span>
            </div>

            {/* Gauge progress bar */}
            <div className="h-4 w-full rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-300"
                style={{ width: `${Math.min(gaugeValue, 100)}%` }}
              />
            </div>

            <button
              onClick={() => {
                setGaugeValue((prev) => Math.min(prev + 20, 100));
                spawnHearts();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-rose-500/20 border border-rose-500/40 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-rose-200 hover:bg-rose-500/30 transition active:scale-95"
            >
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>Tap to inject love (+20%)</span>
            </button>

            {gaugeValue >= 100 && (
              <div className="pt-2 text-xs text-emerald-400 font-mono animate-in zoom-in-95 duration-300">
                ⚠️ MAXIMUM CAPACITY EXCEEDED. <br />
                <span className="text-zinc-400 font-sans">
                  The servers cannot hold this much adoration.
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setStep(4)}
            disabled={gaugeValue < 100}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 transition active:scale-[0.98] disabled:opacity-30"
          >
            <span>Proceed to Vault →</span>
          </button>
        </main>
      )}

      {/* STEP 4: The Halfway Surprise — Decrypt the Hidden Cipher */}
      {step === 4 && (
        <main className="relative z-10 w-full max-w-sm my-auto text-left space-y-5 animate-in fade-in zoom-in-95 duration-500">
          {/* Fake alert header */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono text-rose-300 uppercase tracking-wider">
              Wait... there&apos;s one more thing.
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              The Classified Transmission
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Locked with 256-bit encryption for {recipient}.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-black/40 p-6 space-y-4 backdrop-blur-md">
            {!decrypted ? (
              <div className="space-y-4 text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-xl text-zinc-400">
                  <Lock className="h-5 w-5" />
                </div>
                <p className="font-mono text-xs text-zinc-500">
                  CIPHER: 7F9A-SECRET-LOVE-NOTE
                </p>
                <button
                  onClick={() => {
                    setDecrypted(true);
                    spawnHearts();
                  }}
                  className="w-full rounded-2xl bg-white py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition"
                >
                  Decrypt note
                </button>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-500">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block">
                  Decrypted Transmission
                </span>
                <p className="font-serif text-lg text-white leading-relaxed font-normal italic">
                  &ldquo;Out of 8 billion people on this spinning rock, with all our flaws
                  and chaotic days, I would choose you in every single lifetime.
                  Without hesitation. In a heartbeat.&rdquo;
                </p>
                <div className="pt-2 text-right">
                  <span className="text-[11px] font-mono text-zinc-500">
                    — {sender}
                  </span>
                </div>
              </div>
            )}
          </div>

          {decrypted && (
            <button
              onClick={() => setStep(5)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 transition active:scale-[0.98]"
            >
              <span>See the final reveal →</span>
            </button>
          )}
        </main>
      )}

      {/* STEP 5: The Emotional Climax & Keepsake Receipt */}
      {step === 5 && (
        <main className="relative z-10 w-full max-w-sm my-auto text-center space-y-5 animate-in zoom-in-95 duration-500">
          {/* Polaroid / Keepsake Certificate */}
          <div className="rounded-[32px] border border-rose-500/30 bg-gradient-to-b from-[#141418] via-[#0d0d10] to-[#070709] p-7 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Certificate of Permanence
              </span>
              <span className="text-xs">✨</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl text-white font-normal leading-tight">
                You are my favorite place on Earth.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Not just on the easy, golden days. On the tired days, the quiet days,
                and every day in between. This tiny website exists forever on the internet
                just for you.
              </p>
            </div>

            {/* Official Stamps */}
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

            {/* Actions to send back */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-zinc-400 text-center font-light">
                Send {sender} your reaction right now:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={smsLink}
                  onClick={spawnHearts}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white py-3 px-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Text</span>
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={spawnHearts}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-3 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-100 hover:border-white/30 hover:bg-white/[0.08] transition"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 text-[11px] font-mono text-zinc-500">
            <button
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-1 hover:text-zinc-300 transition"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Replay website</span>
            </button>
            <span>•</span>
            <span>Screenshot to keep forever 📸</span>
          </div>
        </main>
      )}

      {/* Tiny discreet footer */}
      <footer className="relative z-10 w-full text-center text-[10px] font-mono text-zinc-600">
        One tiny thing.
      </footer>
    </div>
  );
}
