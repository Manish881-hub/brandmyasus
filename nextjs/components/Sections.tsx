'use client';
import { CORNER, DAYS, FAQS, FOUNDER, GOAL, MACHINE, type Spot } from '@/lib/data';
import type { Currency } from '@/lib/format';
import { fmt } from '@/lib/format';
import Visualizer from './Visualizer';
import Reveal from './Reveal';

export function Hero({ spots, cur, onBid }: { spots: Spot[]; cur: Currency; onBid: (n: number) => void }) {
  const open = spots.filter((s) => !s.heldBy).length;
  const totalBids = spots.reduce((a, s) => a + s.bids, 0);
  const taken = spots.length - open;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="live-row"><span className="live-dot" /><span>Auction · <strong>{open}</strong> spot open from <strong>{fmt(59, cur)}</strong></span></div>
          <h1>Your brand,<br />on my Asus.</h1>
          <p className="lede">I’m funding a new Asus laptop by selling its surfaces as sticker spots. Your logo travels to cafés, events, vlogs and build-in-public posts — on the lid, inside, and on the gear.</p>
          <div className="stats">
            <div className="stat-big">{fmt(GOAL.raisedEur, cur)} <span className="muted">raised</span></div>
            <div className="progress"><div className="bar" style={{ width: '100%' }} /></div>
            <div className="muted small">goal passed · <strong>{GOAL.percent}%</strong> · {totalBids} bids so far</div>
          </div>
          <div className="hero-ctas">
            <a href="#spots" className="btn btn-dark btn-large">Get a spot</a>
            <a href="#how" className="btn btn-ghost btn-large">How it works ›</a>
          </div>
          <p className="micro">Tap any numbered spot on the laptop to bid. Lid · Inside · Gear.</p>
        </div>
        <Visualizer spots={spots} onBid={onBid} />
      </section>
      <section className="banner">
        <div className="wrap">
          <h2>Everyone knows the Asus lid. Put your logo right next to it.</h2>
          <p className="muted">· {taken} of {spots.length} sticker spots taken</p>
        </div>
      </section>
    </>
  );
}

export function DayByDay({ cur }: { cur: Currency }) {
  return (
    <section className="wrap" id="history">
      <Reveal><h2>Day by day</h2></Reveal>
      <p className="muted">Sample history — wire this to your backend later.</p>
      <div className="days">
        {DAYS.map((d) => (
          <div className="day" key={d.d}><strong>{d.d}</strong> · {d.bids} bids · <span className="muted">{fmt(d.total, cur)} bid · {fmt(d.kept, cur)} still standing</span></div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="wrap" id="how">
      <Reveal><h2>How it works</h2></Reveal>
      <div className="how-grid">
        <div className="how-card"><div className="how-n">1</div><h3>Pick your spot + size</h3><p>20 spots across lid, interior and gear — priced by size and visibility. Tap the laptop above to preview placement.</p></div>
        <div className="how-card"><div className="how-n">2</div><h3>Win the bid</h3><p>Top bid when the timer ends wins. You pay a 20% deposit (min 10 €) to bid — refunded automatically if you’re outbid.</p></div>
        <div className="how-card"><div className="how-n">3</div><h3>Your sticker rides along</h3><p>I print your logo as a durable die-cut vinyl sticker. Wherever the Asus goes — photos, vlogs, events — your brand is visible, plus a link on this page.</p></div>
      </div>
    </section>
  );
}

export function Specs({ cur }: { cur: Currency }) {
  return (
    <section className="wrap" id="specs">
      <h2>What the money buys.</h2>
      <p className="muted">Exact specs — edit in <code>lib/data.ts → MACHINE</code>.</p>
      <div className="specs box">
        <div className="spec-head"><h3>{MACHINE.name}</h3><div className="price">{fmt(MACHINE.priceEur, cur)}</div></div>
        <dl className="spec-list">
          {MACHINE.specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <p className="micro">Priced in euros where I’m buying it. Anything past the goal funds the trips the laptop goes on.</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="wrap" id="faq">
      <h2>Questions &amp; Answers</h2>
      <div className="faq">
        {FAQS.map(([q, a]) => (<details key={q}><summary>{q}</summary><p className="muted">{a}</p></details>))}
      </div>
    </section>
  );
}

export function CornerSection({ cur }: { cur: Currency }) {
  const claim = () => alert('Demo: connect a payment link here to sell the corner slot.');
  return (
    <section className="wrap" id="corner">
      <h2>The corner</h2>
      <p className="muted">One slot at the very top of this page, held by whoever paid most for it. Outbid moves you down — it never removes you.</p>
      <div className="box">
        <ul className="corner-list">
          {CORNER.map((c) => (
            <li key={c.handle}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar-placeholder.svg" width={36} height={36} alt="" />
              <span><strong>{c.handle}</strong> · {fmt(c.amount, cur)} · <span className="muted">{c.note}</span></span>
            </li>
          ))}
        </ul>
        <div className="corner-cta">
          <span>Take the corner — <strong>{fmt(61, cur)}</strong> · one-time, no refund.</span>
          <button className="btn btn-dark" onClick={claim}>Claim the corner</button>
        </div>
      </div>
    </section>
  );
}

export function Founder() {
  return (
    <section className="wrap founder">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/avatar-placeholder.svg" alt="Founder photo placeholder" width={96} height={96} className="avatar" />
      <div>
        <p><strong>Hey, I’m {FOUNDER.name} 👋</strong></p>
        <p className="muted">Indie maker funding a new Asus by renting its surfaces. Edit this bio in <code>lib/data.ts → FOUNDER</code> and drop your photo at <code>public/founder.jpg</code>.</p>
      </div>
    </section>
  );
}

export function Footer() {
  // Same rhythm as reference footer: founder-adjacent nav grid (2-col mobile → row),
  // legal row, then independent-project disclaimer — all original Asus copy.
  return (
    <footer className="footer">
      <div className="wrap footer-inner" style={{ maxWidth: 896 }}>
        <nav className="foot-navgrid" aria-label="Footer">
          <a href="#spots">Live auction</a><a href="/leaderboard">Leaderboard</a>
          <a href="#how">How it works</a><a href="#corner">The corner</a>
          <a href="#specs">The machine</a><a href="#faq">FAQ</a>
        </nav>
        <div className="foot-legal">
          <nav aria-label="Legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>
        </div>
      </div>
      <div className="wrap micro muted">BrandMyAsus is an independent project. Not affiliated with, endorsed by, or sponsored by ASUSTeK Computer Inc. ASUS, Zenbook, ROG, Vivobook are trademarks of their respective owners. All logos shown belong to their bidders.</div>
    </footer>
  );
}
