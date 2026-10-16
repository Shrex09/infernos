import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, "../..");
export const SHOTS_DIR = path.join(HERE, ".shots");
export const COVERS_DIR = path.join(ROOT, "public/covers");

// Read slug + link straight from src/data.ts so the site's project list stays
// the single source of truth. The slug is the cover's file name.
export function loadProjects() {
  const src = fs.readFileSync(path.join(ROOT, "src/data.ts"), "utf8");
  const out = [];
  const re = /cover:\s*"\/covers\/([\w-]+)\.webp"[\s\S]*?link:\s*"([^"]+)"/g;
  for (const m of src.matchAll(re)) out.push({ slug: m[1], link: m[2] });
  return out;
}

// Use the Chrome or Edge already on this machine rather than downloading one
export function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  const found = candidates.find((p) => p && fs.existsSync(p));
  if (!found) throw new Error("No Chrome/Edge found — set CHROME_PATH");
  return found;
}
