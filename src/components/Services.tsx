import React from "react";

interface Service {
  icon: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: "⬡",
    title: "Web development",
    description: "Full-stack web applications built with modern frameworks and clean architecture.",
  },
  {
    icon: "⊞",
    title: "Mobile applications",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
  },
  {
    icon: "◈",
    title: "UI/UX design",
    description: "Intuitive interfaces and engaging experiences that drive user satisfaction.",
  },
  {
    icon: "⟳",
    title: "Digital transformation",
    description: "Strategic implementation of technology to modernize your business processes.",
  },
];

const Services: React.FC = () => (
  <section style={styles.section}>
    <div style={styles.container}>
      <div style={styles.sectionTitle}>
        <span style={styles.tagline}>Services</span>
        <div style={styles.textBlock}>
          <h2 style={styles.heading}>What we build for you</h2>
          <p style={styles.text}>
            From concept to launch, we provide end-to-end digital solutions that drive results and exceed expectations.
          </p>
        </div>
      </div>
      <div style={styles.grid}>
        {services.map((svc, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.icon}>{svc.icon}</div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardHeading}>{svc.title}</h3>
              <p style={styles.cardText}>{svc.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.actions}>
        <a 
          href="#cta" 
          style={styles.btnOutline}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore
        </a>
      </div>
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
  sectionTitle: {
    maxWidth: 768,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    textAlign: "center",
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 16,
    color: "#FFFFFF",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
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
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 32,
    justifyContent: "center",
    width: "100%",
  },
  card: {
    flex: "1 1 240px",
    maxWidth: 296,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  icon: {
    width: 48,
    height: 48,
    fontSize: 32,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
  },
  cardHeading: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(20px, 2vw, 32px)",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
    textAlign: "center",
  },
  cardText: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#FFFFFF",
    textAlign: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 24,
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
  btnLink: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    cursor: "pointer",
  },
};

export default Services;
