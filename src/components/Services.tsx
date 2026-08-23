import React from "react";
import { useReveal, revealStyle, useTilt } from "../hooks";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

const ic = (d: string) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const services: Service[] = [
  {
    icon: ic("M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"),
    title: "Web development",
    description: "Full-stack web applications with clean architecture, fast load times and infrastructure that scales with your traffic.",
    tags: ["React", "Node.js", "TypeScript"],
  },
  {
    icon: ic("M12 2a4 4 0 014 4v12a4 4 0 01-8 0V6a4 4 0 014-4zM12 18h.01"),
    title: "Mobile applications",
    description: "Native and cross-platform mobile apps with smooth performance and store-ready quality on iOS and Android.",
    tags: ["Flutter", "React Native", "iOS", "Android"],
  },
  {
    icon: ic("M4 4h16v12H4zM4 20h16M9 16v4M15 16v4"),
    title: "UI / UX design",
    description: "Interfaces designed around real user behaviour — wireframes, prototypes and design systems that convert.",
    tags: ["Figma", "Prototyping", "Design systems"],
  },
  {
    icon: ic("M6 9h12M6 15h12M3 5h18v14H3zM7 19v2M17 19v2"),
    title: "E-commerce platforms",
    description: "Storefronts with catalog management, payments and order flows — proven across fashion, fitness and retail clients.",
    tags: ["Payments", "Catalog", "SEO"],
  },
  {
    icon: ic("M21 12a9 9 0 11-9-9M21 3l-9 9M21 3h-6M21 3v6"),
    title: "Digital transformation",
    description: "We modernize legacy workflows into reliable digital systems — from inventory scanning to patient records.",
    tags: ["Automation", "Integrations", "Migration"],
  },
  {
    icon: ic("M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5"),
    title: "Maintenance & support",
    description: "Post-launch monitoring, updates and continuous improvement so the product you ship keeps getting better.",
    tags: ["Monitoring", "Updates", "SLA"],
  },
];

const ServiceCard: React.FC<{ svc: Service; index: number; visible: boolean }> = ({ svc, index, visible }) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt(7);

  return (
    <div style={{ ...revealStyle(visible, index * 90), perspective: 1100 }}>
      <div
        ref={ref}
        className="glass hover-glow"
        style={styles.card}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div style={styles.cardTop}>
          <div style={styles.iconRing}>{svc.icon}</div>
          <span style={styles.cardIndex}>[ 0{index + 1} ]</span>
        </div>
        <h3 style={styles.cardHeading}>{svc.title}</h3>
        <p style={styles.cardText}>{svc.description}</p>
        <div style={styles.tagRow}>
          {svc.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="services" className="section" style={styles.section}>
      <div className="section-inner">
        <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
          <span className="kicker">Services</span>
          <h2 className="section-heading">
            What we <span className="text-gradient">build</span> for you
          </h2>
          <p className="section-sub">
            End-to-end delivery — from the first architecture diagram to the
            production deploy and beyond.
          </p>
        </div>

        <div ref={grid.ref} style={styles.grid}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} visible={grid.visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 64,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
  },
  card: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    height: "100%",
    transformStyle: "preserve-3d",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRing: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ff9357",
    background: "linear-gradient(145deg, rgba(255, 90, 30, 0.18), rgba(255, 165, 60, 0.06))",
    border: "1px solid rgba(255, 130, 55, 0.3)",
    boxShadow: "inset 0 1px 0 rgba(0,0,0,0.08)",
  },
  cardIndex: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--amber)",
  },
  cardHeading: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 19,
    color: "var(--text)",
    letterSpacing: "-0.01em",
  },
  cardText: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "var(--muted)",
    flex: 1,
  },
  tagRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
};

export default Services;
