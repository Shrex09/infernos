import React from "react";

const CTA: React.FC = () => (
  <section style={styles.section}>
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.inner}>
          <h2 style={styles.heading}>Ready to build something great</h2>
          <p style={styles.text}>
            Let's talk about your project and find out how we can help you reach your goals.
          </p>
        </div>
        <div style={styles.actions}>
          <a href="#" style={styles.btnPrimary}>Contact us</a>
          <a href="#" style={styles.btnOutline}>Learn more</a>
        </div>
      </div>
      <div style={styles.imagePlaceholder} />
    </div>
  </section>
);

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 80,
  },
  content: {
    maxWidth: 768,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    textAlign: "center",
  },
  heading: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(32px, 4vw, 60px)",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
    textAlign: "center",
  },
  text: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.5,
    color: "#FFFFFF",
    textAlign: "center",
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
    color: "#FFFFFF",
    padding: "6px 12px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
    cursor: "pointer",
  },
  imagePlaceholder: {
    width: "100%",
    height: 738,
    background: "linear-gradient(135deg, #1a2a3a 0%, #2a3a4a 100%)",
    borderRadius: 16,
  },
};

export default CTA;
