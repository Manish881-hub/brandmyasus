# BrandMyAsus — Next.js

Auction your Asus laptop surfaces as sticker spots to fund the machine — same *interaction pattern* as brandmymac.com, rebuilt as original code + copy.

## Copy stance (per clone-site skill)
**Rebranded clone.** Same structure/flow (corner strip → hero → Lid/Inside/Gear visualizer → auction grid/table → day-by-day → how-it-works → specs → FAQ → corner → founder → footer), fresh wording, own CSS/SVG placeholders. **Zero copied text, images, or logos from the source.**

Reference: https://brandmymac.com/ (inventory 2026-09-15, landing page only).

## Run (Next.js App Router)
```bash
cd nextjs
npm install
npm run dev
# open http://localhost:3000
```

Build check:
```bash
npm run build
```

## Customize (single source of truth)
- `nextjs/lib/data.ts` → `SPOTS, MACHINE, FAQS, CORNER, FOUNDER`
- `nextjs/components/*` → one component per section, composed in `nextjs/app/page.tsx`
- `nextjs/app/globals.css` → theme tokens in `:root`

## Add your laptop photos
Drop in `nextjs/public/` (exact names):
`laptop-lid.jpg` (1600×1000), `laptop-inside.jpg` (1600×1000), `charger.jpg` (800×600), `mouse.jpg` (800×600), `founder.jpg` (square)
Then point `<img>` in `components/Visualizer.tsx` at the `.jpg` versions. See `nextjs/README.md`.

## Disclaimer
Independent project. Not affiliated with, endorsed by, or sponsored by ASUSTeK Computer Inc. ASUS / Zenbook / ROG / Vivobook belong to their owners.
