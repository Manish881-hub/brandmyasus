'use client';
import { useState } from 'react';
import type { Spot } from '@/lib/data';

type View = 'lid' | 'inside' | 'gear';

const LID_POS: Record<number, { x: string; y: string; cls: string }> = {
  2: { x: '50%', y: '18%', cls: 's-large' },
  1: { x: '22%', y: '32%', cls: 's-large' },
  3: { x: '78%', y: '32%', cls: 's-large' },
  4: { x: '30%', y: '52%', cls: 's-small' },
  5: { x: '40%', y: '50%', cls: 's-small taken' },
  6: { x: '60%', y: '50%', cls: 's-small taken' },
  7: { x: '70%', y: '52%', cls: 's-small' },
  8: { x: '22%', y: '74%', cls: 's-med' },
  9: { x: '50%', y: '74%', cls: 's-med' },
  10: { x: '78%', y: '74%', cls: 's-med' },
};

const INSIDE_POS: Record<number, { x: string; y: string }> = {
  11: { x: '28%', y: '62%' }, 12: { x: '38%', y: '62%' },
  13: { x: '28%', y: '76%' }, 14: { x: '38%', y: '76%' },
  15: { x: '62%', y: '62%' }, 16: { x: '72%', y: '62%' },
  17: { x: '62%', y: '76%' }, 18: { x: '72%', y: '76%' },
};

export default function Visualizer({ spots, onBid }: { spots: Spot[]; onBid: (n: number) => void }) {
  const [view, setView] = useState<View>('lid');
  const open = spots.filter((s) => !s.heldBy).length;
  const byN = (n: number) => spots.find((s) => s.n === n)!;

  return (
    <div className="hero-visual">
      <div className="view-tabs" role="tablist" aria-label="Laptop views">
        {(['lid', 'inside', 'gear'] as View[]).map((v) => (
          <button key={v} className={view === v ? 'tab active' : 'tab'} onClick={() => setView(v)}>
            {v === 'lid' ? 'Lid' : v === 'inside' ? 'Inside' : 'Gear'}
          </button>
        ))}
        <span className="free-badge">{open === 0 ? 'all spots taken' : `${open} spot${open > 1 ? 's' : ''} still free`}</span>
      </div>

      {view === 'lid' && (
        <div className="laptop-view active">
          <div className="laptop lid-laptop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="laptop-photo" src="/laptop-lid.svg" alt="Asus laptop lid — replace /public/laptop-lid.jpg with your photo" />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
              const p = LID_POS[n];
              const s = byN(n);
              return (
                <button
                  key={n}
                  className={`spot ${p.cls}${!s.heldBy ? ' free' : ''}`}
                  style={{ ['--x' as string]: p.x, ['--y' as string]: p.y }}
                  title={`Spot ${n} — ${s.label}`}
                  onClick={() => onBid(n)}
                >{n}</button>
              );
            })}
            <div className="asus-logo">ASUS</div>
          </div>
          <p className="caption">Lid · 10 spots · <span className="muted">add your photo at <code>public/laptop-lid.jpg</code></span></p>
        </div>
      )}

      {view === 'inside' && (
        <div className="laptop-view active">
          <div className="laptop inside-laptop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="laptop-photo" src="/laptop-inside.svg" alt="Asus interior — replace /public/laptop-inside.jpg with your photo" />
            {[11, 12, 13, 14, 15, 16, 17, 18].map((n) => {
              const p = INSIDE_POS[n];
              const s = byN(n);
              return (
                <button
                  key={n}
                  className={`spot s-small${!s.heldBy ? ' free' : ''}`}
                  style={{ ['--x' as string]: p.x, ['--y' as string]: p.y }}
                  title={`Spot ${n} — ${s.label}`}
                  onClick={() => onBid(n)}
                >{n}</button>
              );
            })}
          </div>
          <p className="caption">Inside · 8 palm-rest spots · <span className="muted">add your photo at <code>public/laptop-inside.jpg</code></span></p>
        </div>
      )}

      {view === 'gear' && (
        <div className="laptop-view active">
          <div className="gear-grid">
            <div className="gear-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/charger.svg" alt="Charger placeholder — replace /public/charger.jpg" />
              <button className="spot s-small" onClick={() => onBid(19)}>19</button>
              <p><strong>Spot 19</strong> · Charger + cable</p>
            </div>
            <div className="gear-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mouse.svg" alt="Mouse placeholder — replace /public/mouse.jpg" />
              <button className="spot s-small" onClick={() => onBid(20)}>20</button>
              <p><strong>Spot 20</strong> · Mouse</p>
            </div>
          </div>
          <p className="caption">Accessories · <span className="muted">add photos at <code>public/charger.jpg</code> + <code>public/mouse.jpg</code></span></p>
        </div>
      )}

      <div className="thumb-row">
        <button className={view === 'lid' ? 'thumb active' : 'thumb'} onClick={() => setView('lid')}>Lid · 10</button>
        <button className={view === 'inside' ? 'thumb active' : 'thumb'} onClick={() => setView('inside')}>Inside · 8</button>
        <button className={view === 'gear' ? 'thumb active' : 'thumb'} onClick={() => setView('gear')}>Gear · 2</button>
      </div>
    </div>
  );
}
