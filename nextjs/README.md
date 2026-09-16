# BrandMyAsus — Next.js (App Router)

Rebranded rebuild of the reference auction flow as original code. No copied text, images, or logos.

## Run
```bash
cd nextjs
npm install
npm run dev
# open http://localhost:3000
```

## Customize
- `lib/data.ts` → `SPOTS, MACHINE, FAQS, CORNER, FOUNDER`
- `components/` → one component per section, composed in `app/page.tsx`
- `app/globals.css` → theme tokens in `:root`

## Images
Drop real photos in `public/` (exact names):
`laptop-lid.jpg`, `laptop-inside.jpg`, `charger.jpg`, `mouse.jpg`, `founder.jpg`
Then point the `<img>` tags in `components/Visualizer.tsx` at the `.jpg` versions.
