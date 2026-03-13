import React from "react";

const logos = [
  { name: "Webflow", icon: "W" },
  { name: "Relume", icon: "R" },
  { name: "Webflow", icon: "W" },
  { name: "Relume", icon: "R" },
  { name: "Webflow", icon: "W" },
  { name: "Relume", icon: "R" },
];

const LogoStrip: React.FC = () => (
  <section style={styles.section}>
    <div style={styles.container}>
      <div style={styles.row}>
        {logos.slice(0, 3).map((logo, i) => (
          <div key={i} style={styles.logoBox}>
            <span style={styles.logoText}>{logo.icon} {logo.name}</span>
          </div>
        ))}
      </div>
      <div style={styles.row}>
        {logos.slice(3).map((logo, i) => (
          <div key={i} style={styles.logoBox}>
            <span style={styles.logoText}>{logo.icon} {logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#CCDDFF",
    padding: "80px 64px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    maxWidth: 1280,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  logoBox: {
    flex: "1 1 calc(33% - 8px)",
    minWidth: 200,
    height: 84,
    background: "#CCDDFF",
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: 16,
    color: "#000B0D",
    letterSpacing: "-0.01em",
  },
};

export default LogoStrip;
