import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="wrap" style={{ padding: '32px 20px', maxWidth: 760 }}>
      <p className="muted">Legal</p>
      <h1>Privacy Policy</h1>
      <p className="muted">Template — have a local lawyer review before accepting payments.</p>
      <p><strong>Short version:</strong> this demo collects nothing. When live: email + payment reference for bids, publish only brand/logo/URL/amount, no tracking cookies, delete on request.</p>
      <p><Link href="/">← Back</Link></p>
    </main>
  );
}
