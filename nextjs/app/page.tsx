'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import CornerStrip from '@/components/CornerStrip';
import Auction from '@/components/Auction';
import BidModal from '@/components/BidModal';
import {
  CornerSection,
  DayByDay,
  Footer,
  Founder,
  Faq,
  Hero,
  HowItWorks,
  Specs,
} from '@/components/Sections';
import { createClient, hasSupabaseEnv } from '@/lib/supabase/client';
import { SPOTS as FALLBACK_SPOTS } from '@/lib/data';
import type { Spot } from '@/lib/data';
import type { Currency } from '@/lib/format';

type DbAuction = {
  id: string;
  name: string;
  currency: Currency;
  starting_bid: number;
  bid_increment: number;
  starts_at: string;
  ends_at: string;
  status: 'active' | 'ended' | 'draft' | 'scheduled' | 'cancelled';
  machine_price: number;
  goal: number;
};

type DbSpot = {
  id: string;
  auction_id: string;
  number: number;
  zone: 'lid' | 'inside' | 'gear';
  label: string;
  current_bid: number;
  highest_bidder_id: string | null;
  total_bids: number;
};

function mapSpot(row: DbSpot): Spot {
  return {
    id: row.id,
    n: row.number,
    zone: row.zone,
    label: row.label,
    size:
      row.zone === 'lid'
        ? 'sticker spot'
        : row.zone === 'inside'
          ? 'palm-rest spot'
          : 'accessory spot',
    price: row.current_bid,
    startingBid: row.current_bid,
    bids: row.total_bids,
    heldBy: row.highest_bidder_id,
  };
}

export default function Page() {
  const [cur, setCur] = useState<Currency>('EUR');
  const [auction, setAuction] = useState<DbAuction | null>(null);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const spot = useMemo(
    () => spots.find((s) => s.n === selected) ?? null,
    [spots, selected]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAuction() {
      setLoading(true);
      setError(null);

      if (!hasSupabaseEnv()) {
        // No env during build / before user configures Supabase — fall back to demo data so build passes
        if (!cancelled) {
          setAuction({
            id: 'demo-auction',
            name: 'BrandMyAsus — Demo Auction',
            currency: 'EUR',
            starting_bid: 59,
            bid_increment: 10,
            starts_at: new Date().toISOString(),
            ends_at: new Date(Date.now() + 86400000 * 14).toISOString(),
            status: 'active',
            machine_price: 1529,
            goal: 2529,
          });
          setSpots(FALLBACK_SPOTS);
          setLoading(false);
        }
        return;
      }

      const supabase = createClient();
      const { data: auctionRows, error: auctionError } = await supabase
        .from('auctions')
        .select(
          'id, name, currency, starting_bid, bid_increment, starts_at, ends_at, status, machine_price, goal'
        )
        .order('created_at', { ascending: false })
        .limit(1);

      if (auctionError) {
        if (!cancelled) {
          setError(auctionError.message);
          setLoading(false);
        }
        return;
      }

      const activeAuction = auctionRows?.[0] as DbAuction | undefined;

      if (!activeAuction) {
        if (!cancelled) {
          setError('No auction found. Run supabase/migrations/001_initial.sql seed.');
          setLoading(false);
        }
        return;
      }

      const { data: spotRows, error: spotError } = await createClient()
        .from('spots')
        .select(
          'id, auction_id, number, zone, label, current_bid, highest_bidder_id, total_bids'
        )
        .eq('auction_id', activeAuction.id)
        .order('number');

      if (spotError) {
        if (!cancelled) {
          setError(spotError.message);
          setLoading(false);
        }
        return;
      }

      if (!cancelled) {
        setAuction(activeAuction);
        setCur(activeAuction.currency as Currency);
        setSpots((spotRows ?? []).map((row) => mapSpot(row as DbSpot)));
        setLoading(false);
      }
    }

    void loadAuction();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!auction?.id) return;
    if (!hasSupabaseEnv()) return;
    if (auction.id === 'demo-auction') return;

    const supabase = createClient();
    const channel = supabase
      .channel(`auction-${auction.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'spots',
          filter: `auction_id=eq.${auction.id}`,
        },
        (payload) => {
          const row = payload.new as DbSpot;

          setSpots((current) =>
            current.map((spot) =>
              spot.n === row.number
                ? {
                    ...spot,
                    price: row.current_bid,
                    bids: row.total_bids,
                    heldBy: row.highest_bidder_id,
                  }
                : spot
            )
          );
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [auction?.id]);

  if (loading) {
    return (
      <main id="top" className="wrap">
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          loading auction...
        </div>
      </main>
    );
  }

  if (error || !auction) {
    return (
      <main id="top" className="wrap">
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>auction unavailable</h2>
          <p className="muted">{error ?? 'No auction found.'}</p>
          <p className="micro" style={{ marginTop: 8 }}>
            Tip: fill <code>.env.local</code> with your Supabase URL + publishable key and run the 3 migrations.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main id="top">
      <Header cur={cur} setCur={setCur} />
      <CornerStrip cur={cur} />

      <Hero
        spots={spots}
        cur={cur}
        onBid={setSelected}
      />

      <Auction
        auction={auction}
        spots={spots}
        cur={cur}
        onBid={setSelected}
      />

      <DayByDay cur={cur} />
      <HowItWorks />
      <Specs cur={cur} />
      <Faq />
      <CornerSection cur={cur} />
      <Founder />
      <Footer />

      <BidModal
        spot={spot}
        auction={auction}
        cur={cur}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}
