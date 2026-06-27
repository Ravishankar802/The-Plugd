import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="pt-8 md:pt-24 pb-0 flex flex-col items-center text-center relative overflow-hidden">
      <Link href="/" className="relative md:fixed top-0 md:top-4 left-0 md:left-6 flex justify-center md:inline-block mx-auto md:mx-0 mb-6 md:mb-0 hover:opacity-80 transition-opacity group z-50">
        <Image src="/logo.png" alt="Plugd" width={80} height={80} />
      </Link>

      <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-500 relative z-10">
        <span className="text-[#16a34a] text-xs font-bold uppercase tracking-[0.2em]">
          India&apos;s #1 Referral Marketplace
        </span>
      </div>
      <h1 
        className="text-[clamp(2.15rem,5.5vw,3.5rem)] font-[800] tracking-[-0.035em] leading-[1.1] text-foreground mb-4 relative z-10"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        Refer & Earn
      </h1>
      <p 
        className="text-muted text-[0.875rem] md:text-[1.25rem] font-normal max-w-[340px] md:max-w-2xl leading-tight md:leading-relaxed mx-auto relative z-10 px-4 mb-12"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        Share Plugd. Get paid for every successful referral.
      </p>
    </header>
  );
}
