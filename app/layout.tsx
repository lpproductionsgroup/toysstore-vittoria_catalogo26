import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Catalogo Natale 2026 | Toys Store Vittoria - Vittoria RG",
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: `${site.url}/`,
    siteName: site.name,
    title: "Catalogo Natale 2026 | Toys Store Vittoria - Vittoria RG",
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Toys Store Vittoria — Natale 2026" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogo Natale 2026 | Toys Store Vittoria - Vittoria RG",
    description: site.description,
    images: ["/opengraph-image"]
  }
};

export const viewport: Viewport = {
  themeColor: "#123D32",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${serif.variable} ${sans.variable}`}>
      <body><AnalyticsEvents />{children}</body>
    </html>
  );
}
