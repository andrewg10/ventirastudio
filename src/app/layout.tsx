import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// NOTE: Cormorant Garamond is loaded via Google Fonts CSS in globals.css
// as a fallback-safe approach. next/font/google requires network access at build time.

export const metadata: Metadata = {
  title: "Ventira Studio — Agenție AI din România",
  description:
    "Construim agenți AI care automatizează rezervările, contabilitatea și suportul pentru afaceri din România.",
  keywords: ["agentie AI Romania", "automatizare AI", "AI receptionist", "Ventira Studio"],
  openGraph: {
    title: "Ventira Studio — Agenție AI din România",
    description: "Agenți AI care lucrează non-stop pentru afacerea ta.",
    url: "https://ventirastudio.ro",
    siteName: "Ventira Studio",
    locale: "ro_RO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={GeistMono.variable}>
      <head>
        {/* Cormorant Garamond — loaded directly for build-time safety */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
