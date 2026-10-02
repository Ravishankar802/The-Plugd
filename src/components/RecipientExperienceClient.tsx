"use client";

import { useState } from "react";
import { Check, Heart, Sparkles, Send, Lock, ArrowRight } from "lucide-react";

interface RecipientExperienceProps {
  gift: {
    slug: string;
    target: string;
    recipientName: string | null;
    senderName: string | null;
    customNote: string | null;
    responseChoice: string | null;
  };
}

export default function RecipientExperienceClient({
  gift,
}: RecipientExperienceProps) {
  const isHer = gift.target === "her";
  const [unsealed, setUnsealed] = useState(Boolean(gift.responseChoice));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(
    gift.responseChoice ? -1 : 0
  );
  const [customChoice, setCustomChoice] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [confirmedChoice, setConfirmedChoice] = useState<string | null>(
    gift.responseChoice
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const herOptions = [
    {
      emoji: "🍷",
      title: "Dinner date — anywhere I point at",
      desc: "Zero budget arguments. You pick me up, open the car door, and pay.",
    },
    {
      emoji: "💆‍♀️",
      title: "30-minute uninterrupted massage",
      desc: "Shoulders, back, or feet. Hands cannot stop before timer rings.",
    },
    {
      emoji: "👑",
      title: "Admit I was 100% right",
      desc: "Look me dead in the eye and say 'You were right, I was wrong.'",
    },
    {
      emoji: "🛌",
      title: "Cancel all plans tonight",
      desc: "Stay in bed, warm takeout, and watch whatever show I pick all night.",
    },
  ];

  const himOptions = [
    {
      emoji: "🏎️",
      title: "Late night drive — just us",
      desc: "Windows cracked, favorite music, no destination, just driving.",
    },
    {
      emoji: "🍕",
      title: "Homemade feast of my choice",
      desc: "I pick my comfort meal, you cook it with love, zero complaints.",
    },
    {
      emoji: "🎮",
      title: "2 hours of guilt-free peace",
      desc: "Gaming or doing whatever without any side-eye or interruptions.",
    },
    {
      emoji: "😴",
      title: "No-talking recharge night",
      desc: "Takeout in bed, total relaxation, zero questions required.",
    },
  ];

  const options = isHer ? herOptions : himOptions;
  const senderDisplay = gift.senderName || (isHer ? "Your man" : "Your girl");
  const recipientDisplay = gift.recipientName || "You";

  async function handleConfirmChoice() {
    let finalChoice = "";
    if (isCustom) {
      if (!customChoice.trim()) return;
      finalChoice = customChoice.trim();
    } else if (selectedIdx !== null && selectedIdx >= 0) {
      finalChoice = options[selectedIdx].title;
    }

    if (!finalChoice) return;

    setIsSubmitting(true);
    setConfirmedChoice(finalChoice);

    try {
      await fetch(`/api/g/${gift.slug}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice: finalChoice }),
      });
    } catch (err) {
      console.error("Failed to save response:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Pre-filled text to send back to sender
  const textBody = isHer
    ? `I just opened your link and claimed my pass: "${confirmedChoice}". Don't be late 😉`
    : `Just opened your link. Claiming this tonight: "${confirmedChoice}". See you soon.`;

  const smsLink = `sms:?&body=${encodeURIComponent(textBody)}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    textBody
  )}`;

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between items-center px-4 py-8 sm:px-6 sm:py-12 selection:bg-rose-500 selection:text-white">
      {/* Background ambient warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-10 left-1/2 -translate-x-1/2 h-96 w-[95vw] max-w-lg rounded-full bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent blur-3xl"
      />

      {/* Tiny discreet watermark */}
      <div className="w-full max-w-sm flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
        <span>Private Pass</span>
        <span>•</span>
        <span>No Expire</span>
      </div>

      {/* PHASE 1: The Sealed Note (if not opened yet) */}
      {!unsealed && (
        <div className="relative z-10 w-full max-w-sm my-auto text-center space-y-6 animate-in fade-in duration-500">
          <div className="relative mx-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 text-2xl">
              💌
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-rose-400">
                Incoming From {senderDisplay}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                For {recipientDisplay}
              </h1>
            </div>

            {gift.customNote && (
              <div className="rounded-2xl bg-black/40 border border-white/5 p-4 text-xs sm:text-sm text-zinc-300 italic">
                &ldquo;{gift.customNote}&rdquo;
              </div>
            )}

            <button
              onClick={() => setUnsealed(true)}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 transition active:scale-[0.98]"
            >
              <span>Tap to open pass</span>
              <Sparkles className="h-4 w-4 text-rose-500 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-zinc-500 font-mono">
            Open this on your phone in private.
          </p>
        </div>
      )}

      {/* PHASE 2: The Interactive Dilemma (Unsealed) */}
      {unsealed && !confirmedChoice && (
        <div className="relative z-10 w-full max-w-sm my-auto space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-rose-400">
              <Lock className="h-3 w-3" />
              <span>{isHer ? "1 Unrestricted Pass" : "1 Guilt-Free Coupon"}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {isHer
                ? "Tonight, you hold all the leverage."
                : "Granted by your girl."}
            </h1>
            <p className="text-xs text-zinc-400 font-light">
              {isHer
                ? "Pick one demand. He cannot say no."
                : "Pick your move. She has to agree."}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {options.map((opt, idx) => {
              const isSelected = !isCustom && selectedIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsCustom(false);
                    setSelectedIdx(idx);
                  }}
                  className={`w-full text-left rounded-2xl p-3.5 transition-all duration-200 border ${
                    isSelected
                      ? "border-rose-500/80 bg-rose-500/10 shadow-[0_0_25px_rgba(244,63,94,0.18)]"
                      : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0 mt-0.5">{opt.emoji}</span>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isSelected ? "text-rose-100" : "text-zinc-200"
                          }`}
                        >
                          {opt.title}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-400 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`h-4 w-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-rose-500 bg-rose-500 text-white"
                          : "border-zinc-700"
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Custom option */}
            <div
              onClick={() => setIsCustom(true)}
              className={`rounded-2xl p-3.5 transition-all duration-200 border cursor-pointer ${
                isCustom
                  ? "border-rose-500/80 bg-rose-500/10 shadow-[0_0_25px_rgba(244,63,94,0.18)]"
                  : "border-white/5 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-medium text-zinc-200">
                  ✍️ Write your own custom {isHer ? "demand" : "reward"}
                </span>
                <div
                  className={`h-4 w-4 rounded-full border shrink-0 flex items-center justify-center ${
                    isCustom
                      ? "border-rose-500 bg-rose-500 text-white"
                      : "border-zinc-700"
                  }`}
                >
                  {isCustom && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
              </div>
              {isCustom && (
                <input
                  type="text"
                  value={customChoice}
                  onChange={(e) => setCustomChoice(e.target.value)}
                  placeholder={
                    isHer
                      ? "e.g. You clean the entire apartment while I nap"
                      : "e.g. Uninterrupted watch party of my games"
                  }
                  maxLength={100}
                  autoFocus
                  className="w-full mt-2 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                />
              )}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <button
              onClick={handleConfirmChoice}
              disabled={isSubmitting || (isCustom && !customChoice.trim())}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-xl hover:bg-zinc-200 transition active:scale-[0.98] disabled:opacity-50"
            >
              <span>{isHer ? "Lock in demand →" : "Claim pass →"}</span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: Locked In / Confirmed State */}
      {confirmedChoice && (
        <div className="relative z-10 w-full max-w-sm my-auto text-center space-y-6 animate-in zoom-in-95 duration-400">
          <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 to-black/40 p-7 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/30 text-2xl text-rose-400">
              🔒
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-rose-400">
                Official Receipt
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                {isHer ? "Demand Locked In." : "Pass Claimed."}
              </h2>
              <p className="text-xs text-zinc-400">
                {isHer
                  ? `${senderDisplay} cannot back out now.`
                  : `${senderDisplay} has been put on notice.`}
              </p>
            </div>

            {/* Display Selected Option */}
            <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                Your Selection
              </span>
              <p className="text-sm font-medium text-rose-200">
                {confirmedChoice}
              </p>
            </div>

            {/* Action to notify sender */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-zinc-400">
                Send it to {senderDisplay} right now:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={smsLink}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white py-3 px-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Text</span>
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-3 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-100 hover:border-white/30 hover:bg-white/[0.08] transition"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-zinc-500">
            Screenshot or send the receipt to make it legally binding.
          </p>
        </div>
      )}

      {/* Footer watermark */}
      <div className="w-full text-center text-[10px] font-mono text-zinc-600">
        One tiny thing.
      </div>
    </div>
  );
}
