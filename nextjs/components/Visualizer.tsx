'use client';

import { useState } from 'react';
import type { Spot } from '@/lib/data';

type View = 'lid' | 'inside' | 'gear';

const LID_POS: Record<
  number,
  { x: string; y: string; cls: string }
> = {
  1: { x: '22%', y: '30%', cls: 's-large' },
  2: { x: '50%', y: '17%', cls: 's-large' },
  3: { x: '78%', y: '30%', cls: 's-large' },

  4: { x: '31%', y: '49%', cls: 's-small' },
  5: { x: '42%', y: '47%', cls: 's-small' },
  6: { x: '58%', y: '47%', cls: 's-small' },
  7: { x: '69%', y: '49%', cls: 's-small' },

  8: { x: '22%', y: '73%', cls: 's-med' },
  9: { x: '50%', y: '73%', cls: 's-med' },
  10: { x: '78%', y: '73%', cls: 's-med' },
};

const INSIDE_POS: Record<number, { x: string; y: string }> = {
  11: { x: '28%', y: '62%' },
  12: { x: '38%', y: '62%' },
  13: { x: '28%', y: '76%' },
  14: { x: '38%', y: '76%' },

  15: { x: '62%', y: '62%' },
  16: { x: '72%', y: '62%' },
  17: { x: '62%', y: '76%' },
  18: { x: '72%', y: '76%' },
};

export default function Visualizer({
  spots,
  onBid,
}: {
  spots: Spot[];
  onBid: (n: number) => void;
}) {
  const [view, setView] = useState<View>('lid');

  const open = spots.filter((s) => !s.heldBy).length;

  const byN = (n: number) => {
    return spots.find((s) => s.n === n);
  };

  const renderSpot = (
    n: number,
    x: string,
    y: string,
    cls: string = 's-small'
  ) => {
    const spot = byN(n);

    if (!spot) return null;

    return (
      <button
        key={n}
        type="button"
        className={`spot ${cls}${spot.heldBy ? ' taken' : ' free'}`}
        style={
          {
            '--x': x,
            '--y': y,
          } as React.CSSProperties
        }
        aria-label={`Bid on spot ${n}`}
        title={`Spot ${n} · ${spot.label}`}
        onClick={() => onBid(n)}
      >
        {n}
      </button>
    );
  };

  return (
    <div className="visualizer">
      <div className="visualizer-head">
        <div className="view-tabs" role="tablist" aria-label="Laptop views">
          <button
            type="button"
            className={view === 'lid' ? 'tab active' : 'tab'}
            onClick={() => setView('lid')}
            role="tab"
            aria-selected={view === 'lid'}
          >
            Lid
          </button>

          <button
            type="button"
            className={view === 'inside' ? 'tab active' : 'tab'}
            onClick={() => setView('inside')}
            role="tab"
            aria-selected={view === 'inside'}
          >
            Inside
          </button>

          <button
            type="button"
            className={view === 'gear' ? 'tab active' : 'tab'}
            onClick={() => setView('gear')}
            role="tab"
            aria-selected={view === 'gear'}
          >
            Gear
          </button>
        </div>

        <span className="free-badge">
          {open === 0
            ? 'all spots taken'
            : `${open} spot${open === 1 ? '' : 's'} still free`}
        </span>
      </div>

      {view === 'lid' && (
        <div className="laptop-view active">
          <div className="laptop-stage">
            <div className="laptop lid-laptop">
              <img
                className="laptop-photo"
                src="/laptop-lid.svg"
                alt="Asus laptop lid"
              />

              {Object.entries(LID_POS).map(([n, position]) =>
                renderSpot(
                  Number(n),
                  position.x,
                  position.y,
                  position.cls
                )
              )}

              <div className="asus-logo">ASUS</div>
            </div>

            <div className="gear-float charger-float">
              <img src="/charger.svg" alt="Charger" />
              <span>Charger + cable</span>
            </div>

            <div className="gear-float mouse-float">
              <img src="/mouse.svg" alt="Mouse" />
              <span>Magic mouse</span>
            </div>
          </div>

          <p className="caption">
            Lid · 10 spots · click a numbered spot to bid
          </p>
        </div>
      )}

      {view === 'inside' && (
        <div className="laptop-view active">
          <div className="laptop-stage inside-stage">
            <div className="laptop inside-laptop">
              <img
                className="laptop-photo"
                src="/laptop-inside.svg"
                alt="Asus laptop interior"
              />

              {Object.entries(INSIDE_POS).map(([n, position]) =>
                renderSpot(
                  Number(n),
                  position.x,
                  position.y,
                  's-small'
                )
              )}
            </div>
          </div>

          <p className="caption">
            Inside · 8 palm-rest spots · click a numbered spot to bid
          </p>
        </div>
      )}

      {view === 'gear' && (
        <div className="laptop-view active">
          <div className="gear-grid">
            <button
              type="button"
              className="gear-card"
              onClick={() => onBid(19)}
            >
              <div className="gear-image">
                <img src="/charger.svg" alt="Charger" />
                {renderSpot(19, '50%', '50%', 's-small')}
              </div>

              <p>
                <strong>Spot 19</strong>
                <span>Charger + cable</span>
              </p>
            </button>

            <button
              type="button"
              className="gear-card"
              onClick={() => onBid(20)}
            >
              <div className="gear-image">
                <img src="/mouse.svg" alt="Mouse" />
                {renderSpot(20, '50%', '50%', 's-small')}
              </div>

              <p>
                <strong>Spot 20</strong>
                <span>Mouse</span>
              </p>
            </button>
          </div>

          <p className="caption">
            Gear · 2 spots · click an item to bid
          </p>
        </div>
      )}

      <div className="thumb-row">
        <button
          type="button"
          className={view === 'lid' ? 'thumb active' : 'thumb'}
          onClick={() => setView('lid')}
        >
          Lid <span>· 10</span>
        </button>

        <button
          type="button"
          className={view === 'inside' ? 'thumb active' : 'thumb'}
          onClick={() => setView('inside')}
        >
          Inside <span>· 8</span>
        </button>

        <button
          type="button"
          className={view === 'gear' ? 'thumb active' : 'thumb'}
          onClick={() => setView('gear')}
        >
          Gear <span>· 2</span>
        </button>
      </div>
    </div>
  );
}
