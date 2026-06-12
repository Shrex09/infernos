import React from "react";

const clients = [
  "Prerna Sarees",
  "Shubharambh Events",
  "Muscle Build Nutrition",
  "Mayur Nursery",
  "MediCore",
  "MGTech Systems",
];

const TrustBar: React.FC = () => (
  <section style={styles.section}>
    <p style={styles.label}>TRUSTED BY GROWING BUSINESSES ACROSS INDUSTRIES</p>
    <div style={styles.marqueeWrap}>
      <div style={styles.fadeLeft} />
      <div style={styles.fadeRight} />
      <div className="marquee-track">
        {[...clients, ...clients].map((name, i) => (
          <div key={i} style={styles.item}>
            <span style={styles.hex}>⬡</span>
            <span style={styles.name}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg)",
    padding: "44px 0",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: 26,
  },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: 11.5,
    letterSpacing: "0.3em",
    color: "var(--faint)",
    textAlign: "center",
    padding: "0 24px",
  },
  marqueeWrap: {
    position: "relative",
    overflow: "hidden",
  },
  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 120,
    background: "linear-gradient(90deg, var(--bg), transparent)",
    zIndex: 2,
    pointerEvents: "none",
  },
  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 120,
    background: "linear-gradient(270deg, var(--bg), transparent)",
    zIndex: 2,
    pointerEvents: "none",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "0 38px",
    flexShrink: 0,
  },
  hex: {
    color: "rgba(255, 140, 60, 0.6)",
    fontSize: 16,
  },
  name: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: 16,
    color: "rgba(245, 238, 230, 0.5)",
    whiteSpace: "nowrap",
    letterSpacing: "0.02em",
  },
};

export default TrustBar;
