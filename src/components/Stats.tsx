import React from "react";
import { useReveal, revealStyle, useCountUp } from "../hooks";

interface Stat {
  target: number;
  suffix: string;
  label: string;
  note: string;
}

const stats: Stat[] = [
  { target: 10, suffix: "+", label: "Projects completed", note: "across 5 industries" },
  { target: 96, suffix: "%", label: "Client satisfaction", note: "from real client feedback" },
  { target: 6, suffix: "", label: "Products in production", note: "live & maintained today" },
  { target: 2, suffix: "+", label: "Years in business", note: "and growing" },
];

const StatCard: React.FC<{ stat: Stat; start: boolean; delay: number }> = ({ stat, start, delay }) => {
  const value = useCountUp(stat.target, start);
  return (
    <div className="glass hover-glow" style={{ ...styles.card, ...revealStyle(start, delay) }}>
      <span style={styles.value}>
        {value}
        <span style={styles.suffix}>{stat.suffix}</span>
      </span>
      <span style={styles.label}>{stat.label}</span>
      <span style={styles.note}>{stat.note}</span>
    </div>
  );
};

const Stats: React.FC = () => {
  const { ref, visible } = useReveal(0.3);

  return (
    <section className="section" style={styles.section}>
      <div style={styles.glow} />
      <div className="section-inner">
        <div ref={ref} style={styles.row}>
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} start={visible} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "linear-gradient(180deg, var(--bg) 0%, #200d04 50%, var(--bg) 100%)",
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
    background: "radial-gradient(ellipse, rgba(255, 105, 35, 0.14), transparent 65%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 22,
  },
  card: {
    padding: "34px 30px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  value: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: "clamp(40px, 4.5vw, 58px)",
    lineHeight: 1.1,
    color: "#fff",
    textShadow: "0 0 40px rgba(255, 122, 47, 0.5)",
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
    fontSize: 15,
    color: "rgba(245, 238, 230, 0.9)",
    letterSpacing: "0.01em",
    marginTop: 6,
  },
  note: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--faint)",
  },
};

export default Stats;
