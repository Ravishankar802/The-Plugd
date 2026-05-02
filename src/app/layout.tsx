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
  title: "Plugd — Get discovered by X builders, founders and creators",
  description: "$1 to get listed and get more followers, impressions and growth on X.",
  openGraph: {
    title: "Plugd — Get more followers, more impressions, more growth on X. All for just $1.",
    description: "$1 to get listed and get more followers, impressions and growth on X.",
    url: "https://the-plugd.vercel.app",
    siteName: "Plugd",
    images: [
      {
        url: "https://the-plugd.vercel.app/og-v8.png",
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugd — Get more followers, more impressions, more growth on X. All for just $1.",
    description: "Get more followers, more impressions, more growth on X. All for just $1.",
    images: ["https://the-plugd.vercel.app/og-v8.png"],
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
