import React from "react";
import { useReveal, revealStyle } from "../hooks";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const CTABand: React.FC = () => {
  const { ref, visible } = useReveal(0.25);

  return (
    <section className="section" style={styles.section}>
      <div className="section-inner">
        <div ref={ref} style={{ ...revealStyle(visible) }}>
          <div style={styles.band} className="grid-bg">
            <div style={styles.glow} />
            <div style={styles.content}>
              <span style={styles.mono}>// READY WHEN YOU ARE</span>
              <h2 style={styles.heading}>
                Let's build something <span className="text-gradient">great</span>
              </h2>
              <p style={styles.text}>
                Tell us about your project. We reply with an honest assessment —
                scope, timeline and cost — not a sales pitch.
              </p>
              <div style={styles.actions}>
                <button className="btn-primary" onClick={() => scrollTo("contact")}>
                  Start a project →
                </button>
                <button className="btn-ghost" onClick={() => scrollTo("work")}>
                  See our work first
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg)",
    paddingTop: 60,
    paddingBottom: 60,
  },
  band: {
    position: "relative",
    borderRadius: 24,
    border: "1px solid rgba(255, 122, 47, 0.3)",
    background: "linear-gradient(135deg, rgba(130, 45, 12, 0.35), rgba(16, 9, 6, 0.9))",
    padding: "clamp(40px, 6vw, 80px)",
    overflow: "hidden",
    boxShadow: "0 40px 100px -40px rgba(232, 67, 28, 0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
  },
  glow: {
    position: "absolute",
    top: "-40%",
    right: "-10%",
    width: 500,
    height: 400,
    background: "radial-gradient(ellipse, rgba(255, 140, 60, 0.25), transparent 65%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 20,
    zIndex: 1,
  },
  mono: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    letterSpacing: "0.25em",
    color: "var(--amber)",
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(28px, 4vw, 54px)",
    color: "#fff",
    letterSpacing: "-0.01em",
    lineHeight: 1.15,
  },
  text: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "var(--muted)",
    maxWidth: 560,
  },
  actions: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
  },
};

export default CTABand;
