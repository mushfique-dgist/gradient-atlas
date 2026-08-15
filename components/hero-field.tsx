export function HeroField() {
  return (
    <div className="field-grid relative min-h-[28rem] overflow-hidden border border-[var(--line-strong)] bg-[var(--paper-raised)]" aria-label="A conceptual field showing many learning signals converging on a model, then branching toward evaluated behavior" role="img">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 620 520">
        <defs>
          <marker id="arrow" markerHeight="7" markerWidth="7" orient="auto" refX="5" refY="3.5">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#171713" />
          </marker>
        </defs>
        <g fill="none" stroke="#aaa394" strokeWidth="1.1">
          <path d="M72 76 C165 76 175 235 285 235" markerEnd="url(#arrow)" />
          <path d="M72 180 C170 180 188 246 285 246" markerEnd="url(#arrow)" />
          <path d="M72 302 C170 302 190 258 285 258" markerEnd="url(#arrow)" />
          <path d="M72 424 C170 424 180 270 285 270" markerEnd="url(#arrow)" />
          <path d="M362 252 C455 252 464 118 555 118" markerEnd="url(#arrow)" />
          <path d="M362 252 C455 252 468 255 555 255" markerEnd="url(#arrow)" />
          <path d="M362 252 C455 252 464 391 555 391" markerEnd="url(#arrow)" />
        </g>
        <g fill="#faf8f2" stroke="#171713" strokeWidth="1.5">
          <circle cx="72" cy="76" r="23" />
          <circle cx="72" cy="180" r="23" />
          <circle cx="72" cy="302" r="23" />
          <circle cx="72" cy="424" r="23" />
          <circle cx="325" cy="252" r="47" fill="#d78518" />
          <circle cx="555" cy="118" r="24" />
          <circle cx="555" cy="255" r="24" />
          <circle cx="555" cy="391" r="24" />
        </g>
        <g fill="#171713" fontFamily="var(--font-plex-mono)" fontSize="11" textAnchor="middle">
          <text x="72" y="80">DATA</text>
          <text x="72" y="184">TARGET</text>
          <text x="72" y="306">REWARD</text>
          <text x="72" y="428">TOOLS</text>
          <text x="325" y="247">MODEL +</text>
          <text x="325" y="262">PROTOCOL</text>
          <text x="555" y="122">CLAIM</text>
          <text x="555" y="259">ACTION</text>
          <text x="555" y="395">TEST</text>
        </g>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between border-t border-[var(--line-strong)] pt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[var(--ink-muted)]">
        <span>Signals are not intelligence levels</span>
        <span>Every arrow has assumptions</span>
      </div>
    </div>
  );
}
