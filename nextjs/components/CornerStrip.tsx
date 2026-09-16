'use client';
import type { Currency } from '@/lib/format';
import { fmt } from '@/lib/format';

export default function CornerStrip({ cur }: { cur: Currency }) {
  const claim = () => alert('Demo: connect a payment link here to sell the corner slot.');
  const past = [
    { handle: 'demo-shop.com', meta: '4d · ' + fmt(41, cur) },
    { handle: 'demo-app.com', meta: '15h · ' + fmt(31, cur) },
    { handle: 'demo-tool.com', meta: '1h · ' + fmt(21, cur) },
  ];
  return (
    <>
    <div className="corner-strip">
      <div className="wrap corner-strip-inner">
        <div className="corner-left">
          <span className="pill">● The corner</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar-placeholder.svg" alt="" width={28} height={28} />
          <span><strong>@yourbrand</strong> holds the corner — {fmt(51, cur)}</span>
        </div>
        <div className="corner-right">
          <span className="muted">Claim it for <strong>{fmt(61, cur)}</strong></span>
          <button className="btn btn-small" onClick={claim}>Claim — {fmt(61, cur)}</button>
          <a className="link" href="#corner" style={{ color: '#fff' }}>See all →</a>
        </div>
      </div>
    </div>

    {/* Floating corner rail (xl screens) — same pattern as reference: dashed card,
        hover reveals Claim/Visit, plus Previously-here list. Original copy + visuals. */}
    <div className="corner-rail" aria-label="Corner spotlight">
      <div className="rail-card group">
        <button type="button" className="rail-main" onClick={claim}
          aria-label={`Sponsored by @yourbrand at ${fmt(51, cur)}. Take the corner for ${fmt(61, cur)}.`}>
          <span className="rail-paid">paid {fmt(51, cur)}</span>
          <span className="rail-id">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar-placeholder.svg" alt="" width={36} height={36} />
            <span className="rail-handle">@yourbrand</span>
            <span className="rail-claim">Claim this spot for <strong>{fmt(61, cur)}</strong></span>
          </span>
        </button>
        <span className="rail-hover">
          <span role="button" tabIndex={0} className="rail-claim-btn" onClick={claim}>Claim — {fmt(61, cur)}</span>
          <a href="#corner" className="rail-visit">Visit ↗</a>
        </span>
      </div>
      <div className="rail-past">
        <p>Previously here</p>
        <ul>
          {past.map((p) => (
            <li key={p.handle}>
              <a href="#corner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/avatar-placeholder.svg" alt="" width={18} height={18} />
                <span className="past-handle">{p.handle}</span>
                <span className="past-meta">{p.meta}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#corner" className="past-all">See all 4 →</a>
      </div>
    </div>

    {/* Mobile bottom bar (below xl) */}
    <div className="corner-mobile">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/avatar-placeholder.svg" alt="" width={30} height={30} />
      <span className="cm-id"><strong>@yourbrand</strong><span>paid {fmt(51, cur)}</span></span>
      <button type="button" onClick={claim}>Claim for {fmt(61, cur)}</button>
    </div>
    </>
  );
}
