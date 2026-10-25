import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import { ALL_PLAYBOOK_SUMMARIES } from "@/lib/playbooks-catalog";

export const dynamic = "force-dynamic";

interface ComingSoonPageProps {
  searchParams?: Promise<{
    playbook?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: ComingSoonPageProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) || {};
  const slug = resolvedSearchParams.playbook;
  const playbook = ALL_PLAYBOOK_SUMMARIES.find((p) => p.slug === slug);

  const title = playbook ? `${playbook.title} (Coming Soon) · Plugd Playbooks` : "Playbook Coming Soon · Plugd Playbooks";

  return {
    title,
    description: playbook?.description || "This Playbook is currently in production on Plugd Playbooks.",
  };
}

export default async function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
  const resolvedSearchParams = (await searchParams) || {};
  const slug = resolvedSearchParams.playbook;
  const playbook = ALL_PLAYBOOK_SUMMARIES.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-[#e7e4dd] text-[#1c1917] font-sans antialiased selection:bg-[#2563eb] selection:text-white flex flex-col justify-between">
      <div>
        <Header variant="platform" showSearch={false} />

        <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#78716c] hover:text-[#1c1917] mb-8 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Directory</span>
          </Link>

          <div className="rounded-3xl bg-white border border-[#dcd8d0] p-6 sm:p-10 shadow-[0_2px_8px_rgba(28,25,23,0.04)]">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-[#eff6ff] px-2.5 py-1 text-xs font-bold text-[#1d4ed8] tracking-tight mb-4">
              <Clock className="h-3.5 w-3.5" />
              <span>Coming Soon · In Production</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1c1917] leading-tight">
              {playbook ? playbook.title : "Playbook in Development"}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#57534e] leading-relaxed">
              {playbook ? playbook.description : "This Playbook is currently scheduled for publication."}
            </p>

            <div className="my-8 border-t border-[#f0eee9]" />

            <div className="rounded-2xl bg-[#f7f8fa] border border-[#e7e5e4] p-5 sm:p-6 text-sm text-[#44403c] leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#1c1917]">
                <Sparkles className="h-4 w-4 text-[#2563eb]" />
                <span>Curriculum in Development</span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#57534e]">
                We are actively developing the curriculum, presentation slide decks, and actionable written guides for this Playbook. Full access will be available upon publication.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#1c1917] hover:bg-[#2563eb] text-white px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-150 shadow-xs"
              >
                Browse Available Playbooks
              </Link>
            </div>
          </div>
        </main>
      </div>

      <footer className="border-t border-[#dcd8d0] bg-[#ded9d0] py-8 text-xs text-[#57534e]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1c1917]">Plugd Playbooks</span>
            <span>·</span>
            <span>Outcome-focused Playbooks</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/terms-of-service" className="hover:text-[#1c1917] transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#1c1917] transition-colors">
              Privacy
            </Link>
            <a href="mailto:ravx003@gmail.com" className="hover:text-[#1c1917] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
