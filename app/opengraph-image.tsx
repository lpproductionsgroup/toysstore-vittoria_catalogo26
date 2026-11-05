import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "Toys Store Vittoria — Catalogo Natale 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo-natalizio.png"));
  const logoDataUrl = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#123D32", color: "#FFF8EB", fontFamily: "serif" }}>
      <div style={{ display: "flex", width: "90%", height: "82%", alignItems: "center", gap: 64, border: "1px solid #D6AD60", borderRadius: 28, padding: 48 }}>
        <img src={logoDataUrl} alt="" width={330} height={330} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ color: "#D6AD60", fontSize: 24, letterSpacing: 8, textTransform: "uppercase" }}>Natale {site.year}</span>
          <span style={{ fontSize: 54, lineHeight: 1.05 }}>La magia del Natale</span>
          <span style={{ fontSize: 32, color: "#E5D9C2" }}>Toys Store Vittoria</span>
          <span style={{ fontFamily: "sans-serif", fontSize: 20, color: "#D6AD60" }}>catalogo.toysstorevittoria.it</span>
        </div>
      </div>
    </div>,
    size
  );
}
