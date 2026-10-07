// Generates demo "screenshot" SVGs (mock UIs with sample data) into public/projects/<slug>/N.svg.
// Replace those files with real screenshots (keep the names, or update src/data/projects.ts).
import { mkdirSync, writeFileSync } from "node:fs";

const W = 1280, H = 800;
const FONT = "Arial, Helvetica, sans-serif";
const C = { bg: "#0b0b14", panel: "#14142a", panel2: "#1b1b36", line: "#26263f", text: "#f1f1f8", mute: "#8a8aa8", dim: "#5a5a7a" };
const accent = {
  "ree-gallery": ["#ec4899", "#f59e0b"],
  planflow: ["#1f7ae0", "#22d3ee"],
  databridge: ["#10b981", "#22d3ee"],
  supportpilot: ["#6366f1", "#a855f7"],
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
let uid = 0;
const T = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${o.size ?? 14}" font-weight="${o.w ?? 400}" fill="${o.fill ?? C.text}" text-anchor="${o.anchor ?? "start"}" opacity="${o.op ?? 1}">${esc(s)}</text>`;
const R = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 10}" fill="${o.fill ?? C.panel}"${o.stroke ? ` stroke="${o.stroke}"` : ""} opacity="${o.op ?? 1}"/>`;
const chip = (x, y, s, color, o = {}) => {
  const w = s.length * 6.1 + 22;
  return R(x, y, w, 24, { r: 12, fill: color, op: o.op ?? 0.18 }) + T(x + 11, y + 16, s, { size: 11.5, fill: o.text ?? color, w: 600 }) + `<g data-w="${w}"/>`;
};
const chipW = (s) => s.length * 6.1 + 22;
const avatar = (x, y, ch, color, r = 12) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>` + T(x, y + 4, ch, { size: r * 0.9, anchor: "middle", fill: "#fff", w: 700 });

function grad(a, b, vertical = false) {
  const id = `g${++uid}`;
  return { id, def: `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>` };
}

// Abstract artwork thumbnail
const palettes = [["#ec4899", "#f59e0b"], ["#6366f1", "#22d3ee"], ["#10b981", "#facc15"], ["#f43f5e", "#8b5cf6"], ["#0ea5e9", "#a3e635"], ["#f97316", "#be185d"]];
function art(x, y, w, h, seed, r = 12) {
  const [a, b] = palettes[seed % palettes.length];
  const g = grad(a, b), clip = `c${++uid}`;
  let shapes = "";
  const k = seed % 4;
  if (k === 0) shapes = `<circle cx="${x + w * 0.65}" cy="${y + h * 0.4}" r="${Math.min(w, h) * 0.28}" fill="#fff" opacity="0.28"/><circle cx="${x + w * 0.35}" cy="${y + h * 0.7}" r="${Math.min(w, h) * 0.18}" fill="#000" opacity="0.22"/>`;
  if (k === 1) shapes = `<path d="M${x} ${y + h * 0.7} Q${x + w * 0.3} ${y + h * 0.35} ${x + w * 0.55} ${y + h * 0.65} T${x + w} ${y + h * 0.5} V${y + h} H${x} Z" fill="#000" opacity="0.28"/><circle cx="${x + w * 0.72}" cy="${y + h * 0.25}" r="${Math.min(w, h) * 0.12}" fill="#fff" opacity="0.5"/>`;
  if (k === 2) shapes = `<rect x="${x + w * 0.15}" y="${y + h * 0.15}" width="${w * 0.4}" height="${h * 0.55}" fill="#fff" opacity="0.25"/><rect x="${x + w * 0.4}" y="${y + h * 0.35}" width="${w * 0.45}" height="${h * 0.5}" fill="#000" opacity="0.25"/>`;
  if (k === 3) shapes = Array.from({ length: 5 }, (_, i) => `<path d="M${x} ${y + h * (0.2 + i * 0.16)} Q${x + w * 0.5} ${y + h * (0.05 + i * 0.16)} ${x + w} ${y + h * (0.25 + i * 0.16)}" stroke="#fff" stroke-opacity="0.35" stroke-width="5" fill="none"/>`).join("");
  return `<defs>${g.def}<clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath></defs><g clip-path="url(#${clip})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${g.id})"/>${shapes}</g>`;
}

// App frame: window bar + sidebar + page title
function frame(slug, nav, active, title, subtitle, body) {
  const [a, b] = accent[slug];
  const g = grad(a, b);
  const items = nav.map((n, i) => {
    const y = 130 + i * 44;
    const on = i === active;
    return (on ? R(14, y - 8, 192, 36, { r: 8, fill: a, op: 0.18 }) : "") + T(34, y + 15, n, { size: 14.5, fill: on ? C.text : C.mute, w: on ? 700 : 400 });
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>${g.def}</defs>
<rect width="${W}" height="${H}" fill="${C.bg}"/>
<rect width="${W}" height="44" fill="#10101e"/>
<circle cx="24" cy="22" r="6" fill="#ff5f57"/><circle cx="44" cy="22" r="6" fill="#febc2e"/><circle cx="64" cy="22" r="6" fill="#28c840"/>
<rect x="0" y="44" width="220" height="${H - 44}" fill="#0f0f1c"/>
<rect x="20" y="68" width="26" height="26" rx="8" fill="url(#${g.id})"/>
${T(56, 87, slug === "ree-gallery" ? "Ree Gallery" : slug === "planflow" ? "PlanFlow" : slug === "databridge" ? "DataBridge" : "SupportPilot", { size: 16, w: 700 })}
${items}
${avatar(40, H - 40, "M", a, 14)}${T(64, H - 36, "MindArct Demo", { size: 12.5, fill: C.mute })}
${T(252, 98, title, { size: 28, w: 700 })}
${subtitle ? T(252, 122, subtitle, { size: 13.5, fill: C.mute }) : ""}
${body(a, b, `url(#${g.id})`)}
</svg>`;
}

const kpi = (x, y, w, label, value, delta, color) =>
  R(x, y, w, 104) + T(x + 20, y + 30, label, { size: 12.5, fill: C.mute }) + T(x + 20, y + 68, value, { size: 30, w: 700 }) + T(x + 20, y + 90, delta, { size: 12, fill: color, w: 600 });

function barChart(x, y, w, h, vals, labels, fillRef, title) {
  const max = Math.max(...vals), cw = w - 60, step = cw / vals.length;
  let o = R(x, y, w, h) + T(x + 24, y + 34, title, { size: 15, w: 700 });
  for (let i = 0; i <= 4; i++) {
    const gy = y + 70 + ((h - 120) * i) / 4;
    o += `<line x1="${x + 50}" y1="${gy}" x2="${x + w - 20}" y2="${gy}" stroke="${C.line}"/>` + T(x + 40, gy + 4, Math.round(max * (1 - i / 4)), { size: 11, fill: C.dim, anchor: "end" });
  }
  vals.forEach((v, i) => {
    const bh = ((h - 120) * v) / max, bx = x + 62 + i * step;
    o += `<rect x="${bx}" y="${y + h - 50 - bh}" width="${step * 0.55}" height="${bh}" rx="6" fill="${fillRef}"/>` + T(bx + step * 0.275, y + h - 26, labels[i], { size: 11, fill: C.dim, anchor: "middle" });
  });
  return o;
}

function lineChart(x, y, w, h, vals, labels, color, title) {
  const max = Math.max(...vals) * 1.15, min = 0;
  const px = (i) => x + 60 + (i * (w - 90)) / (vals.length - 1), py = (v) => y + 70 + (h - 120) * (1 - (v - min) / (max - min));
  let o = R(x, y, w, h) + T(x + 24, y + 34, title, { size: 15, w: 700 });
  for (let i = 0; i <= 4; i++) {
    const gy = y + 70 + ((h - 120) * i) / 4;
    o += `<line x1="${x + 50}" y1="${gy}" x2="${x + w - 20}" y2="${gy}" stroke="${C.line}"/>` + T(x + 40, gy + 4, Math.round(max * (1 - i / 4)), { size: 11, fill: C.dim, anchor: "end" });
  }
  const pts = vals.map((v, i) => `${px(i)},${py(v)}`).join(" ");
  o += `<polygon points="${px(0)},${y + h - 50} ${pts} ${px(vals.length - 1)},${y + h - 50}" fill="${color}" opacity="0.15"/><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>`;
  vals.forEach((v, i) => { o += `<circle cx="${px(i)}" cy="${py(v)}" r="4.5" fill="${C.bg}" stroke="${color}" stroke-width="2.5"/>` + T(px(i), y + h - 26, labels[i], { size: 11, fill: C.dim, anchor: "middle" }); });
  return o;
}

function table(x, y, w, cols, rows, rowH = 52) {
  let o = R(x, y, w, rowH * (rows.length + 1) + 8);
  let cx = x + 24;
  const xs = cols.map((c) => { const v = cx; cx += c.w; return v; });
  cols.forEach((c, i) => (o += T(xs[i], y + 33, c.h, { size: 12, fill: C.mute, w: 700 })));
  rows.forEach((r, ri) => {
    const ry = y + rowH * (ri + 1);
    o += `<line x1="${x + 16}" y1="${ry}" x2="${x + w - 16}" y2="${ry}" stroke="${C.line}"/>`;
    r.forEach((cell, i) => {
      if (cell && typeof cell === "object") o += chip(xs[i], ry + 14, cell.t, cell.c);
      else o += T(xs[i], ry + 32, cell, { size: 13.5, fill: i === 0 ? C.text : C.mute, w: i === 0 ? 600 : 400 });
    });
  });
  return o;
}

const OK = { t: "Ready", c: "#34d399" }, WARN = (t) => ({ t, c: "#fbbf24" }), ERR = (t) => ({ t, c: "#f87171" });

/* ---------------- Ree Gallery ---------------- */
const rgNav = ["Discover", "Collections", "Artists", "Favourites", "Admin"];
const artworks = [
  ["Silent Horizon", "Amira Khan", "$1,800", 190, 0], ["Neon Tide", "Leo Marsh", "$950", 250, 1], ["Paper Moon", "Sora Ito", "$1,200", 170, 2],
  ["Ember Fields", "Amira Khan", "$2,400", 230, 3], ["Quiet Grid", "Noor Hassan", "$700", 210, 4], ["Salt & Light", "Leo Marsh", "$1,500", 180, 5],
  ["Low Orbit", "Sora Ito", "$890", 150, 1], ["Velvet Static", "Noor Hassan", "$1,100", 200, 3],
];

function rgDiscover() {
  let o = "";
  ["All", "Abstract", "Portrait", "Landscape", "Sculpture", "Digital"].forEach((c, i, arr) => {
    const x = 252 + arr.slice(0, i).reduce((s, v) => s + chipW(v) + 12, 0);
    o += chip(x, 142, c, i === 0 ? "#ec4899" : "#8a8aa8", { op: i === 0 ? 0.9 : 0.14, text: i === 0 ? "#fff" : C.mute });
  });
  const colW = 230, gap = 18;
  const colY = [190, 190, 190, 190];
  artworks.forEach((a, i) => {
    const c = i % 4, x = 252 + c * (colW + gap), y = colY[c];
    o += art(x, y, colW, a[3], a[4]) + T(x + 2, y + a[3] + 22, a[0], { size: 14, w: 700 }) + T(x + 2, y + a[3] + 40, a[1] + "  ·  " + a[2], { size: 12, fill: C.mute });
    colY[c] += a[3] + 62;
  });
  return o;
}
function rgCollection() {
  let o = chip(252, 138, "24 works", "#ec4899") + chip(252 + chipW("24 works") + 10, 138, "6 artists", "#8a8aa8");
  const cw = 228, gap = 18;
  artworks.slice(0, 8).forEach((a, i) => {
    const c = i % 4, r = Math.floor(i / 4), x = 252 + c * (cw + gap), y = 184 + r * 300;
    o += R(x, y, cw, 280) + art(x + 10, y + 10, cw - 20, 180, a[4]) + T(x + 16, y + 218, a[0], { size: 14.5, w: 700 }) + T(x + 16, y + 238, a[1], { size: 12, fill: C.mute }) + T(x + 16, y + 262, a[2], { size: 14, w: 700, fill: "#f59e0b" }) + T(x + cw - 16, y + 262, "♡ " + (12 + i * 7), { size: 12, fill: C.mute, anchor: "end" });
  });
  return o;
}
function rgArtwork(a, b, gref) {
  let o = art(252, 144, 600, 590, 0, 16);
  o += T(890, 176, "Silent Horizon", { size: 30, w: 700 }) + T(890, 204, "by Amira Khan, 2024", { size: 14, fill: C.mute });
  [["Medium", "Acrylic on canvas"], ["Size", "90 × 120 cm"], ["Edition", "Original, 1 of 1"], ["Collection", "Abstract"]].forEach(([k, v], i) => {
    o += T(890, 258 + i * 34, k, { size: 13, fill: C.mute }) + T(1010, 258 + i * 34, v, { size: 13.5, w: 600 });
  });
  o += `<line x1="890" y1="410" x2="1228" y2="410" stroke="${C.line}"/>` + T(890, 460, "$1,800", { size: 36, w: 700, fill: "#f59e0b" }) + T(890, 484, "Free shipping · 14-day returns", { size: 12.5, fill: C.mute });
  o += R(890, 520, 338, 52, { r: 26, fill: gref }) + T(1059, 552, "Enquire about this piece", { size: 15, w: 700, anchor: "middle", fill: "#fff" });
  o += R(890, 586, 338, 52, { r: 26, fill: C.panel2, stroke: C.line }) + T(1059, 618, "♡  Save to favourites", { size: 15, w: 600, anchor: "middle" });
  o += T(890, 676, "More from Amira Khan", { size: 13, w: 700 }) + art(890, 690, 70, 46, 3, 8) + art(970, 690, 70, 46, 1, 8) + art(1050, 690, 70, 46, 4, 8);
  return o;
}
function rgAdmin(a) {
  let o = R(252, 142, 976, 110, { fill: C.panel, stroke: a }) + T(740, 190, "Drop images here or click to upload", { size: 17, w: 700, anchor: "middle" }) + T(740, 216, "JPG, PNG or WebP · up to 25 MB each · 3 uploading…", { size: 12.5, fill: C.mute, anchor: "middle" });
  o += R(480, 228, 520, 6, { r: 3, fill: C.line }) + R(480, 228, 330, 6, { r: 3, fill: a });
  o += table(252, 280, 976, [{ h: "ARTWORK", w: 250 }, { h: "ARTIST", w: 190 }, { h: "COLLECTION", w: 190 }, { h: "PRICE", w: 130 }, { h: "STATUS", w: 150 }], [
    ["Silent Horizon", "Amira Khan", "Abstract", "$1,800", { t: "Published", c: "#34d399" }],
    ["Neon Tide", "Leo Marsh", "Digital", "$950", { t: "Published", c: "#34d399" }],
    ["Paper Moon", "Sora Ito", "Abstract", "$1,200", { t: "Draft", c: "#fbbf24" }],
    ["Ember Fields", "Amira Khan", "Landscape", "$2,400", { t: "Published", c: "#34d399" }],
    ["Quiet Grid", "Noor Hassan", "Abstract", "$700", { t: "Scheduled", c: "#60a5fa" }],
    ["Low Orbit", "Sora Ito", "Digital", "$890", { t: "Draft", c: "#fbbf24" }],
  ], 56);
  return o;
}

/* ---------------- PlanFlow ---------------- */
const pfNav = ["Board", "Timeline", "Reports", "Clients", "Settings"];
function pfBoard(a) {
  const cols = [
    ["To do", "#8a8aa8", [["Design onboarding flow", "Design", "#a78bfa", "S"], ["Write API docs", "Docs", "#60a5fa", "K"], ["Set up staging env", "DevOps", "#34d399", "R"]]],
    ["In progress", "#fbbf24", [["Billing integration", "Backend", "#f472b6", "R"], ["Client portal v2", "Frontend", "#22d3ee", "S"], ["Email templates", "Design", "#a78bfa", "M"]]],
    ["Review", "#60a5fa", [["Reports export (CSV)", "Backend", "#f472b6", "K"], ["Mobile nav fixes", "Frontend", "#22d3ee", "M"]]],
    ["Done", "#34d399", [["Login & roles", "Backend", "#f472b6", "R"], ["Landing page", "Design", "#a78bfa", "S"], ["Project import", "Backend", "#f472b6", "K"]]],
  ];
  let o = "";
  cols.forEach(([name, color, cards], ci) => {
    const x = 252 + ci * 246;
    o += R(x, 142, 232, 600, { r: 14 }) + `<circle cx="${x + 20}" cy="170" r="5" fill="${color}"/>` + T(x + 34, 175, name, { size: 14, w: 700 }) + T(x + 214, 175, String(cards.length), { size: 12.5, fill: C.mute, anchor: "end" });
    cards.forEach(([t, tag, tc, av], i) => {
      const y = 196 + i * 128;
      o += R(x + 12, y, 208, 114, { r: 10, fill: C.panel2 }) + T(x + 26, y + 30, t, { size: 13.5, w: 600 }) + chip(x + 26, y + 46, tag, tc) + avatar(x + 38, y + 92, av, tc, 11) + T(x + 206, y + 96, `${3 + i * 2} / 8 pts`, { size: 11.5, fill: C.mute, anchor: "end" }) + R(x + 26, y + 72, 180, 4, { r: 2, fill: C.line }) + R(x + 26, y + 72, 40 + i * 35 + ci * 12, 4, { r: 2, fill: color });
    });
  });
  return o;
}
function pfTimeline(a, b, gref) {
  let o = R(252, 142, 976, 600, { r: 14 });
  const weeks = ["Oct 6", "Oct 13", "Oct 20", "Oct 27", "Nov 3", "Nov 10", "Nov 17"];
  weeks.forEach((w, i) => { const x = 440 + i * 112; o += T(x, 176, w, { size: 12, fill: C.mute }) + `<line x1="${x - 4}" y1="190" x2="${x - 4}" y2="730" stroke="${C.line}"/>`; });
  const rows = [["Discovery & scoping", 0, 1.5, "#8a8aa8"], ["UX design", 1, 2.5, "#a78bfa"], ["Backend API", 1.5, 4, "#f472b6"], ["Client portal", 3, 3.5, "#22d3ee"], ["Billing & plans", 3.5, 2.5, "#fbbf24"], ["QA & hardening", 5, 1.5, "#34d399"], ["Launch", 6.2, 0.7, "#60a5fa"]];
  rows.forEach(([n, s, l, c], i) => {
    const y = 210 + i * 74;
    o += T(272, y + 28, n, { size: 13.5, w: 600 }) + R(436 + s * 112, y + 8, l * 112, 34, { r: 8, fill: c, op: 0.85 }) + T(448 + s * 112, y + 30, `${Math.round(l * 7)}d`, { size: 12, w: 700, fill: "#0b0b14" });
  });
  o += `<line x1="${440 + 3.3 * 112}" y1="188" x2="${440 + 3.3 * 112}" y2="732" stroke="#f87171" stroke-width="2" stroke-dasharray="5 4"/>` + chip(440 + 3.3 * 112 - 22, 150, "Today", "#f87171");
  return o;
}
function pfReport(a, b, gref) {
  let o = kpi(252, 142, 232, "Tasks completed", "42", "▲ 12% vs last week", "#34d399") + kpi(498, 142, 232, "On-time delivery", "94%", "▲ 3 pts", "#34d399") + kpi(744, 142, 232, "Velocity (pts)", "58", "▲ 6 pts", "#34d399") + kpi(990, 142, 238, "Open risks", "3", "▼ 1 resolved", "#fbbf24");
  o += barChart(252, 268, 590, 474, [18, 26, 22, 34, 29, 42, 38], ["W1", "W2", "W3", "W4", "W5", "W6", "W7"], gref, "Tasks completed per week");
  o += R(858, 268, 370, 474) + T(882, 302, "Project progress", { size: 15, w: 700 });
  [["Client portal v2", 78], ["Billing integration", 64], ["Mobile app MVP", 41], ["Reporting engine", 92], ["Onboarding", 55]].forEach(([n, p], i) => {
    const y = 336 + i * 78;
    o += T(882, y + 16, n, { size: 13.5, w: 600 }) + T(1204, y + 16, p + "%", { size: 13, fill: C.mute, anchor: "end" }) + R(882, y + 28, 322, 8, { r: 4, fill: C.line }) + R(882, y + 28, (322 * p) / 100, 8, { r: 4, fill: gref });
  });
  return o;
}

/* ---------------- DataBridge ---------------- */
const dbNav = ["Mapping", "Preview", "Run history", "Reconciliation", "Connections"];
function dbMapping(a, b, gref) {
  let o = chip(252, 138, "Source: LegacyCRM", "#8a8aa8") + T(252 + chipW("Source: LegacyCRM") + 10, 156, "→", { size: 18, fill: C.mute }) + chip(252 + chipW("Source: LegacyCRM") + 40, 138, "Target: HubSpot", a);
  o += R(252, 184, 380, 500) + T(276, 216, "SOURCE FIELDS", { size: 12, fill: C.mute, w: 700 }) + R(848, 184, 380, 500) + T(872, 216, "TARGET FIELDS", { size: 12, fill: C.mute, w: 700 });
  const m = [["cust_name", "firstname + lastname", "Split on space"], ["email_addr", "email", "Lowercase, trim"], ["phone_no", "phone", "E.164 format"], ["created_dt", "createdate", "ISO 8601"], ["acct_status", "lifecyclestage", "Map values"], ["company", "company", "Direct"], ["notes_txt", "notes", "Strip HTML"]];
  m.forEach(([s, t, rule], i) => {
    const y = 236 + i * 62;
    o += R(268, y, 348, 46, { r: 8, fill: C.panel2 }) + T(286, y + 29, s, { size: 13.5, w: 600 }) + R(864, y, 348, 46, { r: 8, fill: C.panel2 }) + T(882, y + 29, t, { size: 13.5, w: 600 });
    o += `<path d="M616 ${y + 23} C 700 ${y + 23}, 780 ${y + 23}, 864 ${y + 23}" stroke="${a}" stroke-width="2" fill="none" opacity="0.75"/>` + R(668, y + 9, 144, 28, { r: 14, fill: C.bg, stroke: a }) + T(740, y + 28, rule, { size: 11.5, anchor: "middle", fill: a, w: 600 });
  });
  o += R(1050, 700, 178, 40, { r: 20, fill: gref }) + T(1139, 725, "Save mapping", { size: 14, w: 700, anchor: "middle", fill: "#06130f" });
  return o;
}
function dbPreview() {
  let o = chip(252, 138, "Dry run · 500 sample records", "#8a8aa8") + chip(252 + chipW("Dry run · 500 sample records") + 10, 138, "471 ready", "#34d399") + chip(252 + chipW("Dry run · 500 sample records") + 10 + chipW("471 ready") + 8, 138, "22 warnings", "#fbbf24") + chip(252 + chipW("Dry run · 500 sample records") + 10 + chipW("471 ready") + chipW("22 warnings") + 16, 138, "7 errors", "#f87171");
  o += table(252, 184, 976, [{ h: "SOURCE ID", w: 100 }, { h: "NAME", w: 160 }, { h: "EMAIL", w: 250 }, { h: "PHONE", w: 160 }, { h: "COMPANY", w: 130 }, { h: "RESULT", w: 80 }], [
    ["C-10482", "Maria Lopez", "maria.lopez@northwind.io", "+1 415 555 0132", "Northwind", OK],
    ["C-10483", "James Okafor", "j.okafor@brightlabs.com", "+44 20 7946 0958", "BrightLabs", OK],
    ["C-10484", "Chen Wei", "chen.wei@@acme.cn", "+86 10 5555 0187", "Acme CN", ERR("Invalid email")],
    ["C-10485", "Sara Ahmed", "sara@helio.co", "0555-0143", "Helio", WARN("Phone format")],
    ["C-10486", "Luca Rossi", "luca.rossi@vento.it", "+39 06 555 0176", "Vento", OK],
    ["C-10487", "Priya Nair", "priya@zenith.in", "+91 22 5555 0121", "Zenith", OK],
    ["C-10488", "Tom Becker", "tom.becker@kraftw.de", "+49 30 5555 0165", "Kraftwerk", OK],
    ["C-10489", "Aisha Rahman", "aisha@duneworks.ae", "+971 4 555 0109", "Duneworks", WARN("Duplicate?")],
  ], 56);
  return o;
}
function dbRecon(a, b, gref) {
  let o = kpi(252, 142, 232, "Source records", "412,880", "LegacyCRM", C.mute) + kpi(498, 142, 232, "Migrated", "412,880", "▲ 100% complete", "#34d399") + kpi(744, 142, 232, "Mismatches", "0", "All fields verified", "#34d399") + kpi(990, 142, 238, "Duration", "38m 12s", "Batch size 1,000", C.mute);
  o += R(252, 268, 976, 474) + T(276, 302, "Reconciliation by entity", { size: 15, w: 700 });
  [["Contacts", 184210, 184210], ["Companies", 41830, 41830], ["Deals", 62440, 62440], ["Activities", 98320, 98320], ["Attachments", 26080, 26080]].forEach(([n, s, t], i) => {
    const y = 336 + i * 78;
    o += T(276, y + 16, n, { size: 14, w: 600 }) + T(1204, y + 16, `${s.toLocaleString("en-US")} / ${t.toLocaleString("en-US")}  ✓`, { size: 13, fill: "#34d399", anchor: "end", w: 600 }) + R(276, y + 30, 928, 10, { r: 5, fill: C.line }) + R(276, y + 30, 928, 10, { r: 5, fill: gref });
  });
  return o;
}

/* ---------------- SupportPilot ---------------- */
const spNav = ["Conversations", "Analytics", "Knowledge base", "Widget", "Team"];
function spChat(a, b, gref) {
  let o = R(252, 142, 300, 600, { r: 14 }) + T(272, 176, "Open conversations", { size: 14, w: 700 });
  [["Dana K.", "How do I reset my password?", "2m", true], ["Mike R.", "Can I change my billing date?", "9m", false], ["Elena S.", "Do you support SSO?", "21m", false], ["Omar H.", "Invoice for March missing", "1h", false], ["Grace L.", "Export data as CSV?", "2h", false]].forEach(([n, m, t, on], i) => {
    const y = 196 + i * 90;
    o += (on ? R(262, y, 280, 80, { r: 10, fill: a, op: 0.16 }) : "") + avatar(290, y + 28, n[0], palettes[i][0], 16) + T(318, y + 26, n, { size: 13.5, w: 700 }) + T(526, y + 26, t, { size: 11.5, fill: C.mute, anchor: "end" }) + T(318, y + 48, m, { size: 12, fill: C.mute });
  });
  o += R(568, 142, 660, 600, { r: 14 }) + T(592, 176, "Dana K.", { size: 15, w: 700 }) + chip(666, 160, "AI handling", "#34d399") + `<line x1="568" y1="196" x2="1228" y2="196" stroke="${C.line}"/>`;
  o += R(592, 216, 400, 56, { r: 14, fill: C.panel2 }) + T(612, 240, "Hi! I forgot my password and the reset", { size: 13.5 }) + T(612, 260, "email never arrives. How do I reset it?", { size: 13.5 });
  o += R(740, 292, 464, 150, { r: 14, fill: gref }) + T(760, 318, "Sorry about that, Dana! Reset emails can take up to", { size: 13.5, fill: "#fff" }) + T(760, 340, "5 minutes and sometimes land in spam. If it still", { size: 13.5, fill: "#fff" }) + T(760, 362, "hasn't arrived, go to Settings → Security → Reset", { size: 13.5, fill: "#fff" }) + T(760, 384, "password and I'll send a new link right away.", { size: 13.5, fill: "#fff" }) + R(760, 402, 190, 24, { r: 12, fill: "#fff", op: 0.22 }) + T(773, 418, "📄 Help: Account recovery", { size: 11.5, fill: "#fff", w: 600 });
  o += R(592, 462, 330, 40, { r: 14, fill: C.panel2 }) + T(612, 487, "That worked, thank you!", { size: 13.5 });
  o += R(740, 522, 330, 40, { r: 14, fill: gref }) + T(760, 547, "Glad to help! Anything else?", { size: 13.5, fill: "#fff" });
  o += R(592, 680, 560, 44, { r: 22, fill: C.panel2, stroke: C.line }) + T(616, 707, "Type a reply or take over the chat…", { size: 13.5, fill: C.dim }) + R(1164, 680, 44, 44, { r: 22, fill: gref });
  return o;
}
function spAnalytics(a, b, gref) {
  let o = kpi(252, 142, 232, "Conversations", "3,284", "▲ 18% this month", "#34d399") + kpi(498, 142, 232, "Resolved by AI", "72%", "▲ 5 pts", "#34d399") + kpi(744, 142, 232, "Avg. response", "4.2s", "▼ 1.1s faster", "#34d399") + kpi(990, 142, 238, "Satisfaction", "4.6 / 5", "▲ 0.2", "#34d399");
  o += lineChart(252, 268, 620, 474, [210, 260, 240, 310, 290, 360, 410, 380, 450], ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"], "#a855f7", "Conversations per day");
  o += R(888, 268, 340, 474) + T(912, 302, "Top unanswered topics", { size: 15, w: 700 });
  [["Refund policy for annual plans", 38], ["Custom domain setup", 27], ["API rate limits", 21], ["Data export formats", 14], ["SAML single sign-on", 9]].forEach(([n, c], i) => {
    const y = 332 + i * 80;
    o += T(912, y + 18, n, { size: 13.5, w: 600 }) + T(1204, y + 18, `${c} asks`, { size: 12.5, fill: C.mute, anchor: "end" }) + R(912, y + 32, 292, 7, { r: 4, fill: C.line }) + R(912, y + 32, (292 * c) / 38, 7, { r: 4, fill: gref });
  });
  return o;
}
function spKb() {
  let o = chip(252, 138, "48 articles", "#6366f1") + chip(252 + chipW("48 articles") + 8, 138, "Last sync 12 min ago", "#34d399");
  o += table(252, 184, 976, [{ h: "ARTICLE", w: 330 }, { h: "SOURCE", w: 170 }, { h: "ANSWERS GIVEN", w: 160 }, { h: "ACCURACY", w: 130 }, { h: "STATUS", w: 150 }], [
    ["Account recovery", "help.example.com", "412", "98%", { t: "Synced", c: "#34d399" }],
    ["Billing & invoices", "Notion", "366", "96%", { t: "Synced", c: "#34d399" }],
    ["Getting started guide", "help.example.com", "341", "97%", { t: "Synced", c: "#34d399" }],
    ["API rate limits", "GitHub docs", "187", "91%", { t: "Needs review", c: "#fbbf24" }],
    ["Custom domain setup", "PDF upload", "164", "88%", { t: "Needs review", c: "#fbbf24" }],
    ["Refund policy", "Google Drive", "152", "93%", { t: "Synced", c: "#34d399" }],
    ["Data export formats", "—", "0", "—", { t: "Missing", c: "#f87171" }],
  ], 58);
  return o;
}

const sets = {
  "ree-gallery": [[rgNav, 0, "Discover", "Fresh work from 6 artists", rgDiscover], [rgNav, 1, "Abstract", "Collection", rgCollection], [rgNav, 1, "Artwork", "", rgArtwork], [rgNav, 4, "Admin", "Manage uploads and listings", rgAdmin]],
  planflow: [[pfNav, 0, "Client Portal Redesign", "Sprint 14 · Oct 6 – Oct 19", pfBoard], [pfNav, 1, "Timeline", "Q4 delivery plan", pfTimeline], [pfNav, 2, "Weekly report", "Auto-generated every Friday", pfReport]],
  databridge: [[dbNav, 0, "Field mapping", "Map and transform fields before import", dbMapping], [dbNav, 1, "Import preview", "Review results before running the migration", dbPreview], [dbNav, 3, "Reconciliation report", "Migration #014 · completed", dbRecon]],
  supportpilot: [[spNav, 0, "Conversations", "Live inbox", spChat], [spNav, 1, "Analytics", "Last 7 days", spAnalytics], [spNav, 2, "Knowledge base", "Sources the assistant answers from", spKb]],
};

for (const [slug, shots] of Object.entries(sets)) {
  if (slug === "ree-gallery") continue; // real photos: see scripts/build-ree-gallery.mjs
  mkdirSync(`public/projects/${slug}`, { recursive: true });
  shots.forEach(([nav, active, title, sub, body], i) => {
    writeFileSync(`public/projects/${slug}/${i + 1}.svg`, frame(slug, nav, active, title, sub, body));
  });
}
console.log("demo screenshots written");
