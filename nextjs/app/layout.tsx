import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrandMyAsus — Your brand on my Asus',
  description: 'Funding an Asus laptop by auctioning sticker spots on its lid, interior and gear. Bid for a spot and ride along.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
