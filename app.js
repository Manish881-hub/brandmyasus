// BrandMyAsus — frontend demo (original code, no copied assets)
// Edit data below, then add your photos in assets/ (see README-IMAGES.md)

const EUR_TO_USD = 1.08;
let currency = 'EUR';

const FOUNDER = { name: 'Your Name' };

const MACHINE = {
  name: 'ASUS Zenbook 14", Grey',
  priceEur: 1529,
  specs: [
    ['Chip', 'Intel Core Ultra 7 / AMD Ryzen 7 (edit me)'],
    ['Memory', '16 GB LPDDR5X'],
    ['Storage', '1 TB PCIe SSD'],
    ['Display', '14" OLED 2.8K, 90 Hz'],
    ['Keyboard', 'Backlit, fingerprint sensor'],
    ['In the box', '65W charger + cable'],
  ],
  note: 'Priced in euros where I’m buying it. Anything past the goal funds the trips the laptop goes on.',
};

// 20 spots — same *idea* (lid / inside / gear auction) but original labels/prices.
// heldBy: null = available. logo: path in assets/logos/ or placeholder.
const SPOTS = [
  { n: 1, zone: 'lid', label: 'Top left banner', size: 'L 9.5×5.5 cm', price: 1300, bids: 7, heldBy: 'Demo Brand A', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 2, zone: 'lid', label: 'Marquee — above logo', size: 'L 9.5×5.5 cm', price: 1715, bids: 3, heldBy: 'Demo Brand B', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 3, zone: 'lid', label: 'Top right banner', size: 'L 9.5×5.5 cm', price: 1010, bids: 19, heldBy: 'Demo Brand C', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 4, zone: 'lid', label: 'Middle left', size: 'S 4.5×4.5 cm', price: 375, bids: 17, heldBy: 'Demo Brand D', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 5, zone: 'lid', label: 'Inner left — beside logo', size: 'S 4.5×4.5 cm', price: 410, bids: 12, heldBy: 'Demo Brand E', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 6, zone: 'lid', label: 'Inner right — beside logo', size: 'S 4.5×4.5 cm', price: 387, bids: 13, heldBy: 'Demo Brand F', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 7, zone: 'lid', label: 'Middle right', size: 'S 4.5×4.5 cm', price: 370, bids: 11, heldBy: 'Demo Brand G', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 8, zone: 'lid', label: 'Bottom left strip', size: 'M 9.5×4 cm', price: 676, bids: 14, heldBy: 'Demo Brand H', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 9, zone: 'lid', label: 'Bottom center — under logo', size: 'M 9.5×4 cm', price: 820, bids: 22, heldBy: 'Demo Brand I', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 10, zone: 'lid', label: 'Bottom right strip', size: 'M 9.5×4 cm', price: 550, bids: 16, heldBy: 'Demo Brand J', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 11, zone: 'inside', label: 'Left palm rest — 1', size: 'S 4×4 cm', price: 39, bids: 1, heldBy: 'Demo Brand K', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 12, zone: 'inside', label: 'Left palm rest — 2', size: 'S 4×4 cm', price: 59, bids: 1, heldBy: 'Demo Brand L', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 13, zone: 'inside', label: 'Left palm rest — 3', size: 'S 4×4 cm', price: 39, bids: 1, heldBy: 'Demo Brand M', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 14, zone: 'inside', label: 'Left palm rest — 4', size: 'S 4×4 cm', price: 59, bids: 1, heldBy: 'Demo Brand N', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 15, zone: 'inside', label: 'Right palm rest — 1', size: 'S 4×4 cm', price: 76, bids: 1, heldBy: 'Demo Brand O', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 16, zone: 'inside', label: 'Right palm rest — 2', size: 'S 4×4 cm', price: 49, bids: 2, heldBy: 'Demo Brand P', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 17, zone: 'inside', label: 'Right palm rest — 3', size: 'S 4×4 cm', price: 59, bids: 0, heldBy: null, logo: null, url: '#' },
  { n: 18, zone: 'inside', label: 'Right palm rest — 4', size: 'S 4×4 cm', price: 39, bids: 1, heldBy: 'Demo Brand Q', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 19, zone: 'gear', label: 'Charger + cable', size: 'S 5×5 cm', price: 199, bids: 1, heldBy: 'Demo Brand R', logo: 'assets/avatar-placeholder.svg', url: '#' },
  { n: 20, zone: 'gear', label: 'Mouse', size: 'S 4×2.5 cm', price: 110, bids: 3, heldBy: 'Demo Brand S', logo: 'assets/avatar-placeholder.svg', url: '#' },
];

const CORNER = [
  { handle: '@yourbrand', amount: 51, note: 'at the top now' },
  { handle: 'demo-shop.com', amount: 41, note: 'held 4d' },
  { handle: 'demo-app.com', amount: 31, note: 'held 15h' },
  { handle: 'demo-tool.com', amount: 21, note: 'held 1h' },
];

const FAQS = [
  ['Is this real?', 'Yes — demo frontend for now. The concept: real vinyl stickers on a real Asus that travels with me to cafés, events and shoots. Connect payments + printing when you launch.'],
  ['What do sponsors get?', 'A die-cut vinyl sticker on the machine, a linked listing on this page, and visibility in photos / vlogs where the laptop appears. No guaranteed impressions — just real-world + online presence.'],
  ['How does payment work? (demo)', 'This build is frontend-only. The intended flow: 20% deposit (min 10 €) to bid, auto-refund if outbid, remainder via payment link if you win. Wire Stripe / backend later.'],
  ['What if someone outbids me?', 'Outbids must beat the current bid by at least 10 €. You stay in the public bid history.'],
  ['Can any brand join?', 'Almost — every sponsor is approved by hand. I keep final say on what goes on the machine. Refused bids are refunded.'],
  ['Can I do this with my own laptop?', 'Yes — that’s the point of this template. Fork it, set your machine + prices in app.js, drop your laptop photos in assets/.'],
];

const DAYS = [
  { d: '7 Sep', bids: 5, total: 544, kept: 444 },
  { d: '6 Sep', bids: 1, total: 85, kept: 0 },
  { d: '4 Sep', bids: 3, total: 147, kept: 147 },
  { d: '1 Sep', bids: 3, total: 2930, kept: 2120 },
];

// ---------- helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function fmt(eur) {
  if (currency === 'EUR') return `${eur.toLocaleString('en-IE').replace(/,/g, ' ')} €`;
  return `$${Math.round(eur * EUR_TO_USD).toLocaleString('en-US')}`;
}
function refreshMoney() {
  $$('[data-eur]').forEach(el => {
    const v = Number(el.dataset.eur);
    if (!Number.isFinite(v)) return;
    // keep "Claim — 61 €" style buttons in sync
    if (el.id === 'bidDeposit') return;
    if (el.tagName === 'BUTTON' && el.id.startsWith('claim')) return;
    el.textContent = el.textContent.replace(/[0-9][0-9\s,]*\s?[€$]/, fmt(v)).replace(/^\s*\d.*$/, fmt(v));
    // simpler: if element only holds a price, overwrite
    if (/^\s*[\d\s,]+ ?[€$]\s*$/.test(el.textContent) || el.hasAttribute('data-money')) el.textContent = fmt(v);
  });
  $('#raisedEur').textContent = fmt(8282);
  $('#machinePrice').textContent = fmt(MACHINE.priceEur);
  renderSpots(); // re-render prices
}

// ---------- render ----------
function renderTop3() {
  const top = [...SPOTS].sort((a, b) => b.price - a.price).slice(0, 3);
  $('#top3').innerHTML = top.map((s, i) => `
    <div class="top3-card">
      <span class="rank">${i + 1}</span>
      <img src="${s.logo || 'assets/avatar-placeholder.svg'}" alt="" />
      <div><strong>${s.heldBy || 'Available'}</strong> · ${s.label}<br/><strong>${fmt(s.price)}</strong></div>
    </div>`).join('');
}

function renderSpots() {
  const grid = $('#spotsGrid');
  if (!grid) return;
  grid.innerHTML = SPOTS.map(s => `
    <div class="spot-card">
      <div class="row"><span class="badge ${s.heldBy ? '' : 'free'}">${s.n} · ${s.zone}</span><span class="meta">${s.size}</span></div>
      <div><strong>${s.label}</strong></div>
      <div class="row"><span class="bid">${fmt(s.price)}</span><span class="meta">${s.bids} bids</span></div>
      <div class="row"><span class="meta">${s.heldBy ? 'Held by <strong>' + s.heldBy + '</strong>' : 'Available'}</span></div>
      <button class="btn ${s.heldBy ? 'btn-ghost' : 'btn-dark'}" data-bid="${s.n}">${s.heldBy ? 'Outbid' : 'Bid'}</button>
    </div>`).join('');
  const tb = $('#spotsTable tbody');
  tb.innerHTML = SPOTS.map(s => `
    <tr><td><strong>${s.n}</strong> ${s.label}</td><td>${s.size}</td>
    <td>${s.heldBy || '<em>Available</em>'}</td><td><strong>${fmt(s.price)}</strong> · ${s.bids} bids</td>
    <td><button class="btn btn-small ${s.heldBy ? '' : 'btn-dark'}" data-bid="${s.n}">${s.heldBy ? 'Outbid' : 'Bid'}</button></td></tr>`).join('');
  $$('[data-bid]').forEach(b => b.onclick = () => openBid(Number(b.dataset.bid)));
  const open = SPOTS.filter(s => !s.heldBy).length;
  $('#openCount').textContent = open;
  $('#takenCount').textContent = SPOTS.length - open;
  $('#freeBadge').textContent = open === 0 ? 'all spots taken' : `${open} spot${open > 1 ? 's' : ''} still free`;
  $('#bidCount').textContent = SPOTS.reduce((a, s) => a + s.bids, 0);
}

function renderSpecs() {
  $('#machineName').textContent = MACHINE.name;
  $('#machinePrice').textContent = fmt(MACHINE.priceEur);
  $('#specList').innerHTML = MACHINE.specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('#founderName').textContent = FOUNDER.name;
}

function renderFaq() {
  $('#faqList').innerHTML = FAQS.map(([q, a]) => `<details><summary>${q}</summary><p class="muted">${a}</p></details>`).join('');
}
function renderCorner() {
  $('#cornerList').innerHTML = CORNER.map(c => `
    <li><img src="assets/avatar-placeholder.svg" width="36" height="36" alt="" />
    <span><strong>${c.handle}</strong> · ${fmt(c.amount)} · <span class="muted">${c.note}</span></span></li>`).join('');
}
function renderDays() {
  $('#days').innerHTML = DAYS.map(d => `<div class="day"><strong>${d.d}</strong> · ${d.bids} bids · <span class="muted">${fmt(d.total)} bid · ${fmt(d.kept)} still standing</span></div>`).join('');
}

// ---------- laptop image slots: use your photo if present, else placeholder ----------
function wireImageSlots() {
  // If you add assets/laptop-lid.jpg etc., they will be used automatically.
  const slots = { lid: 'assets/laptop-lid.jpg', inside: 'assets/laptop-inside.jpg', charger: 'assets/charger.jpg', mouse: 'assets/mouse.jpg' };
  $$('img[data-slot]').forEach(img => {
    const wanted = slots[img.dataset.slot];
    if (!wanted) return;
    const test = new Image();
    test.onload = () => { img.src = wanted; };
    test.src = wanted; // if 404, onerror -> keep placeholder svg
  });
}

// ---------- tabs / modal / currency ----------
function wireTabs() {
  const set = (v) => {
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === v));
    $$('.thumb').forEach(t => t.classList.toggle('active', t.dataset.view === v));
    $$('.laptop-view').forEach(p => p.classList.toggle('active', p.dataset.pane === v));
  };
  $$('.tab,.thumb').forEach(b => b.onclick = () => set(b.dataset.view));
  $$('#stage .spot').forEach(b => b.onclick = () => openBid(Number(b.dataset.spot)));
}

let currentSpot = 17;
function openBid(n) {
  currentSpot = n;
  const s = SPOTS.find(x => x.n === n);
  $('#bidSpotN').textContent = n;
  $('#bidSpotMeta').textContent = `${s.label} · ${s.size} · ${s.heldBy ? 'current ' + fmt(s.price) : 'from ' + fmt(s.price)}`;
  $('#bidAmount').value = s.heldBy ? s.price + 10 : s.price;
  updateDeposit();
  $('#bidModal').hidden = false;
}
function updateDeposit() {
  const v = Number($('#bidAmount').value || 0);
  $('#bidDeposit').textContent = fmt(Math.max(10, Math.round(v * 0.2)));
}
function wireModal() {
  $('#bidClose').onclick = () => $('#bidModal').hidden = true;
  $('#bidModal').addEventListener('click', e => { if (e.target.id === 'bidModal') e.target.hidden = true; });
  $('#bidAmount').oninput = updateDeposit;
  $('#bidSubmit').onclick = () => {
    const s = SPOTS.find(x => x.n === currentSpot);
    const v = Number($('#bidAmount').value || 0);
    const min = s.heldBy ? s.price + 10 : s.price;
    if (v < min) { alert(`Bid must be at least ${fmt(min)} (outbids +10).`); return; }
    const brand = $('#bidBrand').value.trim() || 'You';
    s.price = v; s.bids += 1; s.heldBy = brand;
    $('#bidModal').hidden = true;
    renderSpots(); renderTop3();
    $('#todayText').textContent = `${brand} just bid ${fmt(v)} on spot ${s.n} — demo only, stored in memory.`;
  };
  const claim = () => alert('Demo: connect a payment link here to sell the corner slot.');
  $('#claimCornerBtn').onclick = claim;
  $('#claimCornerBtn2').onclick = claim;
}

function wireChrome() {
  $('#menuBtn').onclick = () => $('#mobileNav').classList.toggle('open');
  $$('.cur').forEach(b => b.onclick = () => {
    $$('.cur').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); currency = b.dataset.cur; refreshMoney();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSpecs(); renderTop3(); renderSpots(); renderFaq(); renderCorner(); renderDays();
  wireTabs(); wireModal(); wireChrome(); wireImageSlots();
});
