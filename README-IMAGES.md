# Add your laptop images — BrandMyAsus

The site works right now with SVG placeholders. To use your real Asus photos:

1. Take 4 photos (straight-on, good light):
   - Lid closed, centered → export `1600×1000px` JPG
   - Inside open (keyboard + palm rests) → `1600×1000px` JPG
   - Charger + cable on plain background → `800×600px` JPG
   - Mouse on plain background → `800×600px` JPG

2. Drop them here (exact names):
```
assets/laptop-lid.jpg
assets/laptop-inside.jpg
assets/charger.jpg
assets/mouse.jpg
assets/founder.jpg   (optional, square)
assets/logos/<brand>.png (optional sponsor logos, 256×256)
```

3. No code change needed — `app.js → wireImageSlots()` auto-swaps
   placeholder `.svg` → your `.jpg` if the file exists.

4. Fine-tune sticker positions:
   - Open `index.html`, find `<button class="spot" style="--x:50%;--y:18%" ...>`
   - `--x` / `--y` are % over the photo. Nudge until numbers sit where stickers will go.

5. Edit copy/prices/specs in one place: `app.js → SPOTS, MACHINE, FAQS, CORNER, FOUNDER`.

Tip: keep placeholders in the repo so the page never breaks if a JPG is missing.
