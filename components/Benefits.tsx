import { BookOpen, Gift, ShoppingBag } from "lucide-react";

const benefits = [
  { icon: Gift, title: "Idee regalo", text: "Lasciati ispirare per trovare il pensiero giusto da mettere sotto l’albero." },
  { icon: BookOpen, title: "Da sfogliare", text: "Apri il catalogo digitale e scorri le pagine con calma, da ogni dispositivo." },
  { icon: ShoppingBag, title: "Acquisti online", text: "Quando hai scelto, raggiungi lo shop ufficiale per proseguire con l’acquisto." }
];

export function Benefits() {
  return (
    <section className="border-y border-[#123d3210] bg-white/55 py-20 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Piccoli momenti, grandi sorrisi</p>
          <h2 className="serif mt-4 text-4xl font-medium text-[var(--green)] sm:text-5xl">Tutto quello che serve per sognare</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="rounded-2xl border border-[#123d3212] bg-[var(--cream)] p-7 sm:p-8">
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-[#a6192e0d] text-[var(--red)]"><Icon size={21} /></span>
              <p className="mb-2 text-xs font-bold tracking-[.14em] text-[var(--gold)]">0{index + 1}</p>
              <h3 className="serif mb-2 text-2xl font-semibold text-[var(--green)]">{title}</h3>
              <p className="m-0 text-sm leading-7 text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
