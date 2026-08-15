import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-shell grid min-h-[65vh] place-items-center py-20 text-center">
      <div><p className="eyebrow">404 · Outside this atlas</p><h1 className="display mt-6 text-[clamp(4rem,10vw,10rem)]">No lesson at these coordinates.</h1><p className="mx-auto mt-7 max-w-xl leading-7 text-[var(--ink-muted)]">The route may have moved, or the claim was never mapped. The course index is the reliable starting point.</p><Link className="mt-8 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm no-underline" href="/learn"><ArrowLeft aria-hidden="true" className="size-4" /> Return to the course map</Link></div>
    </section>
  );
}
