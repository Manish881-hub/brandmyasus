import Link from 'next/link';
import { SPOTS } from '@/lib/data';

export default function Leaderboard() {
  const rows = [...SPOTS].sort((a, b) => b.price - a.price);
  return (
    <main className="wrap" style={{ padding: '28px 20px' }}>
      <h1>Leaderboard</h1>
      <p className="muted">Top bids across all 20 spots. Demo data — connect your backend later.</p>
      <div className="box table-wrap">
        <table className="spots-table">
          <thead><tr><th>#</th><th>Brand</th><th>Spot</th><th>Bid</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.n}><td>{i + 1}</td><td>{r.heldBy ?? 'Available'}</td><td>Spot {r.n} — {r.label}</td><td><strong>{r.price} €</strong></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p><Link href="/">← Back to auction</Link></p>
    </main>
  );
}
