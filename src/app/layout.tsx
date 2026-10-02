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
  title: "Plugd — One tiny thing. Send it to someone you like.",
  description: "A tiny digital experience you send to your partner. $2.99. Buy it, get your link, send it to them.",
  openGraph: {
    title: "Plugd — One tiny thing. Send it to someone you like.",
    description: "A tiny digital experience you send to your partner. $2.99. Buy it, get your link, send it to them.",
    url: "https://theplugd.com",
    siteName: "Plugd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plugd — One tiny thing. Send it to someone you like.",
    description: "A tiny digital experience you send to your partner.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-rose-500 selection:text-white antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
