"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--cream)] px-6 text-center">
      <div className="max-w-md"><p className="eyebrow">Qualcosa è andato storto</p><h1 className="serif mt-3 text-4xl text-[var(--green)]">Riproviamo insieme</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">La pagina non è disponibile in questo momento. Riprova tra poco.</p><button className="button button-primary mt-6" onClick={reset}>Riprova</button></div>
    </main>
  );
}
