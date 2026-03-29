import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

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
        {/*
          Google Consent Mode v2 — default DENIED for EEA users.
          Must be the FIRST script on the page, before any gtag/GA/Ads loads.
          Actual tracking scripts are loaded by CookieConsent only after user accepts.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage:      'denied',
                ad_storage:             'denied',
                ad_user_data:           'denied',
                ad_personalization:     'denied',
                wait_for_update:        500,
                region: ['RO','AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','SE','SI','SK']
              });
            `,
          }}
        />
      </head>
      <body>
        {children}
        {/* Cookie banner — loads tracking scripts only after consent */}
        <CookieConsent />
      </body>
    </html>
  );
}
