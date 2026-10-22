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
  title: {
    default: "Plugd — Your next move starts here",
    template: "%s · Plugd",
  },
  description:
    "Explore practical Playbooks for AI, online businesses, freelancing, digital products, and more.",
  openGraph: {
    title: "Plugd — Your next move starts here",
    description:
      "Explore practical Playbooks for AI, online businesses, freelancing, digital products, and more.",
    url: "https://theplugd.com",
    siteName: "Plugd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugd — Your next move starts here",
    description: "Explore practical Playbooks for AI, online businesses, freelancing, digital products, and more.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} min-h-screen bg-[#f6f6f4] text-[#1c1917] selection:bg-[#2563eb] selection:text-white antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
