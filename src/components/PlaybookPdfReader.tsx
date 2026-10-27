"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Maximize2, Minimize2, BookOpen } from "lucide-react";

interface PlaybookPdfReaderProps {
  courseSlug: string;
  courseTitle: string;
  pdfUrl: string;
}

export default function PlaybookPdfReader({
  courseSlug,
  courseTitle,
  pdfUrl,
}: PlaybookPdfReaderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Record reading activity so returning to overview displays "Continue Reading"
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`plugd_started_${courseSlug}`, "true");
        localStorage.setItem(`plugd_last_read_${courseSlug}`, new Date().toISOString());
      } catch (err) {
        console.warn("[PDF_READER_LOCALSTORAGE_ERR]", err);
      }
    }
  }, [courseSlug]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#1c1917] overflow-hidden select-none">
      {/* Top Header Bar */}
      <header className="h-14 bg-[#0f172a] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between text-white shrink-0 z-20 shadow-md">
        {/* Left: Back to Playbook */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${courseSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-[13px] font-semibold transition-colors shadow-2xs"
            title="Return to Playbook Overview"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Playbook</span>
          </Link>
          <span className="hidden sm:inline text-xs text-slate-500">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium truncate max-w-sm">
            <BookOpen className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{courseTitle}</span>
          </span>
        </div>

        {/* Center: Title on Mobile */}
        <div className="sm:hidden text-xs font-semibold text-slate-300 truncate max-w-[150px]">
          {courseTitle}
        </div>

        {/* Right: Actions (Download & Fullscreen) */}
        <div className="flex items-center gap-2">
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-xs transition-colors"
            title="Download complete PDF book"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Download PDF</span>
          </a>

          <button
            onClick={toggleFullscreen}
            type="button"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      {/* Main Full-Height Embedded PDF Reader (Renders Native Chromium/Edge PDF Viewer with Thumbnails & Outline Sidebar) */}
      <main className="flex-1 w-full h-[calc(100vh-56px)] bg-[#262626] relative">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1`}
          className="w-full h-full border-none"
          title={courseTitle}
        />
      </main>
    </div>
  );
}
