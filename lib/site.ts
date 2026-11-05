export const site = {
  name: "Toys Store Vittoria",
  year: "2026",
  url: "https://catalogo.toysstorevittoria.it",
  shopUrl: "https://toysstorevittoria.it",
  privacyUrl: "https://www.toysstorevittoria.it/policies/privacy-policy",
  pdfPath: "/catalogo-natale-2026.pdf",
  logoPath: "/logo-natalizio.png",
  description:
    "Sfoglia il catalogo di Natale 2026 di Toys Store Vittoria. Scopri idee regalo e giocattoli, acquista online o vieni a trovarci in Via Nino Bixio 464 a Vittoria (RG).",
  address: {
    streetAddress: "Via Nino Bixio, 464",
    postalCode: "97019",
    locality: "Vittoria",
    region: "RG",
    country: "IT",
    telephone: "338 9646244",
    internationalTelephone: "+393389646244",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Via+Nino+Bixio+464+97019+Vittoria+RG"
  }
} as const;

export function trackEvent(name: string, detail?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("catalogo:analytics", { detail: { name, ...detail } }));

  if (
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" &&
    window.__catalogAnalyticsConsent === true &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", name, detail);
  }
}

declare global {
  interface Window {
    __catalogAnalyticsConsent?: boolean;
    gtag?: (command: string, eventName: string, parameters?: Record<string, string | number>) => void;
  }
}
