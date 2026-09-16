'use client';
import type { Currency } from '@/lib/format';

export default function Header({ cur, setCur }: { cur: Currency; setCur: (c: Currency) => void }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="BrandMyAsus home">
          <span className="brand-mark">B</span>
          <span className="brand-text">BrandMy<em>Asus</em></span>
        </a>
        <nav className="main-nav" aria-label="Main">
          <a href="#spots">Live auction</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="#how">How it works</a>
          <a href="#corner">The corner</a>
        </nav>
        <div className="header-actions">
          <div className="currency" role="group" aria-label="Currency">
            <button className={cur === 'EUR' ? 'cur active' : 'cur'} onClick={() => setCur('EUR')}>€</button>
            <button className={cur === 'USD' ? 'cur active' : 'cur'} onClick={() => setCur('USD')}>$</button>
          </div>
          <a href="#spots" className="btn btn-dark">Get a spot</a>
        </div>
      </div>
    </header>
  );
}
