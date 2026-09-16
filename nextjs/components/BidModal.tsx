'use client';
import { useState } from 'react';
import type { Spot } from '@/lib/data';
import type { Currency } from '@/lib/format';
import { fmt } from '@/lib/format';

export default function BidModal({
  spot, cur, onClose, onPlace,
}: {
  spot: Spot | null; cur: Currency; onClose: () => void; onPlace: (n: number, brand: string, amount: number) => void;
}) {
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [amount, setAmount] = useState(0);
  if (!spot) return null;
  const min = spot.heldBy ? spot.price + 10 : spot.price;
  const shownAmount = amount || min;
  const deposit = Math.max(10, Math.round(shownAmount * 0.2));

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="bidTitle">
        <button className="modal-x" onClick={onClose} aria-label="Close">✕</button>
        <h3 id="bidTitle">Bid for spot {spot.n}</h3>
        <p className="muted small">{spot.label} · {spot.size} · {spot.heldBy ? 'current ' + fmt(spot.price, cur) : 'from ' + fmt(spot.price, cur)}</p>
        <label>Brand / handle<input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. @yourbrand" /></label>
        <label>Website URL<input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" inputMode="url" /></label>
        <label>Your bid (€)<input type="number" min={0} step={1} value={shownAmount} onChange={(e) => setAmount(Number(e.target.value))} /></label>
        <p className="micro">Deposit due now: <strong>{fmt(deposit, cur)}</strong> (20%, min 10 €). Refunded if outbid. Outbids must beat current by ≥ 10 €.</p>
        <button
          className="btn btn-dark btn-large"
          onClick={() => {
            if (shownAmount < min) { alert(`Bid must be at least ${fmt(min, cur)} (outbids +10).`); return; }
            onPlace(spot.n, brand.trim() || 'You', shownAmount);
          }}
        >Place bid</button>
        <p className="micro muted">Demo frontend only — no real payment. Connect Stripe / backend later.</p>
      </div>
    </div>
  );
}
