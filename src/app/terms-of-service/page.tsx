import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f4f4f5] px-6 py-12 flex flex-col font-sans">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-zinc-500">
            Last updated: October 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-zinc-400 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">1. Service Description</h2>
            <p>
              Plugd provides tiny, digital interactive gift experiences designed to be sent to romantic partners via unique private links.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">2. Purchases and Delivery</h2>
            <p>
              All purchases are one-time payments ($2.99 USD) granting an immediate unique private link. Links remain active and accessible on mobile and desktop web browsers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">3. Acceptable Use</h2>
            <p>
              Plugd is intended for playful, consensual, and intimate interaction between partners. Users agree not to use the service for harassment, abusive content, or illegal communications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">4. Refunds and Contact</h2>
            <p>
              Due to the immediate digital delivery nature of the experience link, purchases are generally final. If you encounter any technical defect, reach out to support@theplugd.com.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs font-mono text-zinc-500">
          Plugd — One tiny thing. Send it to someone you like.
        </div>
      </div>
    </main>
  );
}
