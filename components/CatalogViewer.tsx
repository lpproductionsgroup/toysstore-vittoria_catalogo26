"use client";

import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("./CatalogViewerClient"), {
  ssr: false,
  loading: () => (
    <div className="overflow-hidden rounded-3xl border border-[#123d3215] bg-white/60" aria-label="Caricamento visualizzatore PDF">
      <div className="flex h-[54px] items-center border-b border-[#123d3210] px-5 text-sm font-semibold text-[var(--green)]">Catalogo Natale 2026</div>
      <div className="viewer-stage grid place-items-center bg-[#f5efe5]" role="status">
        <div className="text-center">
          <span className="mx-auto mb-4 block h-10 w-10 animate-spin rounded-full border-2 border-[#d6ad6050] border-t-[var(--red)]" />
          <p className="text-sm text-[var(--muted)]">Prepariamo il catalogo…</p>
        </div>
      </div>
      <div className="h-[112px] border-t border-[#123d3210]" />
    </div>
  )
});

export function CatalogViewer() {
  return <Viewer />;
}
