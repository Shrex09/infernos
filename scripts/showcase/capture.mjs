/* ─────────────────────────────────────────────────────────────
   Step 1 of the showcase pipeline: screenshot every live project.

   Opens each project's link in headless Chrome, scrolls the whole page
   (so lazy images and scroll reveals fire), then saves a run of desktop
   viewport shots down the page plus one phone-sized shot of the top.

     npm run showcase:capture              # every project
     npm run showcase:capture -- etech mb  # just these slugs

   Output: scripts/showcase/.shots/<slug>/desktop-00.png … mobile.png
   Then run showcase:compose to turn the shots into card covers.
───────────────────────────────────────────────────────────── */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findBrowser, loadProjects, SHOTS_DIR } from "./shared.mjs";

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const MAX_SHOTS = 8;
const SETTLE_MS = 4000; // preloaders and intro animations

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Walk to the bottom in viewport-sized steps so IntersectionObserver-driven
// content (lazy images, fade-ins) has rendered before we shoot
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
  await sleep(800);
}

// Cookie bars and floating chat bubbles are clutter in a collage. Class names
// differ on every site, so judge fixed elements by what they look like instead:
// anything pinned that mentions cookies, a small button parked in a corner, or
// the dimmed backdrop a modal leaves behind.
async function hideOverlays(page) {
  await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed" && style.position !== "sticky") continue;
      const r = el.getBoundingClientRect();
      const text = (el.textContent || "").trim();
      const mentionsCookies = /cookie|consent/i.test(text) && text.length < 2000;
      const cornerBubble = r.width < 120 && r.height < 120 && r.bottom > vh * 0.7 && (r.right > vw * 0.8 || r.left < vw * 0.2);
      const alpha = parseFloat(style.backgroundColor.split(",")[3] ?? "1");
      const backdrop =
        r.width >= vw * 0.9 && r.height >= vh * 0.9 && text.length < 5 &&
        ((alpha > 0 && alpha < 1) || style.backdropFilter !== "none");
      if (mentionsCookies || cornerBubble || backdrop) el.style.setProperty("display", "none", "important");
    }
  });
}

async function open(browser, url, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  if (viewport.isMobile) {
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36"
    );
  }
  const res = await page.goto(url, { waitUntil: "load", timeout: 60_000 }).catch(() => null);
  if (!res) throw new Error("site unreachable — compose will fall back to the project's video if it has one");
  // Image-sequence preloaders (E-Tech) keep fetching well after "load"
  await page.waitForNetworkIdle({ idleTime: 1500, timeout: 25_000 }).catch(() => {});
  await sleep(SETTLE_MS);
  await hideOverlays(page);
  return page;
}

async function shoot(browser, project) {
  const dir = path.join(SHOTS_DIR, project.slug);
  const page = await open(browser, project.link, DESKTOP);
  // Only clear old shots once the site has actually loaded
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  await scrollThrough(page);
  await hideOverlays(page); // some banners only mount after the first scroll

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const count = Math.max(1, Math.min(MAX_SHOTS, Math.round(height / DESKTOP.height)));
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : Math.round(((height - DESKTOP.height) * i) / (count - 1));
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await sleep(900);
    await page.screenshot({ path: path.join(dir, `desktop-${String(i).padStart(2, "0")}.png`) });
  }
  await page.close();

  // Fresh load so the phone shot starts at the hero, not wherever we left off
  const phone = await open(browser, project.link, MOBILE);
  await phone.screenshot({ path: path.join(dir, "mobile.png") });
  await phone.close();
  return count;
}

const only = process.argv.slice(2);
const projects = loadProjects().filter((p) => !only.length || only.includes(p.slug));
const browser = await puppeteer.launch({ executablePath: findBrowser(), headless: true });
for (const p of projects) {
  try {
    const n = await shoot(browser, p);
    console.log(`✓ ${p.slug.padEnd(14)} ${n} desktop shots  ${p.link}`);
  } catch (err) {
    console.log(`✗ ${p.slug.padEnd(14)} ${err.message}`);
  }
}
await browser.close();
