import React, { useEffect, useRef, useState } from "react";
import { useReveal, revealStyle } from "../hooks";

const phases = [
  {
    num: "01",
    name: "Discovery",
    file: "discovery.ts",
    heading: "Discovery & strategy",
    description: "We listen to your goals, analyze your market and define exactly what to build — before a single line of code.",
    deliverables: ["Requirements document", "Technical feasibility report", "Fixed scope & quote"],
    code: [
      "// Phase 01 — Discovery",
      "const project = analyze({",
      "  goals: client.goals,",
      "  market: research(),",
      "  budget: transparent,",
      "});",
      "",
      "export const strategy = build(project);",
    ],
  },
  {
    num: "02",
    name: "Design",
    file: "design.tsx",
    heading: "Design & architecture",
    description: "Wireframes, interactive prototypes and a technical blueprint — you see and approve the product before development starts.",
    deliverables: ["Clickable prototype", "System architecture diagram", "Design system"],
    code: [
      "// Phase 02 — Design",
      "const design = createUI({",
      "  wireframes: true,",
      "  prototype: 'interactive',",
      "  reviewedBy: client,",
      "});",
      "",
      "// ✓ Approved before build",
    ],
  },
  {
    num: "03",
    name: "Develop",
    file: "develop.ts",
    heading: "Development & integration",
    description: "Engineers build in weekly increments with staging links, so you watch the product come alive — no black box.",
    deliverables: ["Weekly staging builds", "Code in your repository", "Progress reports"],
    code: [
      "// Phase 03 — Development",
      "const app = new App({",
      "  frontend: 'React + TS',",
      "  backend: 'Node.js',",
      "  reviews: 'weekly',",
      "});",
      "",
      "app.pushToStaging();",
    ],
  },
  {
    num: "04",
    name: "QA",
    file: "qa.spec.ts",
    heading: "Testing & QA",
    description: "Functional, performance and security testing across devices before anything reaches your users.",
    deliverables: ["Test reports", "Performance audit", "Security checklist"],
    code: [
      "// Phase 04 — Quality assurance",
      "await runTests({",
      "  unit: true,",
      "  e2e: true,",
      "  performance: 'lighthouse',",
      "});",
      "",
      "// ✓ All checks passed",
    ],
  },
  {
    num: "05",
    name: "Launch",
    file: "deploy.ts",
    heading: "Launch & support",
    description: "We deploy to production, hand over documentation and stay on for maintenance, monitoring and improvements.",
    deliverables: ["Production deploy", "Documentation handover", "Ongoing support plan"],
    code: [
      "// Phase 05 — Launch",
      "await deploy({",
      "  env: 'production',",
      "  monitoring: enabled,",
      "  support: 'ongoing',",
      "});",
      "",
      "// 🚀 Live",
    ],
  },
];

/* Terminal window that types the active phase's code */
const CodeWindow: React.FC<{ lines: string[]; file: string }> = ({ lines, file }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= lines.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 130);
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div style={cw.wrap}>
      <div style={cw.bar}>
        <span style={{ ...cw.dot, background: "#ff5f57" }} />
        <span style={{ ...cw.dot, background: "#febc2e" }} />
        <span style={{ ...cw.dot, background: "#28c840" }} />
        <span style={cw.fileName}>{file}</span>
      </div>
      <div style={cw.code}>
        {lines.slice(0, count).map((line, i) => (
          <div key={i} style={cw.line}>
            <span style={cw.lineNum}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ color: line.trimStart().startsWith("//") ? "var(--faint)" : "var(--text)" }}>
              {line || " "}
            </span>
          </div>
        ))}
        {count < lines.length && <span className="cursor-blink" />}
      </div>
    </div>
  );
};

const cw: Record<string, React.CSSProperties> = {
  wrap: {
    width: "100%",
    minHeight: 330,
    background: "var(--bg)",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(255, 122, 47, 0.22)",
    boxShadow: "0 30px 80px -30px rgba(232, 67, 28, 0.4), inset 0 1px 0 rgba(0,0,0,0.05)",
  },
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "12px 16px",
    background: "var(--surface)",
    borderBottom: "1px solid var(--border)",
  },
  dot: { width: 11, height: 11, borderRadius: "50%" },
  fileName: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "rgba(255, 200, 160, 0.6)",
    marginLeft: 12,
  },
  code: {
    padding: "18px 20px",
    fontFamily: "var(--font-mono)",
    fontSize: 13.5,
    lineHeight: 1.75,
  },
  line: { display: "flex", gap: 16 },
  lineNum: {
    color: "var(--faint)",
    userSelect: "none",
    minWidth: 18,
    textAlign: "right",
  },
};

/* Flickering flame that rides the fuse to the active phase */
const Flame: React.FC = () => (
  <svg
    width="22"
    height="26"
    viewBox="0 0 24 28"
    style={{
      position: "absolute",
      bottom: 5,
      left: -11,
      transformOrigin: "50% 100%",
      animation: "flame-flicker 0.85s ease-in-out infinite",
      filter: "drop-shadow(0 0 7px rgba(255, 140, 40, 0.85))",
    }}
  >
    <defs>
      <linearGradient id="fuse-flame" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#e8431c" />
        <stop offset="0.55" stopColor="#ff7a2f" />
        <stop offset="1" stopColor="#ffc36b" />
      </linearGradient>
    </defs>
    <path
      fill="url(#fuse-flame)"
      d="M12 28c-5 0-8-3.1-8-7.2 0-3 1.7-5.2 3.2-6.8 1.3-1.4 2.4-2.6 2.4-4.4 0-.9-.2-1.8-.6-2.6 3.4 1.2 5 4.2 4.4 7 1.4-.8 2.4-2.3 2.5-4.1C18.1 12 20 14.7 20 17.8c0 5-3 10.2-8 10.2z"
    />
    <path
      fill="#ffe9b0"
      opacity="0.95"
      d="M12 28c-2.6 0-4.2-1.7-4.2-3.9 0-1.7 1-2.9 1.9-3.9.7-.8 1.4-1.5 1.6-2.5 1.6 1 2.6 2.6 2.4 4.2.7-.4 1.2-1 1.4-1.9.9 1.1 1.3 2.3 1.3 3.6 0 2.7-1.8 4.4-4.4 4.4z"
    />
  </svg>
);

const Process: React.FC = () => {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const head = useReveal();
  const body = useReveal();
  const current = phases[active];

  // Auto-advance every 6s unless the user is hovering the section
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % phases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="process"
      className="section"
      style={styles.section}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="section-inner">
        <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
          <span className="kicker">Process</span>
          <h2 className="section-heading">
            Transparent from <span className="text-gradient">kickoff to launch</span>
          </h2>
          <p className="section-sub">
            Five phases, each with concrete deliverables in your hands. You
            always know what's done, what's next and what it costs.
          </p>
        </div>

        {/* Stepper — a lit fuse burning toward the active phase */}
        <div ref={body.ref} style={{ ...styles.stepperWrap, ...revealStyle(body.visible) }}>
          <div style={styles.track}>
            <div style={styles.trackBase} />
            <div
              style={{
                ...styles.trackFill,
                width: `${(active / (phases.length - 1)) * 100}%`,
              }}
            />

            {/* Traveling spark + flame */}
            <div
              style={{
                ...styles.spark,
                left: `${(active / (phases.length - 1)) * 100}%`,
              }}
            >
              <Flame />
              <span style={styles.sparkCore} />
            </div>

            {phases.map((p, i) => {
              const reached = i <= active;
              return (
                <button
                  key={p.num}
                  className="step-hit"
                  style={{ ...styles.stepBtn, left: `${(i / (phases.length - 1)) * 100}%` }}
                  onClick={() => setActive(i)}
                  aria-label={`Phase ${p.num} — ${p.name}`}
                >
                  <span
                    className="step-dot"
                    style={{
                      ...styles.dot,
                      ...(reached ? styles.dotLit : null),
                      ...(i === active ? styles.dotActive : null),
                    }}
                  />
                  <span
                    style={{
                      ...styles.stepNum,
                      color: i === active ? "var(--text)" : reached ? "rgba(232, 67, 28, 0.85)" : "var(--faint)",
                    }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="step-name hide-mobile"
                    style={{
                      ...styles.stepName,
                      color: i === active ? "var(--amber)" : "var(--faint)",
                    }}
                  >
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active phase */}
        <div style={styles.pane}>
          <div className="phase-anim" style={styles.paneLeft} key={`text-${active}`}>
            <span style={styles.phaseNum}>PHASE {current.num} / 05</span>
            <h3 style={styles.phaseHeading}>{current.heading}</h3>
            <p style={styles.phaseDesc}>{current.description}</p>
            <div style={styles.deliverables}>
              <span style={styles.deliverablesTitle}>YOU RECEIVE</span>
              {current.deliverables.map((d) => (
                <div key={d} style={styles.deliverable}>
                  <span style={styles.check}>✓</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="phase-anim" style={styles.paneRight} key={`code-${active}`}>
            <CodeWindow lines={current.code} file={current.file} />
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 56,
  },
  stepperWrap: {
    marginBottom: 56,
    padding: "10px 36px 0",
  },
  track: {
    position: "relative",
    height: 96,
  },
  trackBase: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 2,
    background: "var(--border)",
  },
  trackFill: {
    position: "absolute",
    top: 30,
    left: 0,
    height: 3,
    borderRadius: 2,
    background: "linear-gradient(90deg, #9c2a08, #e8431c 55%, #ffa53c)",
    boxShadow: "0 0 14px rgba(255, 110, 30, 0.6)",
    transition: "width 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  spark: {
    position: "absolute",
    top: 31.5,
    width: 0,
    height: 0,
    zIndex: 3,
    transition: "left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
    pointerEvents: "none",
  },
  sparkCore: {
    position: "absolute",
    left: -7,
    top: -7,
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: "radial-gradient(circle, #fff6e0 0%, #ffc36b 35%, #ff7a2f 65%, rgba(232, 67, 28, 0) 100%)",
    boxShadow: "0 0 18px 5px rgba(255, 140, 50, 0.65)",
    animation: "spark-pulse 1.4s ease-in-out infinite",
  },
  stepBtn: {
    position: "absolute",
    top: 0,
    transform: "translateX(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
    padding: 0,
    width: 92,
    zIndex: 2,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: "50%",
    marginTop: 25,
    background: "var(--border)",
    border: "1px solid var(--border)",
    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
  },
  dotLit: {
    background: "linear-gradient(135deg, #e8431c, #ff7a2f)",
    border: "1px solid rgba(255, 200, 120, 0.5)",
    boxShadow: "0 0 10px rgba(255, 120, 40, 0.7)",
  },
  dotActive: {
    transform: "scale(1.25)",
    boxShadow: "0 0 16px rgba(255, 150, 60, 0.9)",
  },
  stepNum: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.1em",
    transition: "color 0.3s",
  },
  stepName: {
    fontFamily: "var(--font-mono)",
    fontSize: 10.5,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    transition: "color 0.3s",
  },
  pane: {
    display: "flex",
    gap: 56,
    alignItems: "center",
    flexWrap: "wrap",
  },
  paneLeft: {
    flex: "1 1 380px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  phaseNum: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    color: "var(--amber)",
    letterSpacing: "0.2em",
  },
  phaseHeading: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(24px, 2.6vw, 38px)",
    color: "var(--text)",
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  phaseDesc: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "var(--muted)",
  },
  deliverables: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 8,
    padding: "18px 22px",
    borderRadius: 14,
    background: "rgba(255, 105, 35, 0.05)",
    border: "1px solid rgba(255, 122, 47, 0.18)",
  },
  deliverablesTitle: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.22em",
    color: "var(--faint)",
    marginBottom: 4,
  },
  deliverable: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 15,
    color: "var(--text)",
  },
  check: {
    color: "var(--accent-bright)",
    fontWeight: 700,
    fontSize: 14,
  },
  paneRight: {
    flex: "1 1 420px",
  },
};

export default Process;
