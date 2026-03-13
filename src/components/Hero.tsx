import React from "react";

const Hero: React.FC = () => (
  <section style={styles.section}>
    {/* Background grid of placeholder images */}
    <div style={styles.background}>
      {[0, 1, 2].map((col) => (
        <div key={col} style={styles.bgCol}>
          {[0, 1, 2].map((row) => (
            <div key={row} style={styles.bgImg} />
          ))}
        </div>
      ))}
    </div>
    <div style={styles.overlay} />
    <div style={styles.container}>
      <div style={styles.column}>
        <div style={styles.contentWrap}>
          <h1 style={styles.heading}>
            Build the future with modern IT solutions
          </h1>
          <p style={styles.subtext}>
            We build digital products that transform businesses. From web apps to mobile solutions, we create technology that works.
          </p>
        </div>
        <div style={styles.actions}>
          <a href="#" style={styles.btnPrimary}>Start</a>
          <a href="#" style={styles.btnOutline}>Learn</a>
        </div>
      </div>
    </div>
  </section>
);

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#E5EEFF",
    height: 900,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 64px",
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    inset: 0,
    display: "flex",
    gap: 33,
    justifyContent: "center",
    alignItems: "center",
    transform: "scale(1.1)",
  },
  bgCol: {
    display: "flex",
    flexDirection: "column",
    gap: 33,
  },
  bgImg: {
    width: 400,
    height: 260,
    background: "linear-gradient(135deg, #c8d8f0 0%, #b0c8e8 100%)",
    borderRadius: 16,
    opacity: 0.6,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 1,
  },
  container: {
    maxWidth: 1280,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
    maxWidth: 768,
    width: "100%",
  },
  contentWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  heading: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(40px, 6vw, 84px)",
    lineHeight: 1.1,
    textAlign: "center",
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
  },
  subtext: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.5,
    textAlign: "center",
    color: "#FFFFFF",
    maxWidth: 600,
  },
  actions: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  btnPrimary: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    padding: "6px 12px",
    background: "#0057FF",
    border: "1px solid #0057FF",
    borderRadius: 12,
    cursor: "pointer",
  },
  btnOutline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#000B0D",
    padding: "6px 12px",
    border: "1px solid rgba(0,11,13,0.15)",
    borderRadius: 12,
    cursor: "pointer",
  },
};

export default Hero;
