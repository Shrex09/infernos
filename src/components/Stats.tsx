import React from "react";
import { useReveal, revealStyle, useCountUp } from "../hooks";

interface Stat {
  target: number;
  suffix: string;
  tag: string;
  label: string;
  note: string;
}

const stats: Stat[] = [
  { target: 10, suffix: "+", tag: "projects", label: "Projects completed", note: "across 5 industries" },
  { target: 96, suffix: "%", tag: "satisfaction", label: "Client satisfaction", note: "from real client feedback" },
  { target: 6, suffix: "", tag: "in_production", label: "Products in production", note: "live & maintained today" },
  { target: 2, suffix: "+", tag: "experience", label: "Years in business", note: "and growing" },
];

const StatReadout: React.FC<{ stat: Stat; start: boolean; delay: number; last: boolean }> = ({
  stat,
  start,
  delay,
  last,
}) => {
  const value = useCountUp(stat.target, start);
  return (
    <div
      className="stats-col"
      style={{ ...styles.col, ...(last ? {} : styles.colDivider), ...revealStyle(start, delay) }}
    >
      <span style={styles.tag}>// {stat.tag}</span>
      <div className="stats-head" style={styles.head}>
        <span style={styles.value}>
          {value}
          <span style={styles.suffix}>{stat.suffix}</span>
        </span>
        <div style={styles.text}>
          <span style={styles.label}>{stat.label}</span>
          <span style={styles.note}>{stat.note}</span>
        </div>
      </div>
      <div style={styles.barTrack}>
        <div
          style={{
            ...styles.barFill,
            width: start ? "100%" : "0%",
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const { ref, visible } = useReveal(0.3);

  return (
    <section className="section" style={styles.section}>
      <div style={styles.glow} />
      <div className="section-inner">
        <div ref={ref} className="glass" style={{ ...styles.panel, ...revealStyle(visible) }}>
          <div style={styles.panelBar}>
            <span style={{ ...styles.dot, background: "#ff5f57" }} />
            <span style={{ ...styles.dot, background: "#febc2e" }} />
            <span style={{ ...styles.dot, background: "#28c840" }} />
            <span style={styles.panelTitle}>infernos --stats --live</span>
            <span style={styles.liveChip}>
              <span className="status-dot" />
              LIVE
            </span>
          </div>
          <div style={styles.scanlines} />
          <div className="stats-row" style={styles.row}>
            {stats.map((stat, i) => (
              <StatReadout key={stat.label} stat={stat} start={visible} delay={i * 130} last={i === stats.length - 1} />
            ))}
          </div>
        </div>
        <p className="stats-swipe-hint">← Swipe for more →</p>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "linear-gradient(180deg, var(--bg) 0%, rgba(255, 120, 40, 0.06) 50%, var(--bg) 100%)",
    padding: "80px 64px",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 400,
    background: "radial-gradient(ellipse, rgba(255, 105, 35, 0.18), transparent 65%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  panel: {
    position: "relative",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 30px 80px -30px rgba(232, 67, 28, 0.3), 0 8px 30px -8px rgba(0,0,0,0.08)",
  },
  panelBar: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "13px 18px",
    background: "var(--surface-2)",
    borderBottom: "1px solid var(--border)",
  },
  dot: { width: 11, height: 11, borderRadius: "50%", flexShrink: 0 },
  panelTitle: {
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    color: "var(--faint)",
    marginLeft: 10,
  },
  liveChip: {
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--accent-text)",
    letterSpacing: "0.1em",
  },
  scanlines: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255, 130, 55, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 130, 55, 0.035) 1px, transparent 1px)",
    backgroundSize: "36px 36px",
    pointerEvents: "none",
  },
  row: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  },
  col: {
    padding: "30px 30px 26px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  colDivider: {
    borderRight: "1px dashed var(--border)",
  },
  tag: {
    fontFamily: "var(--font-mono)",
    fontSize: 11.5,
    color: "var(--faint)",
    letterSpacing: "0.03em",
  },
  head: {
    display: "flex",
    flexDirection: "column",
    marginTop: 2,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 4,
    flex: 1,
    minWidth: 0,
  },
  value: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: "clamp(36px, 4vw, 50px)",
    lineHeight: 1.1,
    color: "var(--text)",
    textShadow: "0 0 40px rgba(255, 122, 47, 0.25)",
  },
  suffix: {
    backgroundImage: "linear-gradient(100deg, #ff6a2b, #ffa53c)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  label: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: 14.5,
    color: "var(--text)",
    letterSpacing: "0.01em",
  },
  note: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--faint)",
  },
  barTrack: {
    marginTop: 14,
    height: 3,
    borderRadius: 2,
    background: "var(--border)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
    background: "linear-gradient(90deg, #e8431c, #ffa53c)",
    boxShadow: "0 0 10px rgba(255, 130, 55, 0.6)",
    transition: "width 1.1s cubic-bezier(0.16,1,0.3,1)",
  },
};

export default Stats;
