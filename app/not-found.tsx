import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--cream)] px-6 text-center">
      <div><p className="eyebrow">404 · Pagina non trovata</p><h1 className="serif mt-3 text-5xl text-[var(--green)]">Questa pagina è altrove</h1><p className="mt-3 text-sm text-[var(--muted)]">Torna alla home e riparti da lì.</p><Link className="button button-primary mt-6" href="/">Torna alla home</Link></div>
    </main>
  );
}
