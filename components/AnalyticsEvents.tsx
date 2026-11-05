"use client";

import { useEffect } from "react";
import { site, trackEvent } from "@/lib/site";

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);

      if (url.origin === new URL(site.shopUrl).origin) trackEvent("catalog_shop_click");
      if (url.pathname === site.pdfPath && link.hasAttribute("download")) trackEvent("catalog_pdf_download");
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
