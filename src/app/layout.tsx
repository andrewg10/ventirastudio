import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

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
        {/* Cormorant Garamond */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Google Ads — AW-17916020292 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17916020292" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17916020292');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
