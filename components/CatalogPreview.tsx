import { Download, Sparkles } from "lucide-react";
import { CatalogViewer } from "@/components/CatalogViewer";
import { site } from "@/lib/site";

export function CatalogPreview() {
  return (
    <section id="catalogo" className="container scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Un mondo da scoprire</p>
        <h2 className="serif mt-4 text-4xl font-medium leading-[1.05] text-[var(--green)] sm:text-5xl">Il catalogo di Natale 2026</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">Lasciati ispirare pagina dopo pagina: il catalogo natalizio Toys Store Vittoria è pronto da sfogliare, con tutto il piacere di una storia da aprire insieme.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a className="button button-outline" href={site.pdfPath} download="catalogo-natale-2026.pdf"><Download size={16} /> Scarica il PDF</a>
        </div>
      </div>
      <div className="mt-10 sm:mt-14">
        <CatalogViewer />
      </div>
      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[var(--muted)]">
        <Sparkles size={15} className="shrink-0 text-[var(--gold)]" /> Catalogo informativo. Gli acquisti si concludono sullo shop ufficiale.
      </p>
    </section>
  );
}
