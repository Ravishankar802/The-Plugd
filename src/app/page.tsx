import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between px-5 py-8 sm:px-8 sm:py-12 bg-[#09090b] text-[#f4f4f5] overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* Background ambient warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[90vw] max-w-[640px] rounded-full bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent blur-3xl"
      />

      {/* Tiny Brand Wordmark */}
      <header className="relative z-10 w-full flex justify-center items-center">
        <span className="text-[13px] font-mono tracking-[0.24em] text-zinc-500 uppercase">
          plugd
        </span>
      </header>

      {/* Core Decision Hero */}
      <section className="relative z-10 w-full max-w-xl mx-auto my-auto py-10 flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-zinc-100 leading-tight">
          Who are you?
        </h1>

        <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light tracking-tight max-w-sm">
          Pick one. We&apos;ll take it from there.
        </p>

        {/* The Two Decisions */}
        <div className="mt-10 sm:mt-12 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
          {/* Male Choice */}
          <Link
            href="/for-her"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl sm:text-4xl filter saturate-[0.9] transition-transform duration-300 group-hover:scale-110">
                👨
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">
                Male
              </span>
            </div>

            <div className="mt-8 sm:mt-10">
              <span className="inline-flex items-center gap-2 text-base sm:text-lg font-medium tracking-tight text-zinc-100 group-hover:text-white">
                Get this for your girl
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 text-zinc-400 group-hover:text-white" />
              </span>
            </div>
          </Link>

          {/* Female Choice */}
          <Link
            href="/for-him"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl sm:text-4xl filter saturate-[0.9] transition-transform duration-300 group-hover:scale-110">
                👩
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">
                Female
              </span>
            </div>

            <div className="mt-8 sm:mt-10">
              <span className="inline-flex items-center gap-2 text-base sm:text-lg font-medium tracking-tight text-zinc-100 group-hover:text-white">
                Get this for your man
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 text-zinc-400 group-hover:text-white" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Tiny Footer Line */}
      <footer className="relative z-10 w-full text-center pb-2">
        <p className="text-xs text-zinc-500 font-normal tracking-wide">
          One tiny thing. Send it to someone you like.
        </p>
      </footer>
    </main>
  );
}
