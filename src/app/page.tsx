"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Gift, Share2, Shield, Heart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-500 relative overflow-hidden">
      
      {/* Subtle premium gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Landing Header */}
      <header className="sticky top-0 left-0 right-0 h-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 z-50 flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity">
          <Image src="/logo.png" alt="Plugd" width={40} height={40} />
          <span className="font-bold text-xl text-zinc-100 tracking-tight">Plugd</span>
        </Link>

        <Link 
          href="/dashboard"
          className="h-10 px-5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:text-zinc-100 text-zinc-300 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer"
        >
          Dashboard
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 md:pt-28 pb-16 text-center space-y-8 font-sans">
        
        {/* Fee Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-bold text-orange-500">
          <Sparkles size={13} className="animate-pulse" />
          <span>0% Plugd platform fee on supporter payments</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-zinc-100 tracking-tight leading-[1.08] max-w-3xl mx-auto">
            Get supported for what you <span className="text-orange-500">actually want</span>.
          </h1>
          <p className="text-zinc-400 text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Create your page, add the goals you're working toward, and share it with your audience. Receive 100% of supporter payments directly.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto h-14 px-8 bg-orange-500 text-black font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10 cursor-pointer"
          >
            <span>Create your Plugd</span>
            <ArrowRight size={16} strokeWidth={3} />
          </Link>
          
          <Link
            href="/@ravi"
            className="w-full sm:w-auto h-14 px-8 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-zinc-100 rounded-xl text-sm font-bold flex items-center justify-center transition-colors"
          >
            See an example
          </Link>
        </div>
      </section>

      {/* Explainer Features grid */}
      <section className="relative z-10 max-w-5xl w-full mx-auto px-6 py-16 md:py-24 border-t border-zinc-900/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Add Goal */}
          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-zinc-100 text-sm">1. Add what you want</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                Coffee, creator gear, tech tools, a trip to Ladakh, or your biggest dreams. You decide what goals to show.
              </p>
            </div>
          </div>

          {/* Share */}
          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-zinc-100 text-sm">2. Share your Plugd</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                Add your unique URL (e.g. `theplugd.com/@ravi`) to your Instagram bio, X bio, or YouTube description.
              </p>
            </div>
          </div>

          {/* Get Paid */}
          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-zinc-100 text-sm">3. Get supported directly</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                Supporters pay you using your own UPI QR, UPI ID, or bank details. We take 0% commission and never touch the money.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Mission statement bar */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-16 text-center border-t border-zinc-900/60 font-sans space-y-3">
        <h3 className="text-lg md:text-xl font-bold text-zinc-300">India-first creator support. Direct and free.</h3>
        <p className="text-zinc-500 text-xs leading-relaxed max-w-md mx-auto font-medium">
          Support your favorite creators directly. No commissions, no middle-men. Subscription options will be introduced separately.
        </p>
      </section>

      {/* Landing Footer */}
      <footer className="mt-auto border-t border-zinc-900 py-8 text-center text-[10px] text-zinc-600 space-y-1 bg-zinc-950 relative z-10">
        <p className="font-bold">© {new Date().getFullYear()} Plugd Inc. All rights reserved.</p>
        <p className="font-semibold text-zinc-700">0% Plugd platform fee on supporter payments.</p>
      </footer>

    </div>
  );
}
