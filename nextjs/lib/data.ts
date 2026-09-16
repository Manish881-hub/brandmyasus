// BrandMyAsus — single source of truth for copy/prices/specs.
// Original wording for the Asus rebrand. No text or assets copied from the reference site.

export type Zone = 'lid' | 'inside' | 'gear';

export interface Spot {
  n: number;
  zone: Zone;
  label: string;
  size: string;
  price: number; // EUR, current top bid (or starting price if available)
  startingBid: number;
  bids: number;
  heldBy: string | null;
}

export const FOUNDER = { name: 'Manish Bhaktisagar' };

export const MACHINE = {
  name: 'ASUS Zenbook 14", Grey',
  priceEur: 1529,
  specs: [
    ['Chip', 'Intel Core Ultra 7 / AMD Ryzen 7 (edit me)'],
    ['Memory', '16 GB LPDDR5X'],
    ['Storage', '1 TB PCIe SSD'],
    ['Display', '14" OLED 2.8K, 90 Hz'],
    ['Keyboard', 'Backlit, fingerprint sensor'],
    ['In the box', '65W charger + cable'],
  ] as [string, string][],
};

export const GOAL = { raisedEur: 8282, percent: 327 };

export const SPOTS: Spot[] = [
  { n: 1, zone: 'lid', label: 'Top left banner', size: 'L 9.5×5.5 cm', price: 1300, startingBid: 400, bids: 7, heldBy: 'Demo Brand A' },
  { n: 2, zone: 'lid', label: 'Marquee — above logo', size: 'L 9.5×5.5 cm', price: 1715, startingBid: 600, bids: 3, heldBy: 'Demo Brand B' },
  { n: 3, zone: 'lid', label: 'Top right banner', size: 'L 9.5×5.5 cm', price: 1010, startingBid: 400, bids: 19, heldBy: 'Demo Brand C' },
  { n: 4, zone: 'lid', label: 'Middle left', size: 'S 4.5×4.5 cm', price: 375, startingBid: 125, bids: 17, heldBy: 'Demo Brand D' },
  { n: 5, zone: 'lid', label: 'Inner left — beside logo', size: 'S 4.5×4.5 cm', price: 410, startingBid: 150, bids: 12, heldBy: 'Demo Brand E' },
  { n: 6, zone: 'lid', label: 'Inner right — beside logo', size: 'S 4.5×4.5 cm', price: 387, startingBid: 150, bids: 13, heldBy: 'Demo Brand F' },
  { n: 7, zone: 'lid', label: 'Middle right', size: 'S 4.5×4.5 cm', price: 370, startingBid: 125, bids: 11, heldBy: 'Demo Brand G' },
  { n: 8, zone: 'lid', label: 'Bottom left strip', size: 'M 9.5×4 cm', price: 676, startingBid: 200, bids: 14, heldBy: 'Demo Brand H' },
  { n: 9, zone: 'lid', label: 'Bottom center — under logo', size: 'M 9.5×4 cm', price: 820, startingBid: 250, bids: 22, heldBy: 'Demo Brand I' },
  { n: 10, zone: 'lid', label: 'Bottom right strip', size: 'M 9.5×4 cm', price: 550, startingBid: 200, bids: 16, heldBy: 'Demo Brand J' },
  { n: 11, zone: 'inside', label: 'Left palm rest — 1', size: 'S 4×4 cm', price: 39, startingBid: 39, bids: 1, heldBy: 'Demo Brand K' },
  { n: 12, zone: 'inside', label: 'Left palm rest — 2', size: 'S 4×4 cm', price: 59, startingBid: 59, bids: 1, heldBy: 'Demo Brand L' },
  { n: 13, zone: 'inside', label: 'Left palm rest — 3', size: 'S 4×4 cm', price: 39, startingBid: 39, bids: 1, heldBy: 'Demo Brand M' },
  { n: 14, zone: 'inside', label: 'Left palm rest — 4', size: 'S 4×4 cm', price: 59, startingBid: 59, bids: 1, heldBy: 'Demo Brand N' },
  { n: 15, zone: 'inside', label: 'Right palm rest — 1', size: 'S 4×4 cm', price: 76, startingBid: 59, bids: 1, heldBy: 'Demo Brand O' },
  { n: 16, zone: 'inside', label: 'Right palm rest — 2', size: 'S 4×4 cm', price: 49, startingBid: 39, bids: 2, heldBy: 'Demo Brand P' },
  { n: 17, zone: 'inside', label: 'Right palm rest — 3', size: 'S 4×4 cm', price: 59, startingBid: 59, bids: 0, heldBy: null },
  { n: 18, zone: 'inside', label: 'Right palm rest — 4', size: 'S 4×4 cm', price: 39, startingBid: 39, bids: 1, heldBy: 'Demo Brand Q' },
  { n: 19, zone: 'gear', label: 'Charger + cable', size: 'S 5×5 cm', price: 199, startingBid: 199, bids: 1, heldBy: 'Demo Brand R' },
  { n: 20, zone: 'gear', label: 'Mouse', size: 'S 4×2.5 cm', price: 110, startingBid: 85, bids: 3, heldBy: 'Demo Brand S' },
];

export const CORNER = [
  { handle: '@yourbrand', amount: 51, note: 'at the top now' },
  { handle: 'demo-shop.com', amount: 41, note: 'held 4d' },
  { handle: 'demo-app.com', amount: 31, note: 'held 15h' },
  { handle: 'demo-tool.com', amount: 21, note: 'held 1h' },
];

export const FAQS: [string, string][] = [
  ['Is this real?', 'Yes — demo frontend for now. The concept: real vinyl stickers on a real Asus that travels with me to cafés, events and shoots. Connect payments + printing when you launch.'],
  ['What do sponsors get?', 'A die-cut vinyl sticker on the machine, a linked listing on this page, and visibility in photos / vlogs where the laptop appears. No guaranteed impressions — just real-world + online presence.'],
  ['How does payment work? (demo)', 'This build is frontend-only. The intended flow: 20% deposit (min 10 €) to bid, auto-refund if outbid, remainder via payment link if you win. Wire Stripe / backend later.'],
  ['What if someone outbids me?', 'Outbids must beat the current bid by at least 10 €. You stay in the public bid history.'],
  ['Can any brand join?', 'Almost — every sponsor is approved by hand. I keep final say on what goes on the machine. Refused bids are refunded.'],
  ['Can I do this with my own laptop?', 'Yes — fork it, set your machine + prices in lib/data.ts, drop your laptop photos in public/.'],
];

export const DAYS = [
  { d: '7 Sep', bids: 5, total: 544, kept: 444 },
  { d: '6 Sep', bids: 1, total: 85, kept: 0 },
  { d: '4 Sep', bids: 3, total: 147, kept: 147 },
  { d: '1 Sep', bids: 3, total: 2930, kept: 2120 },
];
