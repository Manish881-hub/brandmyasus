'use client';
import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import CornerStrip from '@/components/CornerStrip';
import Auction from '@/components/Auction';
import BidModal from '@/components/BidModal';
import { CornerSection, DayByDay, Footer, Founder, Faq, Hero, HowItWorks, Specs } from '@/components/Sections';
import { SPOTS as INITIAL, type Spot } from '@/lib/data';
import type { Currency } from '@/lib/format';

export default function Page() {
  const [cur, setCur] = useState<Currency>('EUR');
  const [spots, setSpots] = useState<Spot[]>(INITIAL);
  const [selected, setSelected] = useState<number | null>(null);
  const spot = useMemo(() => spots.find((s) => s.n === selected) ?? null, [spots, selected]);

  const place = (n: number, brand: string, amount: number) => {
    setSpots((prev) => prev.map((s) => (s.n === n ? { ...s, price: amount, bids: s.bids + 1, heldBy: brand } : s)));
    setSelected(null);
  };

  return (
    <main id="top">
      <Header cur={cur} setCur={setCur} />
      <CornerStrip cur={cur} />
      <Hero spots={spots} cur={cur} onBid={setSelected} />
      <Auction spots={spots} cur={cur} onBid={setSelected} />
      <DayByDay cur={cur} />
      <HowItWorks />
      <Specs cur={cur} />
      <Faq />
      <CornerSection cur={cur} />
      <Founder />
      <Footer />
      <BidModal spot={spot} cur={cur} onClose={() => setSelected(null)} onPlace={place} />
    </main>
  );
}
