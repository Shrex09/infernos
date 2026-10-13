import React, { useEffect, useMemo, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { techGroups } from "../data";
import { Eyebrow } from "./ui";

/**
 * A draggable 3D sphere of every technology we ship with. Points sit on a
 * Fibonacci lattice; each frame we rotate and project them, scaling and
 * fading by depth. Pure DOM so the labels stay crisp and selectable.
 */
const TechSphere: React.FC = () => {
  const stage = useRef<HTMLDivElement>(null);
  const items = useMemo(() => techGroups.flatMap((g) => g.items.map((name) => ({ name, group: g.label }))), []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".sphere-item"));
    const n = nodes.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const base = nodes.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      return [Math.cos(t) * r, y, Math.sin(t) * r];
    });

    let ax = 0.3;
    let ay = 0;
    let vx = 0;
    let vy = prefersReducedMotion() ? 0 : 0.0035;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = false;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const render = () => {
      if (!visible) return;
      const R = el.clientWidth * 0.4;
      if (!dragging) {
        ay += vy;
        ax += vx;
        vx *= 0.95;
        // ease back toward a gentle constant spin
        vy += ((prefersReducedMotion() ? 0 : 0.0035) - vy) * 0.02;
      }
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      for (let i = 0; i < n; i++) {
        const [x0, y0, z0] = base[i];
        const x1 = x0 * cy + z0 * sy;
        const z1 = -x0 * sy + z0 * cy;
        const y2 = y0 * cx - z1 * sx;
        const z2 = y0 * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back … 1 front
        const s = 0.55 + depth * 0.65;
        const node = nodes[i];
        node.style.transform = `translate3d(${x1 * R}px, ${y2 * R}px, 0) translate(-50%, -50%) scale(${s})`;
        node.style.opacity = String(0.18 + depth * 0.82);
        node.style.zIndex = String(Math.round(depth * 100));
        node.classList.toggle("is-front", depth > 0.82);
      }
    };
    gsap.ticker.add(render);

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vy = dx * 0.005;
      vx = dy * 0.005;
      ay += vy;
      ax += vx;
    };
    const up = () => (dragging = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    return () => {
      io.disconnect();
      gsap.ticker.remove(render);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className="sphere" ref={stage} data-cursor="Drag" role="img" aria-label="Technologies we use, arranged on a rotating sphere">
      <div className="sphere-core" />
      {items.map((it) => (
        <span key={it.name} className="sphere-item" data-group={it.group}>
          {it.name}
        </span>
      ))}
    </div>
  );
};

const Stack: React.FC = () => (
  <section id="stack" className="section stack" data-orb="0.85 0.75 0.3 0.3" data-orb-mobile="-0.9 -0.8 0.3 0.25">
    <div className="container stack-grid">
      <div className="stack-copy">
        <Eyebrow index="(04)">Arsenal</Eyebrow>
        <h2 className="display-lg" data-split>
          Modern tools, <em className="serif-accent">battle-tested</em>
        </h2>
        <p className="lead" data-reveal>
          We pick the stack for your problem — not the other way round. Spin the sphere.
        </p>
        <div className="stack-groups">
          {techGroups.map((g) => (
            <div className="stack-group" key={g.label} data-reveal>
              <span className="stack-group-label">{g.label}</span>
              <span className="stack-group-items">{g.items.join(" · ")}</span>
            </div>
          ))}
        </div>
      </div>
      <TechSphere />
    </div>
  </section>
);

export default Stack;
