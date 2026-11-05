import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { ChristmasDecorations } from "@/components/ChristmasDecorations";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--green)] text-white">
      <ChristmasDecorations />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-12 h-[30rem] w-[30rem] rounded-full border border-white/10 sm:right-[-5%]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-28 h-[22rem] w-[22rem] rounded-full border border-[var(--gold)]/15 sm:right-[1%]" />
      <div className="container relative grid min-h-[620px] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
        <div className="max-w-[680px]">
          <p className="eyebrow !text-[var(--gold)]"><Sparkles size={13} /> Natale 2026</p>
          <h1 className="serif mt-5 break-words text-[clamp(3rem,7vw,5.75rem)] font-medium leading-[.94] tracking-[-.035em]">La magia del Natale inizia da Toys Store Vittoria</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">Un mondo di meraviglia, idee regalo e momenti da condividere: sfoglia il catalogo di Natale e lasciati accompagnare dall’ispirazione.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="button bg-[var(--gold)] text-[#18372e] hover:bg-[#e2c47f]" href="#catalogo">Sfoglia il catalogo <ArrowRight size={16} /></a>
            <a className="button border border-white/35 text-white hover:bg-white/10" href="#negozio">Dove siamo</a>
            <a className="button border border-white/35 text-white hover:bg-white/10" href={site.shopUrl} target="_blank" rel="noopener noreferrer">Acquista online <ArrowUpRight size={16} /></a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs tracking-wide text-white/55">
            <span className="h-px w-8 bg-[var(--gold)]" /> Un catalogo da vivere, un regalo alla volta
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[390px] lg:ml-auto">
          <div aria-hidden="true" className="absolute -inset-5 rotate-3 rounded-[12rem_12rem_2rem_2rem] border border-[var(--gold)]/40" />
          <div className="relative flex aspect-[.9] items-center justify-center overflow-hidden rounded-[12rem_12rem_1.5rem_1.5rem] border border-white/15 bg-[#fff8eb] p-8 shadow-[0_35px_80px_#0004] sm:p-12">
            <Image src={site.logoPath} alt="Logo natalizio Toys Store Vittoria" width={500} height={499} priority fetchPriority="high" className="h-full w-full object-contain" sizes="(max-width: 768px) 75vw, 390px" />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--green)] px-4 py-2 text-[.65rem] font-bold uppercase tracking-[.2em] text-[var(--gold)]">Natale 2026</span>
          </div>
          <span aria-hidden="true" className="absolute -right-4 top-[18%] text-3xl text-[var(--gold)]">✦</span>
          <span aria-hidden="true" className="absolute -left-6 bottom-[18%] text-xl text-[var(--gold)]">✧</span>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fff8eb] to-transparent" />
    </section>
  );
}
