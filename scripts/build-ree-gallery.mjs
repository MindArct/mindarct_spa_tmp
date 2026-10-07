// Builds Ree Gallery screenshots from the real photos in the Ree Gallery project.
// Usage: node scripts/build-ree-gallery.mjs   (writes public/projects/ree-gallery/N.webp)
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "D:/web-dev/lovable/re-gallery-studio/src/assets/";
const OUT = "public/projects/ree-gallery/";
const W = 1280, H = 800, FONT = "Georgia, 'Times New Roman', serif", SANS = "Arial, Helvetica, sans-serif";
mkdirSync(OUT, { recursive: true });

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const cache = {};
async function img(name, w, h) {
  const k = `${name}-${w}x${h}`;
  if (!cache[k]) {
    const buf = await sharp(SRC + name + ".jpg").resize(Math.round(w), Math.round(h), { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
    cache[k] = "data:image/jpeg;base64," + buf.toString("base64");
  }
  return cache[k];
}
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-family="${o.font ?? SANS}" font-size="${o.size ?? 14}" font-weight="${o.w ?? 400}" fill="${o.fill ?? "#fff"}" text-anchor="${o.anchor ?? "start"}" opacity="${o.op ?? 1}" letter-spacing="${o.ls ?? 0}">${esc(s)}</text>`;
const photo = async (name, x, y, w, h, r = 10) => {
  const id = `c${Math.random().toString(36).slice(2, 8)}`;
  return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath><image href="${await img(name, w, h)}" x="${x}" y="${y}" width="${w}" height="${h}" clip-path="url(#${id})"/>`;
};
const GOLD = "#d4a85a";

const navbar = (active) => {
  const items = ["Home", "About", "Albums", "Packages", "Blog", "Booking"];
  let x = 470, o = `<rect width="${W}" height="64" fill="#0a0806" opacity="0.72"/>` + T(48, 40, "RE GALLERY", { font: FONT, size: 22, w: 700, fill: GOLD, ls: 3 });
  items.forEach((n) => { o += T(x, 39, n, { size: 14, fill: n === active ? GOLD : "#e8e0d2", w: n === active ? 700 : 400 }); x += n.length * 8 + 34; });
  return o + `<rect x="${W - 168}" y="16" width="120" height="34" rx="17" fill="${GOLD}"/>` + T(W - 108, 38, "Book now", { size: 13.5, w: 700, anchor: "middle", fill: "#1a1208" });
};
const wrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#0f0c09"/>${body}</svg>`;
const save = (svg, n) => sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(`${OUT}${n}.webp`);

// 1. Home
await save(wrap(
  `<image href="${await img("hero", W, H)}" width="${W}" height="${H}"/>` +
  `<defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0.35" stop-color="#0a0806" stop-opacity="0"/><stop offset="1" stop-color="#0a0806" stop-opacity="0.92"/></linearGradient><linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a0806" stop-opacity="0.75"/><stop offset="0.7" stop-color="#0a0806" stop-opacity="0"/></linearGradient></defs>` +
  `<rect width="${W}" height="${H}" fill="url(#l)"/><rect width="${W}" height="${H}" fill="url(#v)"/>` + navbar("Home") +
  T(72, 470, "EVENTS · PHOTOGRAPHY · CINEMATIC FILM", { size: 13, fill: GOLD, ls: 4, w: 700 }) +
  T(72, 540, "Every moment,", { font: FONT, size: 64, w: 700 }) + T(72, 612, "beautifully told.", { font: FONT, size: 64, w: 700, fill: GOLD }) +
  T(72, 654, "Weddings, celebrations and live events, captured with an emotional, cinematic eye.", { size: 17, fill: "#e8e0d2" }) +
  `<rect x="72" y="690" width="170" height="48" rx="24" fill="${GOLD}"/>` + T(157, 720, "View albums", { size: 15, w: 700, anchor: "middle", fill: "#1a1208" }) +
  `<rect x="258" y="690" width="170" height="48" rx="24" fill="none" stroke="#e8e0d2"/>` + T(343, 720, "Book a session", { size: 15, w: 600, anchor: "middle" }) +
  [["1,200+", "Events covered"], ["8 yrs", "Experience"], ["4.9", "Client rating"]].map(([v, l], i) => T(780 + i * 160, 700, v, { font: FONT, size: 32, w: 700, fill: GOLD }) + T(780 + i * 160, 724, l, { size: 12.5, fill: "#cfc6b6" })).join("")
), 1);

// 2. Albums grid
const albums = [["gallery-1", "Holud Celebration", "Wedding · 142 photos"], ["gallery-2", "Mehndi Details", "Wedding · 96 photos"], ["gallery-3", "Reception Night", "Wedding · 210 photos"], ["gallery-4", "Behind the Lens", "Film · 64 photos"], ["gallery-5", "Live Concert", "Event · 118 photos"], ["gallery-6", "Birthday Joy", "Family · 72 photos"]];
let grid = "";
for (let i = 0; i < albums.length; i++) {
  const [n, t, m] = albums[i], x = 48 + (i % 3) * 405, y = 230 + Math.floor(i / 3) * 270;
  grid += await photo(n, x, y, 385, 215, 12) + `<rect x="${x}" y="${y + 150}" width="385" height="65" rx="0" fill="#0a0806" opacity="0.0"/>` +
    T(x + 4, y + 238, t, { font: FONT, size: 18, w: 700 }) + T(x + 381, y + 238, m, { size: 12, fill: "#a99f8e", anchor: "end" });
}
let chips = "", cx = 48;
["All", "Wedding", "Holud", "Corporate", "Birthday", "Concert"].forEach((c, i) => { const w = c.length * 8 + 32; chips += `<rect x="${cx}" y="180" width="${w}" height="32" rx="16" fill="${i === 0 ? GOLD : "#1e1913"}"/>` + T(cx + w / 2, 201, c, { size: 13, anchor: "middle", fill: i === 0 ? "#1a1208" : "#cfc6b6", w: 600 }); cx += w + 10; });
await save(wrap(navbar("Albums") + T(48, 128, "Albums", { font: FONT, size: 44, w: 700 }) + T(48, 158, "Stories from the weddings, celebrations and events we have had the joy to capture.", { size: 15, fill: "#a99f8e" }) + chips + grid), 2);

// 3. Album details
const lay = [["gallery-1", 48, 200, 400, 300], ["gallery-7", 464, 200, 280, 400], ["gallery-3", 760, 200, 472, 300], ["gallery-2", 48, 516, 400, 240], ["gallery-4", 760, 516, 472, 240], ["gallery-6", 464, 616, 280, 140]];
let masonry = "";
for (const [n, x, y, w, h] of lay) masonry += await photo(n, x, y, w, h, 10);
await save(wrap(navbar("Albums") + T(48, 120, "← All albums", { size: 13, fill: GOLD }) + T(48, 160, "Wedding Highlights", { font: FONT, size: 38, w: 700 }) + T(520, 160, "Wedding  ·  Dhaka  ·  142 photos  ·  Video highlight included", { size: 14, fill: "#a99f8e" }) + masonry), 3);

// 4. Booking
const field = (x, y, w, label, value) => T(x, y, label, { size: 12, fill: "#a99f8e", w: 600 }) + `<rect x="${x}" y="${y + 10}" width="${w}" height="44" rx="10" fill="#1e1913" stroke="#3a3228"/>` + T(x + 16, y + 38, value, { size: 14.5, fill: value.startsWith("Select") ? "#7a705f" : "#f1e9da" });
await save(wrap(
  navbar("Booking") + (await photo("gallery-1", 48, 110, 440, 650, 16)) +
  `<defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0.5" stop-color="#0a0806" stop-opacity="0"/><stop offset="1" stop-color="#0a0806" stop-opacity="0.9"/></linearGradient></defs><rect x="48" y="110" width="440" height="650" rx="16" fill="url(#b)"/>` +
  T(72, 700, "“They made our day feel like", { font: FONT, size: 20, fill: "#fff" }) + T(72, 728, "a film.”  - Nadia & Imran", { font: FONT, size: 20, fill: GOLD }) +
  T(540, 150, "Book your session", { font: FONT, size: 38, w: 700 }) + T(540, 180, "Tell us about your event and we will reply within one business day.", { size: 14.5, fill: "#a99f8e" }) +
  field(540, 220, 330, "FULL NAME", "Nadia Rahman") + field(890, 220, 342, "PHONE", "+880 1711 000000") +
  field(540, 306, 330, "EVENT TYPE", "Wedding") + field(890, 306, 342, "EVENT DATE", "14 Dec 2026") +
  field(540, 392, 692, "VENUE", "Lakeshore Banquet Hall, Dhaka") +
  T(540, 490, "PACKAGE", { size: 12, fill: "#a99f8e", w: 600 }) +
  [["Silver", "Photography"], ["Gold", "Photo + Video"], ["Platinum", "Full coverage"]].map(([n, d], i) => {
    const x = 540 + i * 235, on = i === 1;
    return `<rect x="${x}" y="500" width="222" height="84" rx="12" fill="${on ? "#2a2113" : "#1e1913"}" stroke="${on ? GOLD : "#3a3228"}"/>` + T(x + 18, 534, n, { font: FONT, size: 20, w: 700, fill: on ? GOLD : "#f1e9da" }) + T(x + 18, 560, d, { size: 13, fill: "#a99f8e" });
  }).join("") +
  field(540, 620, 692, "MESSAGE", "We would love a cinematic highlight film too.") +
  `<rect x="540" y="708" width="220" height="52" rx="26" fill="${GOLD}"/>` + T(650, 741, "Send booking request", { size: 15, w: 700, anchor: "middle", fill: "#1a1208" })
), 4);
console.log("ree gallery screenshots written");
