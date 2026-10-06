import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theplugd.com"),
  title: "Plugd — Premium Digital Dating & Attraction Playbooks",
  description:
    "Two practical, deeply researched digital playbooks. How to Get the Man of Your Dreams (For Women) & How to Date the Hottest Women (For Men).",
  openGraph: {
    title: "Plugd — Premium Digital Dating & Attraction Playbooks",
    description:
      "Two practical, deeply researched digital playbooks. Slide-based lessons, actionable frameworks, and tactical scripts.",
    url: "https://theplugd.com",
    siteName: "Plugd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugd — Premium Digital Dating & Attraction Playbooks",
    description: "Dating is a skill. Two complete playbooks for attraction and relationships.",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32" },
      { url: "/icon.png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} min-h-screen bg-[#FAF8F5] text-[#0E0E10] selection:bg-[#FF5500] selection:text-white antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
