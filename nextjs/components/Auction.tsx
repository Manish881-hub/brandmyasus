'use client';

import type { Spot } from '@/lib/data';
import type { Currency } from '@/lib/format';
import { fmt } from '@/lib/format';

type Auction = {
  id: string;
  currency: Currency;
  starting_bid: number;
  bid_increment: number;
  starts_at: string;
  ends_at: string;
  status: 'draft' | 'scheduled' | 'active' | 'ended' | 'cancelled';
  machine_price: number;
  goal: number;
};

export default function Auction({
  auction,
  spots,
  cur,
  onBid,
}: {
  auction: Auction;
  spots: Spot[];
  cur: Currency;
  onBid: (n: number) => void;
}) {
  const top = [...spots]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  return (
    <section className="wrap" id="spots">
      <div className="section-head">
        <h2>The auction, live.</h2>

        <p className="muted">
          Current top bid · minimum increment {fmt(auction.bid_increment, cur)} ·{' '}
          <a href="/leaderboard">Leaderboard →</a>
        </p>
      </div>

      <div className="top3">
        {top.map((s, i) => (
          <div className="top3-card" key={s.n}>
            <span className="rank">{i + 1}</span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar-placeholder.svg"
              alt=""
              width={52}
              height={52}
            />

            <div>
              <strong>
                {s.heldBy ? 'Current bidder' : 'Available'}
              </strong>{' '}
              · {s.label}
              <br />
              <strong>{fmt(s.price, cur)}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="spots-grid">
        {spots.map((s) => {
          const minimumNextBid = s.heldBy
            ? s.price + auction.bid_increment
            : s.price;

          return (
            <div className="spot-card" key={s.n}>
              <div className="row">
                <span className={s.heldBy ? 'badge' : 'badge free'}>
                  {s.n} · {s.zone}
                </span>

                <span className="meta">{s.size}</span>
              </div>

              <div>
                <strong>{s.label}</strong>
              </div>

              <div className="row">
                <span className="bid">
                  {fmt(s.price, cur)}
                </span>

                <span className="meta">
                  {s.bids} bids
                </span>
              </div>

              <div className="row">
                <span className="meta">
                  {s.heldBy ? 'Currently held' : 'Available'}
                </span>
              </div>

              <button
                className={s.heldBy ? 'btn btn-ghost' : 'btn btn-dark'}
                onClick={() => onBid(s.n)}
              >
                {s.heldBy
                  ? `Bid ${fmt(minimumNextBid, cur)}`
                  : 'Bid'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="box table-wrap">
        <table className="spots-table">
          <thead>
            <tr>
              <th>Spot</th>
              <th>Size</th>
              <th>Status</th>
              <th>Current bid</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {spots.map((s) => (
              <tr key={s.n}>
                <td>
                  <strong>{s.n}</strong> {s.label}
                </td>

                <td>{s.size}</td>

                <td>
                  {s.heldBy ? 'Held' : 'Available'}
                </td>

                <td>
                  <strong>{fmt(s.price, cur)}</strong>
                  {' · '}
                  {s.bids} bids
                </td>

                <td>
                  <button
                    className={
                      s.heldBy
                        ? 'btn btn-small'
                        : 'btn btn-small btn-dark'
                    }
                    onClick={() => onBid(s.n)}
                  >
                    {s.heldBy ? 'Outbid' : 'Bid'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
