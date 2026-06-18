import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="pt-8 md:pt-24 pb-0 flex flex-col items-center text-center relative overflow-hidden">
      <Link href="/" className="relative md:fixed top-0 md:top-4 left-0 md:left-6 flex justify-center md:inline-block mx-auto md:mx-0 mb-6 md:mb-0 hover:opacity-80 transition-opacity group z-50">
        <Image src="/logo.png" alt="Plugd" width={80} height={80} />
      </Link>

      <div className="w-full flex items-center justify-center mb-8 animate-in fade-in slide-in-from-top-2 duration-500 relative z-10">
        <div className="inline-flex items-center bg-pill/80 backdrop-blur-sm border border-border/80 rounded-full px-6 py-3 shadow-sm hover:border-border/100 hover:bg-pill transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,240,210,0.35)_50%,transparent_70%)] -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />
          
          <div className="flex items-center gap-2 relative z-10">
            <span className="text-[0.65rem] text-muted uppercase tracking-[0.12em] font-bold">Average earning</span>
            <span className="text-[0.75rem] font-bold text-foreground">₹14,000/Day</span>
          </div>
          
          <div className="w-[1px] h-4 bg-border/60 mx-4 md:mx-6 shrink-0 relative z-10" />
          
          <div className="flex items-center gap-2 relative z-10">
            <span className="text-[0.65rem] text-muted uppercase tracking-[0.12em] font-bold">Total Payouts</span>
            <span className="text-[0.75rem] font-bold text-foreground">₹100Cr+</span>
          </div>
        </div>
      </div>
      <h1 
        className="text-[clamp(2.15rem,5.5vw,3.5rem)] font-[800] tracking-[-0.035em] leading-[1.1] text-foreground mb-4 relative z-10"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        Dream Big. <br className="md:hidden" /> Earn Big.
      </h1>
      <p 
        className="text-muted text-[0.875rem] md:text-[1.25rem] font-normal max-w-[340px] md:max-w-2xl leading-tight md:leading-relaxed mx-auto relative z-10 px-4 mb-12"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        Share Plugd. Earn for every person who joins.
      </p>
    </header>
  );
}
