"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Download, Expand, Minus, Plus, RotateCcw } from "lucide-react";
import { site, trackEvent } from "@/lib/site";
import "./viewer-controls.css";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.${pdfjs.version.replace(/\./g, "-")}.mjs`;

type PageMetrics = { width: number; height: number };
type StageSize = { width: number; height: number };

function getMetrics(page: PDFPageProxy): PageMetrics {
  const viewport = page.getViewport({ scale: 1 });
  return { width: viewport.width, height: viewport.height };
}

export default function CatalogViewerClient() {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isWide, setIsWide] = useState(false);
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [thumbsOpen, setThumbsOpen] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [metrics, setMetrics] = useState<Record<number, PageMetrics>>({});
  const [renderedPages, setRenderedPages] = useState<Record<string, boolean>>({});

  const viewerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const metricsCache = useRef(new Map<number, PageMetrics>());
  const previousPage = useRef(page);

  const visiblePages = useMemo(() => {
    if (!numPages) return [];
    if (!isWide || page === 1) return [page];
    const first = page % 2 === 0 ? page : page - 1;
    return [first, Math.min(first + 1, numPages)];
  }, [isWide, numPages, page]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const updateLayout = () => setIsWide(media.matches);
    updateLayout();
    media.addEventListener("change", updateLayout);

    const stage = stageRef.current;
    if (!stage) return () => media.removeEventListener("change", updateLayout);

    const observer = new ResizeObserver(([entry]) => {
      setStageSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(stage);
    return () => {
      media.removeEventListener("change", updateLayout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (previousPage.current !== page) trackEvent("catalog_page_change", { page });
    previousPage.current = page;
  }, [page]);

  useEffect(() => {
    if (!pdf || visiblePages.length === 0) return;
    let cancelled = false;

    async function loadMetrics() {
      const entries = await Promise.all(visiblePages.map(async (pageNumber) => {
        const cached = metricsCache.current.get(pageNumber);
        if (cached) return [pageNumber, cached] as const;
        const pageProxy = await pdf!.getPage(pageNumber);
        const pageMetrics = getMetrics(pageProxy);
        metricsCache.current.set(pageNumber, pageMetrics);
        return [pageNumber, pageMetrics] as const;
      }));

      if (!cancelled) {
        setMetrics((current) => ({ ...current, ...Object.fromEntries(entries) }));
      }
    }

    void loadMetrics().catch((loadError: unknown) => {
      if (!cancelled) {
        setPageError(loadError instanceof Error ? loadError.message : "Impossibile preparare la pagina del catalogo.");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [pdf, visiblePages]);

  const goTo = useCallback((target: number) => {
    setPageError(null);
    setPage(Math.max(1, Math.min(numPages || 1, target)));
  }, [numPages]);

  const step = isWide && page > 1 ? 2 : 1;
  const gap = visiblePages.length > 1 ? 20 : 0;
  const currentMetrics = visiblePages.map((number) => metrics[number]);
  const pagesReady = currentMetrics.length > 0 && currentMetrics.every(Boolean);
  const pageScale = pagesReady && stageSize.height > 0 && stageSize.width > 0
    ? Math.min(
      stageSize.height / Math.max(...currentMetrics.map((item) => item!.height)),
      (stageSize.width - gap) / currentMetrics.reduce((sum, item) => sum + item!.width, 0)
    ) * zoom
    : 0;
  const canRenderPages = pagesReady && Number.isFinite(pageScale) && pageScale > 0;
  const pageWidths = canRenderPages ? currentMetrics.map((item) => Math.max(1, Math.floor(item!.width * pageScale))) : [];
  const renderKeys = visiblePages.map((number, index) => `${number}:${pageWidths[index] ?? 0}`);
  const pagesRendered = renderKeys.length > 0 && renderKeys.every((key) => renderedPages[key]);

  const onLoadSuccess = (document: PDFDocumentProxy) => {
    setPdf(document);
    setNumPages(document.numPages);
    setError(false);
    setPageError(null);
    setLoading(false);
    setPage(1);
    setMetrics({});
    metricsCache.current.clear();
    setRenderedPages({});
    trackEvent("catalog_open");
  };

  const onLoadError = () => {
    setError(true);
    setLoading(false);
  };

  const markPageRendered = (key: string) => {
    setRenderedPages((current) => current[key] ? current : { ...current, [key]: true });
  };

  return (
    <section
      aria-label="Visualizzatore del catalogo"
      aria-describedby="viewer-keyboard-help"
      ref={viewerRef}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(page + step);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(page - step);
        }
      }}
      className="overflow-hidden rounded-3xl border border-[#123d3215] bg-white/70 shadow-[0_20px_70px_#193b2b12]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#123d3210] bg-[#fffdf8] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--green)]"><BookOpen size={17} className="text-[var(--red)]" /> Catalogo Natale 2026</div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="viewer-tool" onClick={() => setZoom((value) => Math.max(.7, value - .15))} aria-label="Riduci ingrandimento" disabled={zoom <= .7}><Minus size={16} /></button>
          <span className="min-w-11 text-center text-xs tabular-nums text-[var(--muted)]">{Math.round(zoom * 100)}%</span>
          <button type="button" className="viewer-tool" onClick={() => setZoom((value) => Math.min(1.7, value + .15))} aria-label="Aumenta ingrandimento" disabled={zoom >= 1.7}><Plus size={16} /></button>
          <button type="button" className="viewer-tool" onClick={() => viewerRef.current?.requestFullscreen?.()} aria-label="Visualizza a schermo intero"><Expand size={16} /></button>
          <button type="button" className={`viewer-tool ${thumbsOpen ? "viewer-tool-active" : ""}`} onClick={() => setThumbsOpen((open) => !open)} aria-expanded={thumbsOpen} aria-label="Mostra o nascondi miniature"><BookOpen size={16} /></button>
        </div>
      </div>

      <div ref={stageRef} className="viewer-stage relative bg-[#f5efe5] px-3 py-5 sm:px-7 sm:py-8" aria-busy={loading || !pagesRendered}>
        {loading && !error && <div className="absolute inset-0 z-10 grid place-items-center bg-[#f5efe5]/90" role="status"><span className="text-sm text-[var(--muted)]">Caricamento del catalogo…</span></div>}
        {error ? (
          <div role="alert" className="grid min-h-full place-items-center text-center">
            <div className="max-w-sm px-5">
              <p className="serif text-3xl text-[var(--green)]">Il catalogo non si apre</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Controlla la connessione oppure apri il PDF nel visualizzatore del tuo dispositivo.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button className="button button-primary !min-h-10 !text-xs" onClick={() => { setError(false); setLoading(true); setNumPages(0); setRetryKey((key) => key + 1); }}><RotateCcw size={14} /> Riprova</button>
                <a className="button button-outline !min-h-10 !text-xs" href={site.pdfPath} target="_blank" rel="noopener noreferrer">Apri PDF</a>
              </div>
            </div>
          </div>
        ) : (
          <Document
            key={retryKey}
            className="h-full w-full"
            file={site.pdfPath}
            options={{ wasmUrl: "/wasm/" }}
            loading={null}
            onLoadSuccess={onLoadSuccess}
            onLoadError={onLoadError}
            error={null}
          >
            <div className="mx-auto flex h-full min-h-full w-max max-w-none items-center justify-center gap-5">
              {!canRenderPages && <div className="grid min-h-64 min-w-48 place-items-center text-sm text-[var(--muted)]" role="status">Adattamento della pagina al visualizzatore…</div>}
              {canRenderPages && visiblePages.map((pageNumber, index) => {
                const width = pageWidths[index];
                const key = renderKeys[index];
                const rendered = renderedPages[key] === true;
                return (
                  <div
                    key={pageNumber}
                    className="pdf-page relative"
                    style={{ width, aspectRatio: `${currentMetrics[index]!.width} / ${currentMetrics[index]!.height}` }}
                    role="img"
                    aria-label={`Pagina ${pageNumber}`}
                    aria-busy={!rendered}
                  >
                    {!rendered && <div className="viewer-page-skeleton z-10" role="status"><span className="text-xs text-[var(--muted)]">Rendering pagina {pageNumber}…</span></div>}
                    <Page
                      pageNumber={pageNumber}
                      width={width}
                      suspense={false}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      loading={null}
                      onRenderSuccess={() => markPageRendered(key)}
                      onRenderError={(renderError) => setPageError(renderError.message)}
                    />
                  </div>
                );
              })}
            </div>
          </Document>
        )}
        {pageError && !error && (
          <div role="alert" className="absolute inset-x-4 bottom-4 z-20 rounded-xl border border-[#a6192e40] bg-[#fff8ebf2] p-3 text-center text-xs text-[var(--red)]">
            {pageError} <a className="ml-1 font-semibold underline" href={site.pdfPath} target="_blank" rel="noopener noreferrer">Apri il PDF originale</a>
          </div>
        )}
        {!error && <button className="viewer-arrow left-2 sm:left-4" onClick={() => goTo(page - step)} disabled={page <= 1} aria-label="Pagina precedente"><ChevronLeft size={23} /></button>}
        {!error && <button className="viewer-arrow right-2 sm:right-4" onClick={() => goTo(page + step)} disabled={page >= numPages} aria-label="Pagina successiva"><ChevronRight size={23} /></button>}
      </div>

      <div className="border-t border-[#123d3210] bg-[#fffdf8] px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="button button-outline !min-h-10 !px-3 !text-xs" onClick={() => goTo(page - step)} disabled={page <= 1}><ChevronLeft size={15} /> Precedente</button>
          <label htmlFor="page-slider" className="sr-only">Vai alla pagina</label>
          <input id="page-slider" className="min-w-28 flex-1 accent-[#a6192e]" type="range" min="1" max={numPages || 1} value={page} disabled={!numPages} onChange={(event) => goTo(Number(event.target.value))} aria-valuetext={`Pagina ${page} di ${numPages || "…"}`} />
          <output className="min-w-[5rem] text-center text-xs font-semibold tabular-nums text-[var(--green)]" aria-live="polite">Pagina {page} / {numPages || "…"}</output>
          <button type="button" className="button button-outline !min-h-10 !px-3 !text-xs" onClick={() => goTo(page + step)} disabled={page >= numPages}>Successiva <ChevronRight size={15} /></button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#123d3210] pt-4">
          <button type="button" onClick={() => setThumbsOpen((open) => !open)} className="text-xs font-semibold text-[var(--muted)] underline decoration-[#d6ad60] underline-offset-4">Miniature {thumbsOpen ? "−" : "+"}</button>
          <div className="flex flex-wrap gap-2">
            <a className="button button-outline !min-h-10 !px-3 !text-xs" href={site.pdfPath} download="catalogo-natale-2026.pdf"><Download size={14} /> Scarica PDF</a>
            <a className="button button-dark !min-h-10 !px-3 !text-xs" href={site.shopUrl} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={14} /> Vai allo shop online</a>
          </div>
        </div>
      </div>
      {thumbsOpen && numPages > 0 && (
        <div className="viewer-scrollbar flex gap-3 overflow-x-auto border-t border-[#123d3210] bg-[#faf5ec] p-4" aria-label="Miniature pagine">
          {Array.from({ length: numPages }, (_, index) => index + 1).map((pageNumber) => {
            const nearActive = Math.abs(pageNumber - page) <= 3 || pageNumber === 1 || pageNumber === numPages;
            return (
              <button key={pageNumber} type="button" onClick={() => goTo(pageNumber)} className={`shrink-0 rounded-lg border p-1.5 ${pageNumber === page ? "border-[var(--red)] bg-[#a6192e0b]" : "border-transparent hover:border-[#d6ad60]"}`} aria-label={`Vai alla pagina ${pageNumber}`} aria-current={pageNumber === page ? "page" : undefined}>
                {nearActive ? <Page pdf={pdf ?? undefined} pageNumber={pageNumber} width={70} renderAnnotationLayer={false} renderTextLayer={false} _enableRegisterUnregisterPage={false} loading={<div className="h-[99px] w-[70px] animate-pulse bg-white" />} /> : <div className="grid h-[99px] w-[70px] place-items-center bg-white text-xs text-[var(--muted)]">{pageNumber}</div>}
                <span className="mt-1 block text-center text-[.65rem] text-[var(--muted)]">{pageNumber}</span>
              </button>
            );
          })}
        </div>
      )}
      {!error && <details className="border-t border-[#123d3210] px-5 py-3 text-xs text-[var(--muted)]">
        <summary className="w-fit cursor-pointer font-semibold text-[var(--green)]">Problemi con la visualizzazione? Apri il PDF originale</summary>
        <p className="mb-1 mt-2">Si aprirà il visualizzatore PDF standard del tuo dispositivo.</p>
        <a className="underline underline-offset-2" href={site.pdfPath} target="_blank" rel="noopener noreferrer">Apri il catalogo in una nuova scheda</a>
      </details>}
      <p id="viewer-keyboard-help" className="sr-only">Usa i tasti freccia per cambiare pagina quando il visualizzatore ha il focus.</p>
    </section>
  );
}
