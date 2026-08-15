import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line-strong)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="page-shell grid gap-12 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display max-w-md text-3xl">A map of mechanisms, evidence, and honest uncertainty.</p>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#bdb8aa]">Built from primary papers, four supplied books, and a nine-turn conversation that deserved a more careful answer.</p>
        </div>
        <div>
          <p className="eyebrow !text-[#8f8a7d]">Navigate</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/learn">Course map</Link>
            <Link href="/audit">Conversation audit</Link>
            <Link href="/atlas">Frontier atlas</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow !text-[#8f8a7d]">Evidence contract</p>
          <p className="mt-4 text-sm leading-6 text-[#bdb8aa]">Frontier claims carry dates. Analogies show where they break. Examples are recomputed, not ornamental.</p>
        </div>
      </div>
      <div className="border-t border-[#3d3c36]">
        <div className="page-shell flex flex-col justify-between gap-2 py-5 text-xs text-[#8f8a7d] sm:flex-row">
          <span>Gradient Atlas · As of 15 August 2026</span>
          <span>Educational synthesis · Sources retain their own licenses</span>
        </div>
      </div>
    </footer>
  );
}
