import React from "react";

const features = [
  "ISO 27001 certified for security",
  "AWS advanced partner network status",
  "GDPR compliant data management",
];

const About: React.FC = () => (
  <section style={styles.section}>
    <div style={styles.container}>
      <div style={styles.component}>
        <div style={styles.contentSide}>
          <div style={styles.content}>
            <div style={styles.sectionTitle}>
              <span style={styles.tagline}>Certifications</span>
              <div style={styles.textBlock}>
                <h2 style={styles.heading}>
                  Industry-leading expertise and credentials
                </h2>
                <p style={styles.text}>
                  The best certifications to validate our expertise in modern web development.
                </p>
              </div>
            </div>
            <ul style={styles.list}>
              {features.map((item, i) => (
                <li key={i} style={styles.listItem}>
                  <span style={styles.checkIcon}>✓</span>
                  <span style={styles.listText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={styles.actions}>
            <a href="#" style={styles.btnOutline}>Learn more</a>
            <a href="#" style={styles.btnLink}>
              Contact <span style={styles.arrow}>›</span>
            </a>
          </div>
        </div>
        <div style={styles.imageSide}>
          <div style={styles.placeholderImg} />
        </div>
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
  },
  component: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    flexWrap: "wrap",
  },
  contentSide: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  sectionTitle: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
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
  },
  text: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "8px 0",
    listStyle: "none",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  checkIcon: {
    width: 16,
    height: 16,
    color: "#FFFFFF",
    fontSize: 14,
    flexShrink: 0,
  },
  listText: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#FFFFFF",
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
    whiteSpace: "nowrap",
  },
  btnLink: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
  },
  arrow: { fontSize: 20 },
  imageSide: {
    flex: "1 1 400px",
  },
  placeholderImg: {
    width: "100%",
    height: 640,
    background: "linear-gradient(135deg, #1a2a3a 0%, #2a3a4a 100%)",
    borderRadius: 16,
  },
};

export default About;
