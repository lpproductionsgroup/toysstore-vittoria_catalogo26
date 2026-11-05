import type { Metadata } from "next";
import { Benefits } from "@/components/Benefits";
import { CatalogPreview } from "@/components/CatalogPreview";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ShopCTA } from "@/components/ShopCTA";
import { StoreLocation } from "@/components/StoreLocation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catalogo Natale 2026 | Toys Store Vittoria - Vittoria RG",
  description: site.description,
  alternates: { canonical: `${site.url}/` }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: `${site.url}/`, inLanguage: "it-IT" },
    {
      "@type": "ToyStore",
      "@id": `${site.url}/#store`,
      name: site.name,
      url: site.shopUrl,
      telephone: site.address.internationalTelephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.streetAddress,
        addressLocality: site.address.locality,
        postalCode: site.address.postalCode,
        addressRegion: site.address.region,
        addressCountry: site.address.country
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main>
        <Hero />
        <CatalogPreview />
        <Benefits />
        <StoreLocation />
        <ShopCTA />
      </main>
      <Footer />
    </>
  );
}
