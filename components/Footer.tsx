import { ArrowUpRight, MapPin, Phone, Sparkles } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[#102f27] text-white">
      <div className="container flex flex-col gap-7 py-9 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="serif mb-1 flex items-center gap-2 text-2xl"><Sparkles size={16} className="text-[var(--gold)]" /> Toys Store Vittoria</p>
          <p className="m-0 text-xs text-white/65">La magia del Natale, tutta da sfogliare.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/80" aria-label="Link footer">
          <a className="hover:text-white" href="#catalogo">Catalogo Natale 2026</a>
          <a className="hover:text-white" href="#negozio">Dove siamo</a>
          <a className="inline-flex items-center gap-1 hover:text-white" href={site.shopUrl} target="_blank" rel="noopener noreferrer">
            Visita il nostro shop <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a className="hover:text-white" href={site.privacyUrl} target="_blank" rel="noopener noreferrer">Privacy policy</a>
        </nav>
      </div>
      <div className="container flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/75 sm:flex-row sm:justify-between">
        <span className="inline-flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" /> {site.address.streetAddress} · {site.address.postalCode} {site.address.locality} ({site.address.region})</span>
        <a className="inline-flex items-center gap-2 hover:text-white" href={`tel:${site.address.internationalTelephone}`}><Phone size={14} className="text-[var(--gold)]" /> {site.address.telephone}</a>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-4 text-[.68rem] text-white/50">© {site.year} Toys Store Vittoria. Tutti i diritti riservati. -- Developed by LP PRODUCTIONS GROUP - Lorenzo Perucci</div>
      </div>
    </footer>
  );
}
