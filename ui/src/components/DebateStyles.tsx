// The page builds as one ES module, so the styles ship inline instead of as a
// separate CSS file the host might not load.
const CSS = `
.dr-stage { --dr-ink: var(--color-text, currentColor); }
.dr-hero {
  position: relative; overflow: hidden; margin: 0 0 4px; padding: 20px 22px;
  border: 1px solid var(--color-border, rgba(127,127,127,.3)); border-radius: 14px;
  background:
    linear-gradient(115deg, rgba(217,83,79,.14), transparent 38%),
    linear-gradient(245deg, rgba(59,125,216,.14), transparent 38%),
    linear-gradient(0deg, rgba(46,139,87,.12), transparent 60%);
}
.dr-hero-kicker { font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; opacity: .7; }
.dr-hero-title { font-size: 34px; font-weight: 900; letter-spacing: -.02em; line-height: 1.05; margin-top: 4px; }
.dr-hero-sub { font-size: 14px; opacity: .8; margin-top: 6px; }
.dr-motion {
  border-left: 6px solid currentColor; padding: 10px 16px; border-radius: 4px;
  background: rgba(127,127,127,.08);
}
.dr-motion-label { font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; opacity: .65; }
.dr-motion-text { font-size: 24px; font-weight: 800; line-height: 1.25; margin-top: 2px; }
.dr-col { position: relative; border-width: 2px !important; border-color: var(--dr-accent) !important; border-radius: 14px !important; overflow: hidden;
  transition: box-shadow .3s ease, transform .3s ease; }
.dr-col:focus-within, .dr-col:hover { box-shadow: 0 0 0 3px color-mix(in srgb, var(--dr-accent) 35%, transparent), 0 10px 28px -12px var(--dr-accent); }
.dr-col-head { flex-direction: column; align-items: flex-start !important; gap: 6px !important; padding: 14px 16px !important;
  background: color-mix(in srgb, var(--dr-accent) 13%, transparent); border-top: 0 !important; }
.dr-col-id { display: flex; align-items: center; gap: 10px; }
.dr-col-name { font-size: 18px; font-weight: 800; color: var(--dr-accent); }
.dr-col-tag { font-size: 15px; font-style: italic; font-weight: 600; }
.dr-col[data-variant="guard"] .dr-col-head { background: repeating-linear-gradient(135deg, color-mix(in srgb, var(--dr-accent) 16%, transparent) 0 10px, color-mix(in srgb, var(--dr-accent) 8%, transparent) 10px 20px); }
.dr-col[data-variant="ledger"] .dr-col-head { background-image: linear-gradient(color-mix(in srgb, var(--dr-accent) 12%, transparent), color-mix(in srgb, var(--dr-accent) 12%, transparent)), repeating-linear-gradient(0deg, color-mix(in srgb, var(--dr-accent) 22%, transparent) 0 1px, transparent 1px 12px); }
.dr-col[data-variant="ledger"] { border-style: double !important; border-width: 4px !important; }
.dr-col[data-variant="sprint"] .dr-col-head { background: linear-gradient(100deg, color-mix(in srgb, var(--dr-accent) 28%, transparent), transparent 85%); }
.dr-col[data-variant="sprint"] { border-radius: 4px 22px 4px 22px !important; }
.dr-col[data-variant="record"] { border-style: dashed !important; }
.dr-col[data-variant="plain"] .dr-col-head { background: rgba(127,127,127,.08); }
.dr-col:focus-within::after { content: ""; position: absolute; inset: 0 0 auto 0; height: 4px; background: var(--dr-accent); animation: dr-pulse 1.6s ease-in-out infinite; }
.dr-verdict { position: relative; border: 3px solid currentColor; border-radius: 16px; padding: 4px; animation: dr-land .5s cubic-bezier(.2,.9,.3,1.2) both; }
.dr-verdict::before { content: "Verdict"; position: absolute; top: -12px; left: 18px; padding: 0 8px; font-size: 11px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; background: var(--color-bg, Canvas); }
.dr-verdict h3, .dr-verdict [class*="CardTitle"] { font-size: 28px !important; font-weight: 900 !important; line-height: 1.15; }
.dr-verdict h4 { font-size: 12px !important; letter-spacing: .18em; text-transform: uppercase; margin-top: 10px; }
@keyframes dr-land { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes dr-pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .dr-verdict, .dr-col, .dr-col::after { animation: none !important; transition: none !important; }
}
`

/** The page's look. Text and backgrounds stay on the host theme. */
export default function DebateStyles() {
  return <style>{CSS}</style>
}
