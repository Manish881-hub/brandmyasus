'use client';

import { useEffect, useState } from 'react';
import type { Spot } from '@/lib/data';
import type { Currency } from '@/lib/format';
import { fmt } from '@/lib/format';
import { createClient, hasSupabaseEnv } from '@/lib/supabase/client';

type Auction = {
  id: string;
  bid_increment: number;
  ends_at: string;
  status: 'draft' | 'scheduled' | 'active' | 'ended' | 'cancelled';
};

export default function BidModal({
  spot,
  auction,
  cur,
  onClose,
}: {
  spot: Spot | null;
  auction: Auction | null;
  cur: Currency;
  onClose: () => void;
}) {
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!spot) return;

    setBrand('');
    setUrl('');
    setAmount(
      String(
        spot.heldBy
          ? spot.price + (auction?.bid_increment ?? 10)
          : spot.price
      )
    );
    setMessage(null);
  }, [spot, auction?.bid_increment, spot?.price, spot?.heldBy]);

  if (!spot || !auction) return null;

  const minimum = spot.heldBy
    ? spot.price + auction.bid_increment
    : spot.price;

  const numericAmount = Number(amount);
  const deposit = Math.max(
    10,
    Math.round(numericAmount * 0.2)
  );

  async function submitBid() {
    if (!spot || !auction) return;
    if (!hasSupabaseEnv()) {
      setMessage('Supabase not configured — add .env.local first.');
      return;
    }
    const supabase = createClient();
    setMessage(null);

    if (!Number.isFinite(numericAmount)) {
      setMessage('enter a valid bid amount.');
      return;
    }

    if (numericAmount < minimum) {
      setMessage(
        `minimum next bid is ${fmt(minimum, cur)}.`
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage(
          'you need to sign in before bidding. Enable Supabase Auth email OTP in your project.'
        );
        return;
      }

      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auction_id: auction.id,
          spot_id: spot.id,
          amount: numericAmount,
          brand: brand.trim(),
          url: url.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          result?.error ?? 'bid could not be placed.'
        );
        return;
      }

      setMessage('bid placed successfully.');

      window.setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      console.error(error);
      setMessage('something went wrong. please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bidTitle"
      >
        <button
          className="modal-x"
          onClick={onClose}
          aria-label="Close"
          disabled={loading}
        >
          ✕
        </button>

        <h3 id="bidTitle">
          Bid for spot {spot.n}
        </h3>

        <p className="muted small">
          {spot.label} · {spot.size} · current{' '}
          {fmt(spot.price, cur)}
        </p>

        <label>
          Brand / handle
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. @yourbrand"
            disabled={loading}
          />
        </label>

        <label>
          Website URL
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            inputMode="url"
            disabled={loading}
          />
        </label>

        <label>
          Your bid ({cur})
          <input
            type="number"
            min={minimum}
            step={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </label>

        <p className="micro">
          Minimum next bid:{' '}
          <strong>{fmt(minimum, cur)}</strong>
          <br />
          Planned deposit:{' '}
          <strong>{Number.isFinite(numericAmount) ? fmt(deposit, cur) : '—'}</strong>
        </p>

        {message && (
          <p className="micro" style={{ color: message.includes('success') ? '#16a34a' : '#dc2626' }}>
            {message}
          </p>
        )}

        <button
          className="btn btn-dark btn-large"
          onClick={submitBid}
          disabled={loading}
        >
          {loading ? 'placing bid...' : 'place bid'}
        </button>

        <p className="micro muted">
          Your bid is validated by the server and database. Refresh keeps the new price via Supabase.
        </p>
      </div>
    </div>
  );
}
