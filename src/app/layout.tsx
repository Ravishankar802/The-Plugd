import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ravi",
  description: "Personal Portfolio & Media Archives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Doto:wght@400..900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Tektur:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-[#e2e2e6] min-h-screen w-full antialiased selection:bg-[#d3170a]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
