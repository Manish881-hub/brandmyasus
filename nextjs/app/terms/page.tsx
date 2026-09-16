import Link from 'next/link';

export default function Terms() {
  return (
    <main className="wrap" style={{ padding: '32px 20px', maxWidth: 760 }}>
      <p className="muted">Legal</p>
      <h1>Terms</h1>
      <p className="muted">Template — have a local lawyer review before accepting money.</p>
      <ul>
        <li>20% deposit (min 10 €) to bid, refunded if outbid.</li>
        <li>Outbids must beat current by ≥ 10 €.</li>
        <li>All sponsors approved by hand; refused bids refunded.</li>
        <li>Independent project — not affiliated with ASUSTeK Computer Inc.</li>
      </ul>
      <p><Link href="/">← Back</Link></p>
    </main>
  );
}
