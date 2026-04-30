"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SuccessPage() {
  const tweetText = encodeURIComponent(
    "Just got listed on The Plugd — the directory for X builders and creators.\n\nFind me + 100s of others → theplugd.com"
  );

  return (
    <main className="flex-1 flex flex-col">
      <Header />
      
      <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-8 animate-bounce">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">You&apos;re on The Plugd!</h2>
        <p className="text-muted text-lg mb-8 max-w-md mx-auto">
          Your account has been successfully listed. Share it with your network and help others find you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            target="_blank"
            className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Share your listing
          </Link>
          <Link
            href="/"
            className="bg-[#111] hover:bg-[#1a1a1a] border border-border text-white font-bold px-8 py-4 rounded-xl transition-all"
          >
            Back to Directory
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
