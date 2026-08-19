import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
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

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theplugd.com"),
  title: "Plugd — Creator Support Platform",
  description: "Create a page. Add the things you're working toward. Share it with your people. 0% Plugd platform fee.",
  openGraph: {
    title: "Plugd — Creator Support Platform",
    description: "Create a page. Add the things you're working toward. Share it with your people. 0% Plugd platform fee.",
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
    title: "Plugd — Creator Support Platform",
    description: "Create a page. Add the things you're working toward. Share it with your people. 0% Plugd platform fee.",
    images: ["https://theplugd.com/og-v9.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32' },
      { url: '/favicon.png', sizes: '16x16' },
    ],
    apple: '/favicon.png',
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300`}>
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
