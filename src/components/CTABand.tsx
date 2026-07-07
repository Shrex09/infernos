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
          <div style={styles.band}>
            <div style={styles.noise} />
            <div style={styles.orb1} />
            <div style={styles.orb2} />
            <div style={styles.orb3} />
            <div style={styles.gridOverlay} className="grid-bg" />
            
            <div style={styles.content}>
              <div style={styles.badge}>
                <span className="status-dot" style={{ background: '#34d399', boxShadow: '0 0 10px rgba(52, 211, 153, 0.6)' }} />
                <span style={styles.badgeText}>AVAILABLE FOR NEW PROJECTS</span>
              </div>
              
              <h2 style={styles.heading}>
                Let's build something <br/>
                <span className="text-gradient" style={{ textShadow: '0 0 40px rgba(232, 67, 28, 0.4)' }}>extraordinary.</span>
              </h2>
              
              <p style={styles.text}>
                Tell us about your project. We reply with an honest assessment —
                scope, timeline and cost — not a sales pitch.
              </p>
              
              <div style={styles.actions}>
                <button className="btn-primary" style={styles.primaryBtn} onClick={() => scrollTo("contact")}>
                  Start a project →
                </button>
                <button className="btn-ghost" style={styles.ghostBtn} onClick={() => scrollTo("work")}>
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
    paddingTop: 80,
    paddingBottom: 100,
  },
  band: {
    position: "relative",
    borderRadius: 32,
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background: "#080403",
    padding: "clamp(60px, 8vw, 100px) 20px",
    overflow: "hidden",
    boxShadow: "0 40px 100px -20px rgba(232, 67, 28, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  noise: {
    position: "absolute",
    inset: 0,
    opacity: 0.15,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
    mixBlendMode: "screen",
    zIndex: 0,
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    opacity: 0.25,
    maskImage: "radial-gradient(ellipse at center, black 10%, transparent 80%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 80%)",
    pointerEvents: "none",
    zIndex: 1,
  },
  orb1: {
    position: "absolute",
    top: "-30%",
    left: "-10%",
    width: "60vw",
    height: "60vw",
    maxWidth: 600,
    maxHeight: 600,
    background: "radial-gradient(circle, rgba(232, 67, 28, 0.25), transparent 60%)",
    filter: "blur(60px)",
    pointerEvents: "none",
    zIndex: 0,
    animation: "float-y 8s ease-in-out infinite",
  },
  orb2: {
    position: "absolute",
    bottom: "-40%",
    right: "-10%",
    width: "70vw",
    height: "70vw",
    maxWidth: 700,
    maxHeight: 700,
    background: "radial-gradient(circle, rgba(255, 165, 60, 0.15), transparent 60%)",
    filter: "blur(80px)",
    pointerEvents: "none",
    zIndex: 0,
    animation: "float-y 12s ease-in-out infinite reverse",
  },
  orb3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "50%",
    background: "radial-gradient(ellipse, rgba(255, 255, 255, 0.04), transparent 60%)",
    filter: "blur(40px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 28,
    zIndex: 2,
    maxWidth: 720,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 16px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 100,
    backdropFilter: "blur(10px)",
  },
  badgeText: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.1em",
    color: "#fff",
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: "clamp(36px, 6vw, 68px)",
    color: "#fff",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  text: {
    fontSize: "clamp(16px, 2vw, 20px)",
    lineHeight: 1.6,
    color: "rgba(255, 255, 255, 0.65)",
    maxWidth: 580,
  },
  actions: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
  },
  primaryBtn: {
    padding: "16px 36px",
    fontSize: 16,
    boxShadow: "0 0 40px rgba(232, 67, 28, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  },
  ghostBtn: {
    padding: "16px 36px",
    fontSize: 16,
    color: "#fff",
    borderColor: "rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
  },
};

export default CTABand;
