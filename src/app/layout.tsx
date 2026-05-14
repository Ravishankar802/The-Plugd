import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://theplugd.com"),
  title: "Plugd — Get paid to share links",
  description: "Share your referral link. Earn $1 for every person who joins.",
  openGraph: {
    title: "Plugd — Get paid to share links",
    description: "Share your referral link. Earn $1 for every person who joins.",
    url: "https://theplugd.com",
    siteName: "Plugd",
    images: [
      {
        url: "https://theplugd.com/og-v9.png",
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugd — Get paid to share links",
    description: "Share your referral link. Earn $1 for every person who joins.",
    images: ["https://theplugd.com/og-v9.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.png",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import RefTracker from "@/components/RefTracker";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <Suspense fallback={null}>
            <RefTracker />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
