# BrandMyAsus

Auction your Asus laptop surfaces as sticker spots to fund the machine — same *interaction pattern* as brandmymac.com, rebuilt as original code + copy.

## Copy stance (per clone-site skill)
**Rebranded clone (default).** Same structure/flow (corner strip → hero → Lid/Inside/Gear visualizer → auction grid/table → day-by-day → how-it-works → specs → FAQ → corner → founder → footer), fresh wording, own CSS/SVG placeholders. **Zero copied text, images, or logos from the source.** Do not scrape brandmymac.com assets. Source terms likely forbid cloning — this is an inspired rebuild, not a copy. If you own rights and want pixel-perfect, re-typeset manually.

Reference: https://brandmymac.com/ (inventory 2026-09-15, landing page only).

## Run
Two versions — same content, pick one.

Static (simplest, no build):
```bash
cd /run/media/manishbhaktisagar/DOCUMENTS/brandmyasus
python3 -m http.server 8000
# open http://localhost:8000
```

Next.js App Router (`nextjs/`, verified `tsc` + `next build` pass):
```bash
cd /run/media/manishbhaktisagar/DOCUMENTS/brandmyasus/nextjs
npm install
npm run dev
# open http://localhost:3000
```

## Customize (all in one place)
- Copy/prices/specs/FAQ: `app.js → SPOTS, MACHINE, FAQS, CORNER, FOUNDER`
- Sections: `index.html` in inventory order, one block per section
- Theme: `styles.css → :root`
- Leaderboard page: `leaderboard.html`

## Add your laptop photos
See `README-IMAGES.md`. Drop:
`assets/laptop-lid.jpg`, `assets/laptop-inside.jpg`, `assets/charger.jpg`, `assets/mouse.jpg`, `assets/founder.jpg`
— auto-used if present, placeholders otherwise. Nudge sticker dots via `--x/--y` in `index.html`.

## Verify (clone-site Phase 5)
- [ ] Desktop + mobile widths show every section
- [ ] Tabs Lid/Inside/Gear + spot modals + €/$ toggle work
- [ ] `grep -ri "Your brand, on my Mac\|Everyone recognises the apple\|Vincent" .` returns nothing (no copied strings)
- [ ] No hotlinked images from source — only local `assets/`

## Disclaimer
Independent project. Not affiliated with, endorsed by, or sponsored by ASUSTeK Computer Inc. ASUS / Zenbook / ROG / Vivobook belong to their owners.
