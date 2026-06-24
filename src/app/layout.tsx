import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Ventira Studio — Agenție AI din România",
  description:
    "Construim agenți AI care automatizează rezervările, contabilitatea și suportul pentru afaceri din România.",
  keywords: ["agentie AI Romania", "automatizare AI", "AI receptionist", "Ventira Studio"],
  metadataBase: new URL("https://www.ventirastudio.ro"),
  openGraph: {
    title: "Ventira Studio — Agenție AI din România",
    description: "Agenți AI care lucrează non-stop pentru afacerea ta.",
    url: "https://www.ventirastudio.ro",
    siteName: "Ventira Studio",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ventira Studio — Agenție AI din România",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ventira Studio — Agenție AI din România",
    description: "Agenți AI care lucrează non-stop pentru afacerea ta.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: { index: true, follow: true },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ventira Studio",
  legalName: "Speranța Expert SRL",
  url: "https://www.ventirastudio.ro",
  logo: "https://www.ventirastudio.ro/ventira-logo-hero.png",
  email: "contact@ventirastudio.ro",
  description:
    "Agenție AI din România — construim agenți AI care automatizează rezervările, contabilitatea și suportul pentru afaceri.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "București",
    addressCountry: "RO",
  },
  areaServed: "RO",
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
          Google Consent Mode v2 — default DENIED pentru utilizatori EEA.
          Trebuie să fie primul script pe pagină, înaintea oricărui gtag/GA/Ads.
          Scripturile de tracking sunt încărcate de CookieConsent doar după accept.
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
