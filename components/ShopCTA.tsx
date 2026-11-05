import { ArrowUpRight, Gift } from "lucide-react";
import { site } from "@/lib/site";

export function ShopCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--green)] px-6 py-20 text-center text-white sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-20 h-72 w-72 rounded-full border border-[var(--gold)]/20 sm:right-[8%]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-2 -top-8 h-48 w-48 rounded-full border border-[var(--gold)]/15 sm:right-[12%]" />
      <div className="relative mx-auto max-w-2xl">
        <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/50 text-[var(--gold)]"><Gift size={21} /></span>
        <p className="eyebrow !text-[var(--gold)]">Il prossimo passo</p>
        <h2 className="serif mt-3 text-4xl font-medium leading-tight sm:text-5xl">Il tuo Natale continua online</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/75">Hai trovato l’ispirazione? Visita lo shop ufficiale per scoprire l’esperienza di acquisto Toys Store Vittoria.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a className="button bg-[var(--gold)] text-[#18372e] hover:bg-[#e2c47f]" href={site.shopUrl} target="_blank" rel="noopener noreferrer">Visita il nostro shop <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a className="button border border-white/35 text-white hover:bg-white/10" href={site.shopUrl} target="_blank" rel="noopener noreferrer">Scopri tutti i giocattoli <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
