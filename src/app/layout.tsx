import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plugd",
  description: "Coming Soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#ffffff",
          color: "#000000",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {children}
      </body>
    </html>
  );
}
