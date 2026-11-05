import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#123d3212] bg-[#fff8ebed] backdrop-blur-xl">
      <nav id="inizio" className="container flex h-[68px] items-center justify-between gap-3" aria-label="Navigazione principale">
        <Link href="/#inizio" className="flex h-12 w-12 shrink-0 items-center justify-center no-underline sm:h-14 sm:w-14" aria-label="Torna all’inizio della homepage">
          <Image src={site.logoPath} alt="Toys Store Vittoria - Logo natalizio" width={500} height={499} loading="eager" className="h-12 w-12 object-contain sm:h-14 sm:w-14" sizes="56px" />
        </Link>
        <div className="flex items-center gap-3 text-[.68rem] font-semibold text-[#273b31] sm:gap-6 sm:text-sm">
          <a className="whitespace-nowrap transition-colors hover:text-[var(--red)]" href="#catalogo">Catalogo</a>
          <a className="whitespace-nowrap transition-colors hover:text-[var(--red)]" href="#negozio">Dove siamo</a>
          <a className="inline-flex items-center gap-1 transition-colors hover:text-[var(--red)]" href={site.shopUrl} target="_blank" rel="noopener noreferrer">
            <span className="whitespace-nowrap">Shop online</span><ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
