import React, { useEffect, useRef, useState } from "react";
import { useParallax } from "../hooks";

/* ────────────────────────────────────────
   3D PARTICLE GLOBE
   Fibonacci sphere → rotation matrix →
   perspective projection. Mouse parallax.
──────────────────────────────────────── */
const HeroGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    // ── Geometry: evenly distributed points on a unit sphere
    const N = 340;
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      pts.push({ x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r });
    }

    // ── Static topology: connect near neighbours once (not per frame)
    const links: [number, number][] = [];
    const MAX_D2 = 0.24 * 0.24;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dz = pts[i].z - pts[j].z;
        if (dx * dx + dy * dy + dz * dz < MAX_D2) links.push([i, j]);
      }
    }

    const proj = new Array<{ sx: number; sy: number; z: number; s: number }>(N);
    let rotY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let last = performance.now();

    const render = (now: number) => {
      // Delta-time so speed is identical on 60Hz and 144Hz displays,
      // and a dropped frame never causes a visible jump (capped at 3 frames).
      const dt = Math.min((now - last) / 16.667, 3);
      last = now;

      rotY += 0.0022 * dt;
      // Smoothly chase the cursor for parallax (frame-rate independent easing)
      const ease = 1 - Math.pow(0.955, dt);
      tiltX += ((mouseRef.current.y - 0.5) * 0.45 - tiltX) * ease;
      tiltY += ((mouseRef.current.x - 0.5) * 0.6 - tiltY) * ease;

      const R = Math.min(w, h) * 0.44;
      const cx = w / 2;
      const cy = h / 2;
      const fov = 3.4;

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const cyr = Math.cos(rotY + tiltY);
        const syr = Math.sin(rotY + tiltY);
        let x = p.x * cyr + p.z * syr;
        let z = -p.x * syr + p.z * cyr;
        const cxr = Math.cos(tiltX);
        const sxr = Math.sin(tiltX);
        const y = p.y * cxr - z * sxr;
        z = p.y * sxr + z * cxr;
        const s = fov / (fov + z);
        proj[i] = { sx: cx + x * R * s, sy: cy + y * R * s, z, s };
      }

      ctx.clearRect(0, 0, w, h);

      // Mesh lines — brighter at the front, ghosted at the back
      ctx.lineWidth = 1.0;
      for (const [a, b] of links) {
        const pa = proj[a];
        const pb = proj[b];
        const front = 1 - (pa.z + pb.z) / 2; // 0 back … 2 front
        ctx.strokeStyle = `rgba(220, 90, 30, ${0.06 + front * 0.22})`;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      // Nodes
      for (const p of proj) {
        const front = (1 - p.z) / 2; // 1 front, 0 back
        ctx.fillStyle = `rgba(220, ${80 + front * 100}, ${20 + front * 30}, ${0.3 + front * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 1.2 + p.s * 1.5 * front + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas} />;
};

/* ────────────────────────────────────────
   TYPING TERMINAL LINE
──────────────────────────────────────── */
const commands = [
  "infernos build --stack react,node --scale production",
  "infernos deploy --client you --uptime 99.9%",
  "infernos ship --from idea --to launch",
];

const TypeLine: React.FC = () => {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const target = commands[idx];
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      if (i <= target.length) {
        setText(target.slice(0, i));
        i++;
        timer = setTimeout(type, 38);
      } else {
        timer = setTimeout(() => setIdx((p) => (p + 1) % commands.length), 2600);
      }
    };
    type();
    return () => clearTimeout(timer);
  }, [idx]);

  return (
    <div style={styles.terminalLine}>
      <span style={{ color: "var(--accent-bright)" }}>$</span>
      <span style={styles.terminalText}>{text}</span>
      <span className="cursor-blink" />
    </div>
  );
};

/* ────────────────────────────────────────
   HERO
──────────────────────────────────────── */
const heroMetrics = [
  { value: "10+", label: "Projects delivered" },
  { value: "96%", label: "Client satisfaction" },
  { value: "6", label: "Products in production" },
  { value: "2+", label: "Years building" },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** Staggered entrance: each hero element rises into focus on page load. */
const useEntrance = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (order: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    filter: loaded ? "blur(0px)" : "blur(10px)",
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${order * 130}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${order * 130}ms, filter 0.85s cubic-bezier(0.16,1,0.3,1) ${order * 130}ms`,
  });
};

const Hero: React.FC = () => {
  // Background drifts at a fraction of the scroll speed for subtle depth
  const parallaxRef = useParallax(0.25);
  const enter = useEntrance();

  return (
  <section data-section="hero" style={styles.section} className="grid-bg">
    <div ref={parallaxRef} style={styles.parallaxLayer}>
      <HeroGlobe />
      <div style={styles.glowTop} />
    </div>

    {/* Radial vignettes so content stays readable over the globe */}
    <div style={styles.vignette} />

    <div style={styles.content}>
      <div style={{ ...styles.statusChip, ...enter(0) }} className="glass">
        <span className="status-dot" />
        <span style={styles.statusText}>Available for new projects</span>
      </div>

      <h1 style={{ ...styles.heading, ...enter(1) }}>
        We engineer digital
        <br />
        products <span className="text-gradient">that scale</span>
      </h1>

      <p style={{ ...styles.sub, ...enter(2) }}>
        Full-stack web platforms, mobile apps and e-commerce systems —
        designed, built and shipped to production by a team that treats your
        product like its own.
      </p>

      <div style={enter(3)}>
        <TypeLine />
      </div>

      <div style={{ ...styles.actions, ...enter(4) }}>
        <button className="btn-primary" onClick={() => scrollTo("contact")}>
          Start a project <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
        </button>
        <button className="btn-ghost" onClick={() => scrollTo("work")}>
          View our work
        </button>
      </div>

      <div style={{ ...styles.metricsRow, ...enter(5) }}>
        {heroMetrics.map((m, i) => (
          <React.Fragment key={m.label}>
            {i > 0 && <div style={styles.metricDivider} className="hide-mobile" />}
            <div style={styles.metric}>
              <span style={styles.metricValue}>{m.value}</span>
              <span style={styles.metricLabel}>{m.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>

  </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "140px 24px 100px",
    overflow: "hidden",
    background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(170, 55, 12, 0.22), transparent 60%), var(--bg)",
  },
  parallaxLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    willChange: "transform",
  },
  canvas: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(100vw, 100vh)",
    height: "min(100vw, 100vh)",
    opacity: 0.9,
    pointerEvents: "none",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 55% 50% at 50% 50%, var(--bg) 0%, rgba(0,0,0,0) 70%)",
    pointerEvents: "none",
    opacity: 0.82,
  },
  glowTop: {
    position: "absolute",
    top: "-30%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 900,
    height: 500,
    background: "radial-gradient(ellipse, rgba(255, 105, 35, 0.16), transparent 65%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 28,
    maxWidth: 880,
  },
  statusChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 18px",
    borderRadius: 999,
  },
  statusText: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--muted)",
    letterSpacing: "0.04em",
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: "clamp(36px, 6.4vw, 78px)",
    lineHeight: 1.08,
    letterSpacing: "-0.015em",
    color: "var(--text)",
    textShadow: "0 0 60px rgba(255, 90, 30, 0.35)",
  },
  sub: {
    fontSize: "clamp(16px, 1.6vw, 19px)",
    lineHeight: 1.65,
    color: "var(--muted)",
    maxWidth: 620,
  },
  terminalLine: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    padding: "10px 20px",
    borderRadius: 10,
    background: "var(--bg-2)",
    border: "1px solid rgba(255, 130, 55, 0.18)",
    backdropFilter: "blur(8px)",
    minHeight: 42,
    maxWidth: "92vw",
    overflow: "hidden",
  },
  terminalText: {
    color: "#e8431c",
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  metricsRow: {
    display: "flex",
    alignItems: "center",
    gap: 28,
    marginTop: 22,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  metricDivider: {
    width: 1,
    height: 36,
    background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.18), transparent)",
  },
  metric: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
  metricValue: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: 22,
    color: "var(--text)",
  },
  metricLabel: {
    fontSize: 12.5,
    color: "var(--faint)",
    letterSpacing: "0.04em",
  },
  scrollHint: {
    position: "absolute",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },
  scrollPill: {
    width: 24,
    height: 40,
    borderRadius: 14,
    border: "1.5px solid rgba(0,0,0,0.25)",
    display: "flex",
    justifyContent: "center",
    paddingTop: 7,
  },
  scrollDot: {
    width: 4,
    height: 8,
    borderRadius: 3,
    background: "var(--amber)",
    animation: "scroll-hint 1.8s ease-in-out infinite",
  },
};

export default Hero;
