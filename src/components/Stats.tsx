import React from "react";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "150+", label: "Projects completed" },
  { value: "98%", label: "Client satisfaction" },
  { value: "8+", label: "Years in business" },
];

const Stats: React.FC = () => (
  <section style={styles.section}>
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Proven results delivered across industries
      </h2>
      <div style={styles.statsRow}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.stat}>
            <span style={styles.value}>{stat.value}</span>
            <span style={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#4C5455",
    padding: "112px 64px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    maxWidth: 1280,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 80,
  },
  heading: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(28px, 3vw, 48px)",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
    maxWidth: 768,
  },
  statsRow: {
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
  },
  stat: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingLeft: 32,
    borderLeft: "1px solid rgba(255,255,255,0.2)",
  },
  value: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(48px, 6vw, 80px)",
    lineHeight: 1.3,
    color: "#FFFFFF",
  },
  label: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(16px, 1.5vw, 26px)",
    lineHeight: 1.4,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
  },
};

export default Stats;
