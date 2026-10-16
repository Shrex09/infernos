/* ─────────────────────────────────────────────────────────────
   Step 2 of the showcase pipeline: turn screenshots into card covers.

   Lays each project's shots out as a tilted masonry wall (the hero shot
   front and centre, a phone shot floating on top), renders that page in
   headless Chrome and saves it as WebP.

     npm run showcase:compose              # every project
     npm run showcase:compose -- etech mb  # just these slugs

   A project with no shots (site offline) falls back to stills pulled from
   public/compressed_<slug>.mp4 if that exists.
   Output: public/covers/<slug>.webp
───────────────────────────────────────────────────────────── */
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import ffmpeg from "ffmpeg-static";
import { COVERS_DIR, findBrowser, loadProjects, ROOT, SHOTS_DIR } from "./shared.mjs";

const OUT = { width: 1600, height: 1000 }; // the card's 16:10 frame
const PLANE_H = 2600;
const COLS = 5;
const COL_W = 620;
const GAP = 28;
const HERO_H = 388; // a full 16:10 viewport shot at COL_W
const HEIGHTS = [388, 270, 388, 330, 220, 388];
const OFFSETS = [-300, -40, 0, -200, -90]; // column 2 is re-centred on the hero below
const PLANE_W = COLS * COL_W + (COLS - 1) * GAP;

const desktopShots = (dir) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /^desktop-\d+\.png$/.test(f)).sort() : [];

// Pull six evenly spaced stills from an old screen-recording video
function framesFromVideo(video, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const probe = spawnSync(ffmpeg, ["-i", video], { encoding: "utf8" }).stderr;
  const [, h, m, s] = probe.match(/Duration: (\d+):(\d+):([\d.]+)/) ?? [];
  const duration = +h * 3600 + +m * 60 + +s || 10;
  for (let i = 0; i < 6; i++) {
    const at = ((i + 0.5) * duration) / 6;
    execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-ss", at.toFixed(2), "-i", video, "-frames:v", "1", path.join(dir, `desktop-${String(i).padStart(2, "0")}.png`)]);
  }
}

function tiles(shots) {
  const out = [];
  const others = shots.slice(1);
  let next = 0;
  for (let c = 0; c < COLS; c++) {
    const x = c * (COL_W + GAP);
    const heights = HEIGHTS.slice(c % HEIGHTS.length).concat(HEIGHTS);
    // Centre column: hero as the second tile, sitting dead centre of the plane
    let y = c === 2 ? PLANE_H / 2 - HERO_H / 2 - heights[0] - GAP : OFFSETS[c];
    for (let i = 0; y < PLANE_H; i++) {
      const hero = c === 2 && i === 1;
      const h = hero ? HERO_H : heights[i];
      const src = hero || !others.length ? shots[0] : others[next++ % others.length];
      // Short tiles crop a band out of the shot; vary which band so repeats differ
      const focus = ["top", "center", "bottom"][(c + i) % 3];
      out.push(
        `<div class="tile${hero ? " hero" : ""}" style="left:${x}px;top:${y}px;height:${h}px">` +
          `<img src="${src}" style="object-position:${focus}"></div>`
      );
      y += h + GAP;
    }
  }
  return out.join("");
}

function page(shots, hasPhone) {
  return `<!doctype html><meta charset="utf-8"><style>
    * { box-sizing: border-box; margin: 0; }
    html, body { width: ${OUT.width}px; height: ${OUT.height}px; overflow: hidden; }
    body {
      position: relative;
      background: radial-gradient(120% 90% at 50% 40%, #1a1210 0%, #0e0a09 45%, #070505 100%);
    }
    .plane {
      position: absolute;
      left: ${(OUT.width - PLANE_W) / 2}px; top: ${(OUT.height - PLANE_H) / 2}px;
      width: ${PLANE_W}px; height: ${PLANE_H}px;
      transform: perspective(3200px) rotateX(14deg) rotateZ(-9deg);
    }
    .tile {
      position: absolute; width: ${COL_W}px; overflow: hidden;
      border-radius: 14px;
      border: 1px solid rgba(243, 236, 228, 0.1);
      box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.7);
      background: #15100e;
    }
    .tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .tile:not(.hero) { filter: brightness(0.82); }
    .hero { box-shadow: 0 50px 120px -10px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 140, 70, 0.35); z-index: 2; }
    .phone {
      position: absolute; right: 15%; top: 50%;
      width: 250px; aspect-ratio: 390 / 844;
      transform: translateY(-42%) rotate(-9deg);
      border-radius: 36px; padding: 9px;
      background: #0b0807;
      border: 1px solid rgba(243, 236, 228, 0.18);
      box-shadow: 0 60px 120px -20px rgba(0, 0, 0, 0.95);
      z-index: 3;
    }
    .phone img { width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 28px; display: block; }
    .vignette {
      position: absolute; inset: 0; z-index: 4; pointer-events: none;
      background: radial-gradient(80% 90% at 50% 50%, transparent 60%, rgba(7, 5, 5, 0.55) 100%);
    }
  </style>
  <div class="plane">${tiles(shots)}</div>
  ${hasPhone ? `<div class="phone"><img src="mobile.png"></div>` : ""}
  <div class="vignette"></div>`;
}

const only = process.argv.slice(2);
const projects = loadProjects().filter((p) => !only.length || only.includes(p.slug));
fs.mkdirSync(COVERS_DIR, { recursive: true });

const browser = await puppeteer.launch({ executablePath: findBrowser(), headless: true });
const tab = await browser.newPage();
await tab.setViewport({ ...OUT, deviceScaleFactor: 1 });

for (const p of projects) {
  const dir = path.join(SHOTS_DIR, p.slug);
  let shots = desktopShots(dir);
  if (!shots.length) {
    const video = path.join(ROOT, "public", `compressed_${p.slug}.mp4`);
    if (!fs.existsSync(video)) {
      console.log(`✗ ${p.slug.padEnd(14)} no screenshots and no video — run showcase:capture first`);
      continue;
    }
    framesFromVideo(video, dir);
    shots = desktopShots(dir);
  }
  const hasPhone = fs.existsSync(path.join(dir, "mobile.png"));
  const html = path.join(dir, "cover.html");
  fs.writeFileSync(html, page(shots, hasPhone));
  await tab.goto(pathToFileURL(html).href, { waitUntil: "load" });
  const out = path.join(COVERS_DIR, `${p.slug}.webp`);
  await tab.screenshot({ path: out, type: "webp", quality: 80 });
  console.log(`✓ ${p.slug.padEnd(14)} ${(fs.statSync(out).size / 1024).toFixed(0).padStart(4)} KB`);
}
await browser.close();
