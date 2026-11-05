import { MapPin, Phone, Store } from "lucide-react";
import { site } from "@/lib/site";

export function StoreLocation() {
  return (
    <section id="negozio" className="scroll-mt-24 border-y border-[#123d3210] bg-white/55 py-16 sm:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-[1fr_.85fr]">
        <div className="max-w-2xl">
          <p className="eyebrow">Ti aspettiamo a Vittoria</p>
          <h2 className="serif mt-4 text-4xl font-medium leading-tight text-[var(--green)] sm:text-5xl">Vieni a trovarci anche in negozio!</h2>
          <p className="mt-5 text-base leading-8 text-[var(--muted)]">
            La magia del Natale ti aspetta anche da Toys Store Vittoria! Vieni a trovarci nel nostro negozio fisico a Vittoria, in provincia di Ragusa, per scoprire tante idee regalo e giocattoli per grandi e piccoli.
          </p>
        </div>
        <div className="rounded-3xl border border-[#d6ad6060] bg-[var(--cream)] p-6 shadow-[0_20px_60px_#193b2b10] sm:p-9">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--green)] text-[var(--gold)]"><Store size={25} aria-hidden="true" /></span>
            <h3 className="serif m-0 text-3xl font-semibold text-[var(--green)]">Toys Store Vittoria</h3>
          </div>
          <address className="mt-6 not-italic">
            <p className="flex items-start gap-3 text-sm leading-6 text-[var(--ink)]">
              <MapPin size={19} className="mt-0.5 shrink-0 text-[var(--red)]" aria-hidden="true" />
              <span>{site.address.streetAddress}<br />{site.address.postalCode} {site.address.locality} ({site.address.region}), Sicilia, Italia</span>
            </p>
            <p className="mt-4 flex items-center gap-3 text-sm text-[var(--ink)]">
              <Phone size={18} className="shrink-0 text-[var(--red)]" aria-hidden="true" />
              <span>Telefono: <a className="font-semibold underline decoration-[var(--gold)] underline-offset-4" href={`tel:${site.address.internationalTelephone}`}>{site.address.telephone}</a></span>
            </p>
          </address>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="button button-dark" href={site.address.directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true" /> Indicazioni stradali</a>
            <a className="button button-outline" href={`tel:${site.address.internationalTelephone}`}><Phone size={17} aria-hidden="true" /> Chiamaci</a>
          </div>
        </div>
      </div>
    </section>
  );
}
