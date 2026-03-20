import React, { useEffect, useRef, useCallback, useState } from "react";

// ─────────────────────────────────────────
// SEASON TYPES & CONFIG
// ─────────────────────────────────────────
type Season = "summer" | "rain" | "autumn" | "snow";

const getAutoSeason = (): Season => {
  const month = new Date().getMonth() + 1;
  if ([3, 4, 5].includes(month)) return "summer";
  if ([6, 7, 8].includes(month)) return "rain";
  if ([9, 10, 11].includes(month)) return "autumn";
  return "snow";
};

const seasonMeta: Record<Season, { label: string; color: string; quote: string; sub: string }> = {
  summer: {
    label: "☀️ Summer",
    color: "#ff6b00",
    quote: "We build fast, just like the sun burns bright.",
    sub: "High performance. Zero downtime. Always blazing.",
  },
  rain: {
    label: "🌧️ Monsoon",
    color: "#0057aa",
    quote: "Every great product starts with a storm of ideas.",
    sub: "We thrive in complexity and deliver clarity.",
  },
  autumn: {
    label: "🍂 Autumn",
    color: "#b84400",
    quote: "Old systems fall. New technology rises.",
    sub: "We modernize what holds you back.",
  },
  snow: {
    label: "❄️ Winter",
    color: "#2244cc",
    quote: "Cool heads. Clean code. Crisp results.",
    sub: "Precision engineering, every single time.",
  },
};

const seasonButtons: { season: Season; label: string }[] = [
  { season: "summer", label: "☀️" },
  { season: "rain",   label: "🌧️" },
  { season: "autumn", label: "🍂" },
  { season: "snow",   label: "❄️" },
];

// ─────────────────────────────────────────
// SUMMER SCENE
// ─────────────────────────────────────────
function drawSummer(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#ff6b00");
  sky.addColorStop(0.5, "#ffaa00");
  sky.addColorStop(1, "#ffe066");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const sunX = w * 0.85, sunY = h * 0.14, sunR = Math.min(w, h) * 0.1;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 3);
  sunGrad.addColorStop(0, "rgba(255,255,200,1)");
  sunGrad.addColorStop(0.3, "rgba(255,220,50,0.9)");
  sunGrad.addColorStop(0.7, "rgba(255,160,0,0.3)");
  sunGrad.addColorStop(1, "rgba(255,100,0,0)");
  ctx.fillStyle = sunGrad;
  ctx.beginPath(); ctx.arc(sunX, sunY, sunR * 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fffde0";
  ctx.beginPath(); ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2); ctx.fill();

  ctx.save(); ctx.translate(sunX, sunY); ctx.rotate(t * 0.002);
  for (let i = 0; i < 12; i++) {
    ctx.save(); ctx.rotate((i * Math.PI * 2) / 12);
    ctx.strokeStyle = "rgba(255,240,100,0.4)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(sunR + 6, 0); ctx.lineTo(sunR + 20, 0); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  const ground = ctx.createLinearGradient(0, h * 0.65, 0, h);
  ground.addColorStop(0, "#c8860a"); ground.addColorStop(0.4, "#e0a020"); ground.addColorStop(1, "#f0c050");
  ctx.fillStyle = ground;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.68);
  ctx.bezierCurveTo(w * 0.25, h * 0.64, w * 0.5, h * 0.72, w * 0.75, h * 0.66);
  ctx.bezierCurveTo(w * 0.85, h * 0.63, w * 0.95, h * 0.67, w, h * 0.65);
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();

  ctx.fillStyle = "#d4902a";
  ctx.beginPath(); ctx.ellipse(w * 0.2, h * 0.72, w * 0.15, h * 0.06, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#c8860a";
  ctx.beginPath(); ctx.ellipse(w * 0.7, h * 0.75, w * 0.18, h * 0.07, 0, 0, Math.PI * 2); ctx.fill();

  drawTumbleweed(ctx, ((t * 0.3) % (w + 100)) - 50, h * 0.72 - Math.abs(Math.sin(t * 0.005)) * 20, Math.min(w,h)*0.04, t);
  drawTumbleweed(ctx, ((t * 0.18) % (w + 100)) - 50, h * 0.74, Math.min(w,h)*0.025, t * 1.3);

  const cactH = Math.min(h * 0.28, 80);
  drawCactus(ctx, w * 0.1, h * 0.68, cactH);
  drawCactus(ctx, w * 0.88, h * 0.67, cactH * 0.8);

  ctx.save();
  ctx.globalAlpha = 0.05 + Math.sin(t * 0.01) * 0.02;
  for (let i = 0; i < 6; i++) {
    const shimX = (w * i) / 6 + Math.sin(t * 0.005 + i) * 8;
    const shimGrad = ctx.createLinearGradient(shimX, h * 0.65, shimX, h * 0.3);
    shimGrad.addColorStop(0, "rgba(255,200,50,0.5)");
    shimGrad.addColorStop(1, "rgba(255,200,50,0)");
    ctx.fillStyle = shimGrad;
    ctx.fillRect(shimX, h * 0.3, 1.5, h * 0.35);
  }
  ctx.restore();
}

function drawTumbleweed(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.05);
  ctx.strokeStyle = "rgba(120,80,20,0.7)"; ctx.lineWidth = 1.2;
  for (let i = 0; i < 6; i++) {
    ctx.save(); ctx.rotate((i * Math.PI) / 3);
    ctx.beginPath(); ctx.arc(0, 0, r, -0.5, 0.5); ctx.stroke();
    ctx.restore();
  }
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

function drawCactus(ctx: CanvasRenderingContext2D, x: number, baseY: number, h: number) {
  ctx.fillStyle = "#2d7a2d";
  ctx.beginPath(); ctx.roundRect(x - h * 0.12, baseY - h, h * 0.24, h, 6); ctx.fill();
  ctx.fillStyle = "#1a5c1a"; ctx.fillRect(x - h * 0.12, baseY - h, h * 0.05, h);
  ctx.fillStyle = "#2d7a2d";
  ctx.beginPath(); ctx.roundRect(x - h * 0.4, baseY - h * 0.65, h * 0.28, h * 0.11, 3); ctx.fill();
  ctx.beginPath(); ctx.roundRect(x - h * 0.42, baseY - h * 0.75, h * 0.12, h * 0.20, 3); ctx.fill();
  ctx.beginPath(); ctx.roundRect(x + h * 0.12, baseY - h * 0.55, h * 0.28, h * 0.11, 3); ctx.fill();
  ctx.beginPath(); ctx.roundRect(x + h * 0.3, baseY - h * 0.65, h * 0.12, h * 0.20, 3); ctx.fill();
  ctx.strokeStyle = "#c8c820"; ctx.lineWidth = 0.6;
  for (let i = 0; i < 4; i++) {
    const sy = baseY - h * 0.2 - i * h * 0.18;
    ctx.beginPath(); ctx.moveTo(x - h * 0.12, sy); ctx.lineTo(x - h * 0.2, sy - 3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + h * 0.12, sy); ctx.lineTo(x + h * 0.2, sy - 3); ctx.stroke();
  }
}

// ─────────────────────────────────────────
// WINTER SCENE
// ─────────────────────────────────────────
interface Snowflake { x: number; y: number; r: number; vx: number; vy: number; opacity: number; rot: number; rotV: number; }
const winterFlakes: Snowflake[] = [];

function initSnow(w: number, h: number) {
  winterFlakes.length = 0;
  for (let i = 0; i < 140; i++) {
    winterFlakes.push({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 3, vx: (Math.random() - 0.5) * 0.6, vy: 0.4 + Math.random() * 1.2, opacity: 0.4 + Math.random() * 0.6, rot: Math.random() * Math.PI * 2, rotV: (Math.random() - 0.5) * 0.04 });
  }
}

function drawWinter(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (winterFlakes.length === 0) initSnow(w, h);

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#02021a"); sky.addColorStop(0.5, "#05052e"); sky.addColorStop(1, "#0a0a3a");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 50; i++) {
    ctx.globalAlpha = 0.4 + Math.sin(t * 0.005 + i * 0.5) * 0.3;
    ctx.fillStyle = "white";
    ctx.beginPath(); ctx.arc((i * 137.5 + 50) % w, (i * 97.3 + 20) % (h * 0.5), 0.4 + Math.sin(t * 0.003 + i) * 0.2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  const moonX = w * 0.15, moonY = h * 0.14;
  const moonG = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 40);
  moonG.addColorStop(0, "#fffde0"); moonG.addColorStop(0.6, "#e0e8ff"); moonG.addColorStop(1, "rgba(200,220,255,0)");
  ctx.fillStyle = moonG; ctx.beginPath(); ctx.arc(moonX, moonY, 40, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fffde0"; ctx.beginPath(); ctx.arc(moonX, moonY, 22, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#060620";
  for (let i = 0; i < 10; i++) {
    const bx = (i * w) / 8 - 15, bh = 50 + ((i * 73) % 70), bw = 22 + ((i * 41) % 30);
    ctx.fillRect(bx, h * 0.55 - bh, bw, bh);
    ctx.fillStyle = "rgba(255,220,100,0.5)";
    for (let wy = 0; wy < 2; wy++) for (let wx = 0; wx < 2; wx++) {
      if ((i + wy + wx) % 3 !== 0) ctx.fillRect(bx + 4 + wx * 10, h * 0.55 - bh + 8 + wy * 12, 5, 6);
    }
    ctx.fillStyle = "#060620";
  }

  const gnd = ctx.createLinearGradient(0, h * 0.72, 0, h);
  gnd.addColorStop(0, "#c8d8f0"); gnd.addColorStop(0.3, "#e8f0ff"); gnd.addColorStop(1, "#f0f5ff");
  ctx.fillStyle = gnd;
  ctx.beginPath(); ctx.moveTo(0, h * 0.75);
  for (let i = 0; i <= w; i += 30) ctx.lineTo(i, h * 0.75 - Math.sin(i * 0.02) * 6);
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();

  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.moveTo(w / 2 - 70, h); ctx.lineTo(w / 2 + 70, h);
  ctx.lineTo(w / 2 + 22, h * 0.7); ctx.lineTo(w / 2 - 22, h * 0.7);
  ctx.closePath(); ctx.fill();

  ctx.strokeStyle = "rgba(255,255,100,0.5)"; ctx.setLineDash([14, 10]); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(w / 2, h * 0.7); ctx.lineTo(w / 2, h); ctx.stroke();
  ctx.setLineDash([]);

  drawStreetLamp(ctx, w / 2 - 85, h * 0.7, t, true);
  drawStreetLamp(ctx, w / 2 + 85, h * 0.7, t, false);
  drawSnowTree(ctx, w * 0.06, h * 0.72, Math.min(h * 0.25, 75));
  drawSnowTree(ctx, w * 0.92, h * 0.72, Math.min(h * 0.22, 60));

  for (const f of winterFlakes) {
    f.x += f.vx + Math.sin(t * 0.002 + f.y * 0.01) * 0.25; f.y += f.vy; f.rot += f.rotV;
    if (f.y > h + 10) { f.y = -10; f.x = Math.random() * w; }
    if (f.x < -10) f.x = w + 10; if (f.x > w + 10) f.x = -10;
    ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot); ctx.globalAlpha = f.opacity;
    const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, f.r * 3);
    sg.addColorStop(0, "rgba(220,235,255,0.8)"); sg.addColorStop(1, "rgba(220,235,255,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(0, 0, f.r * 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(230,240,255,0.9)"; ctx.lineWidth = 0.6;
    for (let a = 0; a < 6; a++) {
      ctx.save(); ctx.rotate((a * Math.PI) / 3);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, f.r * 2.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, f.r); ctx.lineTo(f.r * 0.5, f.r * 0.5); ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }
}

function drawStreetLamp(ctx: CanvasRenderingContext2D, x: number, baseY: number, t: number, left: boolean) {
  ctx.strokeStyle = "#3a3a5a"; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x, baseY); ctx.lineTo(x, baseY - 100);
  const d = left ? -1 : 1;
  ctx.bezierCurveTo(x, baseY - 108, x + d * 24, baseY - 116, x + d * 32, baseY - 120); ctx.stroke();
  const lx = x + d * 32, ly = baseY - 120;
  ctx.fillStyle = "#2a2a4a"; ctx.beginPath(); ctx.roundRect(lx - 9, ly - 6, 18, 11, 2); ctx.fill();
  const lc = ctx.createRadialGradient(lx, ly, 0, lx, ly + 50, 65);
  lc.addColorStop(0, `rgba(255,240,150,${0.28 + Math.sin(t * 0.05) * 0.02})`);
  lc.addColorStop(1, "rgba(255,240,150,0)");
  ctx.fillStyle = lc;
  ctx.beginPath(); ctx.moveTo(lx - 4, ly + 4); ctx.lineTo(lx - 48, ly + 96); ctx.lineTo(lx + 48, ly + 96); ctx.lineTo(lx + 4, ly + 4); ctx.closePath(); ctx.fill();
  ctx.fillStyle = `rgba(255,240,150,${0.85 + Math.sin(t * 0.05) * 0.1})`;
  ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#e8f0ff"; ctx.beginPath(); ctx.ellipse(lx, ly - 6, 11, 3, 0, 0, Math.PI * 2); ctx.fill();
}

function drawSnowTree(ctx: CanvasRenderingContext2D, x: number, baseY: number, h: number) {
  ctx.fillStyle = "#2a1a0a"; ctx.fillRect(x - 3, baseY - h * 0.3, 6, h * 0.3);
  for (let i = 0; i < 3; i++) {
    const ly = baseY - h * 0.3 - i * h * 0.25, lw = h * 0.45 * (1 - i * 0.25);
    ctx.fillStyle = "#0d2e10"; ctx.beginPath(); ctx.moveTo(x, ly - h * 0.3); ctx.lineTo(x - lw, ly); ctx.lineTo(x + lw, ly); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#d8eaff"; ctx.beginPath(); ctx.moveTo(x - lw * 0.8, ly - 3); ctx.lineTo(x + lw * 0.8, ly - 3); ctx.lineTo(x + lw, ly); ctx.lineTo(x - lw, ly); ctx.closePath(); ctx.fill();
  }
}

// ─────────────────────────────────────────
// AUTUMN SCENE
// ─────────────────────────────────────────
interface Leaf { x: number; y: number; vx: number; vy: number; rot: number; rotV: number; size: number; color: string; opacity: number; wobble: number; }
const autumnLeaves: Leaf[] = [];

function initLeaves(w: number, h: number) {
  autumnLeaves.length = 0;
  const colors = ["#c0392b","#e67e22","#e74c3c","#f39c12","#d35400","#a93226","#cb4335","#ba4a00"];
  for (let i = 0; i < 50; i++) {
    autumnLeaves.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 1.2, vy: 0.3 + Math.random() * 1.0, rot: Math.random() * Math.PI * 2, rotV: (Math.random() - 0.5) * 0.07, size: 4 + Math.random() * 9, color: colors[Math.floor(Math.random() * colors.length)], opacity: 0.7 + Math.random() * 0.3, wobble: Math.random() * Math.PI * 2 });
  }
}

function drawAutumn(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (autumnLeaves.length === 0) initLeaves(w, h);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#1a0800"); sky.addColorStop(0.4, "#4a1500"); sky.addColorStop(0.7, "#8b3a00"); sky.addColorStop(1, "#c06000");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  const sg = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, w * 0.5);
  sg.addColorStop(0, "rgba(255,180,50,0.8)"); sg.addColorStop(0.3, "rgba(255,100,20,0.35)"); sg.addColorStop(0.7, "rgba(200,50,0,0.1)"); sg.addColorStop(1, "rgba(100,20,0,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(w * 0.5, h * 0.55, w * 0.5, 0, Math.PI * 2); ctx.fill();
  const gnd = ctx.createLinearGradient(0, h * 0.65, 0, h);
  gnd.addColorStop(0, "#3d1a00"); gnd.addColorStop(0.5, "#5a2800"); gnd.addColorStop(1, "#2a1000");
  ctx.fillStyle = gnd; ctx.fillRect(0, h * 0.65, w, h * 0.35);
  const lc = ["#c0392b","#e67e22","#f39c12","#a93226"];
  ctx.globalAlpha = 0.6;
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = lc[i % lc.length];
    ctx.save(); ctx.translate((i * 137.5 * 3) % w, h * 0.68 + (i * 53) % (h * 0.28));
    ctx.rotate((i * 0.8) % (Math.PI * 2)); drawLeafShape(ctx, 4 + (i % 6)); ctx.restore();
  }
  ctx.globalAlpha = 1;

  const treeScale = Math.min(w, h) / 500;
  drawAutumnTree(ctx, w * 0.06, h * 0.68, 140 * treeScale, 50 * treeScale, t);
  drawAutumnTree(ctx, w * 0.88, h * 0.68, 120 * treeScale, 45 * treeScale, t * 1.1);
  drawAutumnTree(ctx, w * 0.22, h * 0.72, 80 * treeScale, 30 * treeScale, t * 1.2);
  drawAutumnTree(ctx, w * 0.75, h * 0.72, 90 * treeScale, 32 * treeScale, t * 0.8);

  for (const leaf of autumnLeaves) {
    leaf.wobble += 0.03; leaf.x += leaf.vx + Math.sin(leaf.wobble) * 0.4; leaf.y += leaf.vy; leaf.rot += leaf.rotV;
    if (leaf.y > h + 20) { leaf.y = -20; leaf.x = Math.random() * w; }
    if (leaf.x < -20) leaf.x = w + 20; if (leaf.x > w + 20) leaf.x = -20;
    ctx.save(); ctx.translate(leaf.x, leaf.y); ctx.rotate(leaf.rot);
    ctx.globalAlpha = leaf.opacity; ctx.fillStyle = leaf.color;
    drawLeafShape(ctx, leaf.size); ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function drawLeafShape(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath(); ctx.moveTo(0, -size); ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 1.2, 0, 0, size); ctx.bezierCurveTo(-size * 1.2, 0, -size * 0.8, -size * 0.8, 0, -size); ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.2)"; ctx.lineWidth = 0.4;
  ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(0, size); ctx.stroke();
}

function drawAutumnTree(ctx: CanvasRenderingContext2D, x: number, baseY: number, tH: number, spread: number, t: number) {
  const sway = Math.sin(t * 0.002 + x * 0.01) * 2.5;
  ctx.strokeStyle = "#2a1000"; ctx.lineWidth = tH * 0.06; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(x, baseY);
  ctx.quadraticCurveTo(x + sway, baseY - tH * 0.5, x + sway * 1.5, baseY - tH * 0.7); ctx.stroke();
  const branches = [{dy:0.5,a:-0.6,l:0.35},{dy:0.5,a:0.5,l:0.3},{dy:0.65,a:-0.4,l:0.25},{dy:0.65,a:0.45,l:0.28}];
  for (const b of branches) {
    ctx.lineWidth = tH * 0.025;
    ctx.beginPath(); ctx.moveTo(x + sway * b.dy, baseY - tH * b.dy);
    ctx.lineTo(x + sway * b.dy + Math.cos(b.a) * tH * b.l, baseY - tH * b.dy - Math.abs(Math.sin(b.a)) * tH * b.l);
    ctx.stroke();
  }
  const fc = ["#c0392b","#e67e22","#a93226","#d35400","#e74c3c"];
  const clusters = [{ox:0,oy:-tH,r:spread},{ox:-spread*0.7,oy:-tH*0.75,r:spread*0.7},{ox:spread*0.7,oy:-tH*0.72,r:spread*0.65},{ox:-spread*0.4,oy:-tH*0.55,r:spread*0.5},{ox:spread*0.5,oy:-tH*0.5,r:spread*0.45}];
  for (let i = 0; i < clusters.length; i++) {
    const c = clusters[i]; ctx.fillStyle = fc[i % fc.length]; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.arc(x + sway + c.ox, baseY + c.oy, c.r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// ─────────────────────────────────────────
// RAIN SCENE
// ─────────────────────────────────────────
interface RainDrop { x: number; y: number; len: number; speed: number; opacity: number; }
interface Ripple { x: number; y: number; r: number; opacity: number; }
interface FrogAnim { x: number; y: number; baseY: number; jumping: boolean; jumpT: number; jumpDir: number; frame: number; frameT: number; }
const rainDrops: RainDrop[] = [];
const ripples: Ripple[] = [];
let frogAnim: FrogAnim | null = null;
let rainInit = false;

function initRain(w: number, h: number) {
  rainDrops.length = 0; ripples.length = 0;
  for (let i = 0; i < 180; i++) rainDrops.push({ x: Math.random() * w, y: Math.random() * h, len: 8 + Math.random() * 16, speed: 7 + Math.random() * 8, opacity: 0.3 + Math.random() * 0.5 });
  frogAnim = { x: w * 0.55, y: h * 0.78, baseY: h * 0.78, jumping: false, jumpT: 0, jumpDir: 1, frame: 0, frameT: 0 };
  rainInit = true;
}

function drawRain(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (!rainInit) initRain(w, h);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#050510"); sky.addColorStop(0.4, "#0a0a20"); sky.addColorStop(0.7, "#0d1a2e"); sky.addColorStop(1, "#081520");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  const cloudPositions = [0.1,0.35,0.6,0.85];
  for (let ci = 0; ci < cloudPositions.length; ci++) {
    const cx = (cloudPositions[ci] * w + t * 0.07) % (w + 160) - 80;
    ctx.fillStyle = "rgba(20,25,50,0.85)";
    for (let b = 0; b < 4; b++) { ctx.beginPath(); ctx.arc(cx + b * 28 - 42, h * 0.09 + Math.sin(b * 1.2) * 8, 18 + b * 4, 0, Math.PI * 2); ctx.fill(); }
  }
  const pondGrad = ctx.createLinearGradient(0, h * 0.72, 0, h);
  pondGrad.addColorStop(0, "#0a1a2e"); pondGrad.addColorStop(0.3, "#0d2040"); pondGrad.addColorStop(1, "#050f1a");
  ctx.fillStyle = pondGrad;
  ctx.beginPath(); ctx.ellipse(w * 0.5, h * 0.82, w * 0.42, h * 0.11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(100,150,200,0.1)"; ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(w * 0.5, h * 0.72 + i * 12 + Math.sin(t * 0.003 + i) * 2 + h * 0.1, w * 0.26 - i * 16, 3, 0, 0, Math.PI * 2); ctx.stroke(); }
  drawLilyPad(ctx, w * 0.38, h * 0.80, 18, t);
  drawLilyPad(ctx, w * 0.62, h * 0.82, 14, t * 0.8);
  const gnd = ctx.createLinearGradient(0, h * 0.68, 0, h);
  gnd.addColorStop(0, "#0a1a0a"); gnd.addColorStop(0.4, "#0d200d"); gnd.addColorStop(1, "#050f05");
  ctx.fillStyle = gnd;
  ctx.beginPath(); ctx.moveTo(0, h * 0.70); ctx.lineTo(0, h); ctx.lineTo(w, h); ctx.lineTo(w, h * 0.70);
  ctx.quadraticCurveTo(w * 0.75, h * 0.68, w * 0.55, h * 0.72);
  ctx.quadraticCurveTo(w * 0.45, h * 0.72, w * 0.25, h * 0.68);
  ctx.quadraticCurveTo(w * 0.1, h * 0.67, 0, h * 0.70); ctx.fill();
  ctx.strokeStyle = "#1a3a1a"; ctx.lineWidth = 1.2;
  for (let i = 0; i < 24; i++) {
    const gx = (i * 137.5 * 5) % w, gy = h * 0.70 + ((i * 23) % (h * 0.07));
    const sw = Math.sin(t * 0.003 + i * 0.5) * 3;
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + sw, gy - 12, gx + sw * 2, gy - 20); ctx.stroke();
  }
  for (const d of rainDrops) {
    d.y += d.speed; d.x -= d.speed * 0.18;
    if (d.y > h + 20 || d.x < -20) {
      d.y = -20; d.x = Math.random() * w;
      if (Math.random() > 0.6) ripples.push({ x: d.x, y: h * 0.72 + h * 0.1, r: 0, opacity: 0.55 });
    }
    ctx.strokeStyle = `rgba(150,180,220,${d.opacity})`; ctx.lineWidth = 0.7;
    ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.speed * 0.14, d.y - d.len); ctx.stroke();
  }
  for (let i = ripples.length - 1; i >= 0; i--) {
    const rp = ripples[i]; rp.r += 0.45; rp.opacity -= 0.014;
    if (rp.opacity <= 0) { ripples.splice(i, 1); continue; }
    ctx.strokeStyle = `rgba(100,160,220,${rp.opacity})`; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.28, 0, 0, Math.PI * 2); ctx.stroke();
  }
  if (frogAnim) {
    frogAnim.frameT++;
    if (frogAnim.frameT > 15) { frogAnim.frame = (frogAnim.frame + 1) % 2; frogAnim.frameT = 0; }
    if (!frogAnim.jumping && Math.random() < 0.003) { frogAnim.jumping = true; frogAnim.jumpT = 0; frogAnim.jumpDir = Math.random() > 0.5 ? 1 : -1; }
    if (frogAnim.jumping) {
      frogAnim.jumpT += 0.06; frogAnim.x += frogAnim.jumpDir * 2.5;
      frogAnim.y = frogAnim.baseY - Math.sin(frogAnim.jumpT * Math.PI) * 35;
      if (frogAnim.jumpT >= 1) { frogAnim.jumping = false; frogAnim.baseY = frogAnim.y = h * 0.78; if (frogAnim.x < w * 0.3 || frogAnim.x > w * 0.7) frogAnim.x = w * 0.55; }
    }
    drawFrog(ctx, frogAnim.x, frogAnim.y, frogAnim.jumping, frogAnim.frame);
  }
}

function drawLilyPad(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) {
  const bob = Math.sin(t * 0.002 + x) * 1.5;
  ctx.fillStyle = "#1a4a1a";
  ctx.beginPath(); ctx.arc(x, y + bob, r, 0.3, Math.PI * 2 - 0.3); ctx.lineTo(x, y + bob); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#ff6688"; ctx.beginPath(); ctx.arc(x + r * 0.3, y + bob - r * 0.2, 2.5, 0, Math.PI * 2); ctx.fill();
}

function drawFrog(ctx: CanvasRenderingContext2D, x: number, y: number, jumping: boolean, frame: number) {
  const sc = 0.9;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.beginPath(); ctx.ellipse(0, 12, 16, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#2d7a2d"; ctx.beginPath(); ctx.ellipse(0, 0, 14, 11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#5aba5a"; ctx.beginPath(); ctx.ellipse(0, 3, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#1a5a1a";
  ctx.beginPath(); ctx.arc(-6, -7, 4.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(6, -7, 4.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#000";
  ctx.beginPath(); ctx.arc(-6, -7, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(6, -7, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "white";
  ctx.beginPath(); ctx.arc(-5, -8, 1, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(7, -8, 1, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#1a5a1a"; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(0, 1, 5, 0.3, Math.PI - 0.3); ctx.stroke();
  const ls = jumping ? 18 : 7 + frame * 2.5;
  ctx.fillStyle = "#2d7a2d";
  ctx.beginPath(); ctx.ellipse(-9, 7 + ls * 0.28, 5, 2.5, jumping ? -0.8 : -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(9, 7 + ls * 0.28, 5, 2.5, jumping ? 0.8 : 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-10, 1.5, 4, 2, jumping ? -0.5 : -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(10, 1.5, 4, 2, jumping ? 0.5 : 0.2, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// ─────────────────────────────────────────
// WEATHER CANVAS COMPONENT
// ─────────────────────────────────────────
interface WeatherCanvasProps {
  season: Season;
}

const WeatherCanvas: React.FC<WeatherCanvasProps> = ({ season }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef = useRef(0);
  const rafRef = useRef(0);

  const resetState = () => {
    winterFlakes.length = 0;
    autumnLeaves.length = 0;
    rainInit = false;
    ripples.length = 0;
    rainDrops.length = 0;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    tRef.current += 1;
    const t = tRef.current;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    if (season === "summer") drawSummer(ctx, w, h, t);
    else if (season === "snow") drawWinter(ctx, w, h, t);
    else if (season === "autumn") drawAutumn(ctx, w, h, t);
    else drawRain(ctx, w, h, t);
    rafRef.current = requestAnimationFrame(draw);
  }, [season]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      resetState();
    };
    resize();
    window.addEventListener("resize", resize);
    cancelAnimationFrame(rafRef.current);
    tRef.current = 0;
    resetState();
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", borderRadius: 16 }}
    />
  );
};

// ─────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────
const features = [
  "Built by developers who've been on the client side too",
  "We speak business first, technology second",
  "From idea to deployment fast, without cutting corners",
];

const About: React.FC = () => {
  const [season, setSeason] = useState<Season>(getAutoSeason());
  const meta = seasonMeta[season];

  const handleSeasonChange = (s: Season) => {
    setSeason(s);
  };

  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.component}>
          {/* ── LEFT: Content ── */}
          <div style={styles.contentSide}>
            <div style={styles.content}>
              <div style={styles.sectionTitle}>
                <span style={styles.tagline}>What Sets Us Apart</span>
                <div style={styles.textBlock}>
                  <h2 style={styles.heading}>
                    Industry-leading expertise and credentials
                  </h2>
                  <p style={styles.text}>
                    The best certifications to validate our expertise in modern web development.
                  </p>
                </div>
              </div>
              <ul style={styles.list}>
                {features.map((item, i) => (
                  <li key={i} style={styles.listItem}>
                    <span style={styles.checkIcon}>✓</span>
                    <span style={styles.listText}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={styles.actions}>
              <a 
                href="#footer" 
                style={styles.btnLink}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact <span style={styles.arrow}>›</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: Weather Box ── */}
          <div style={styles.imageSide}>
            <div style={styles.weatherBox}>
              {/* Canvas fills the box */}
              <div style={styles.canvasWrap}>
                <WeatherCanvas season={season} />
              </div>

              {/* Toggle buttons overlay — top right */}
              <div style={styles.toggleRow}>
                {seasonButtons.map((btn) => (
                  <button
                    key={btn.season}
                    onClick={() => handleSeasonChange(btn.season)}
                    title={seasonMeta[btn.season].label}
                    style={{
                      ...styles.toggleBtn,
                      background: season === btn.season
                        ? `${seasonMeta[btn.season].color}cc`
                        : "rgba(0,0,0,0.45)",
                      border: season === btn.season
                        ? `1.5px solid ${seasonMeta[btn.season].color}`
                        : "1.5px solid rgba(255,255,255,0.15)",
                      transform: season === btn.season ? "scale(1.12)" : "scale(1)",
                      boxShadow: season === btn.season
                        ? `0 0 12px ${seasonMeta[btn.season].color}88`
                        : "none",
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Season badge — top left */}
              <div style={{
                ...styles.seasonBadge,
                background: `${meta.color}33`,
                borderColor: `${meta.color}88`,
              }}>
                {meta.label}
              </div>

              {/* Quote overlay — bottom */}
              <div style={styles.quoteOverlay}>
                <p style={styles.quoteText}>"{meta.quote}"</p>
                <p style={styles.quoteSub}>{meta.sub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#000B0D",
    padding: "112px 64px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    maxWidth: 1280,
    width: "100%",
  },
  component: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    flexWrap: "wrap",
  },
  contentSide: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  sectionTitle: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 16,
    color: "#FFFFFF",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  heading: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(32px, 4vw, 60px)",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "8px 0",
    listStyle: "none",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  checkIcon: {
    width: 16,
    height: 16,
    color: "#FFFFFF",
    fontSize: 14,
    flexShrink: 0,
  },
  listText: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  btnOutline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    padding: "6px 12px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  btnLink: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
  },
  arrow: { fontSize: 20 },

  // ── Right Side ──
  imageSide: {
    flex: "1 1 400px",
  },
  weatherBox: {
    width: "100%",
    height: 640,
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
  },
  canvasWrap: {
    position: "absolute",
    inset: 0,
    borderRadius: 16,
    overflow: "hidden",
  },

  // Toggle buttons top-right
  toggleRow: {
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    gap: 8,
    zIndex: 10,
  },
  toggleBtn: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    fontSize: 17,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
    lineHeight: 1,
  },

  // Season badge top-left
  seasonBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backdropFilter: "blur(10px)",
    border: "1px solid",
    borderRadius: 24,
    padding: "5px 14px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: "#FFFFFF",
    letterSpacing: "0.05em",
  },

  // Quote overlay at bottom
  quoteOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "32px 28px 28px",
    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  quoteText: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(14px, 1.6vw, 18px)",
    lineHeight: 1.4,
    color: "#FFFFFF",
    letterSpacing: "-0.01em",
  },
  quoteSub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.4,
  },
};

export default About;