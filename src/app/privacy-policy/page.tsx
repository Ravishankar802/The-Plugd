import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-zinc-500">
            Last updated: October 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-zinc-400 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">1. What We Collect</h2>
            <p>
              Plugd operates on minimal data collection. We do not require accounts or passwords. We only collect the details you voluntarily input to personalize your private link (optional sender name, recipient name, or note) and standard payment details processed securely by third-party payment gateways.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">2. How Data is Used</h2>
            <p>
              Your data is used solely to generate and serve the private shareable experience link to the recipient and store their interactive selection. We never sell, rent, or monetize your information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">3. Security</h2>
            <p>
              All links and interactions are transmitted over HTTPS with industry-standard 256-bit encryption. Payment processing is tokenized directly through certified PCI-DSS compliant providers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-white">4. Contact</h2>
            <p>
              For any questions regarding privacy, contact support@theplugd.com.
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
