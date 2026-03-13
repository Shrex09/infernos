import React from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "They understood our vision and delivered exactly what we needed on time and within budget.",
    name: "Sarah Brown",
    role: "CEO, TechStart Inc.",
    company: "Webflow",
  },
  {
    quote: "The team's attention to detail and problem-solving approach made all the difference in our project.",
    name: "James Reid",
    role: "Founder, Digital Ventures",
    company: "Webflow",
  },
  {
    quote: "Working with them transformed how we operate. Professional, reliable, and genuinely invested in our success.",
    name: "Priya Mehta",
    role: "Director, Grow Laya",
    company: "Webflow",
  },
];

const Stars: React.FC = () => (
  <div style={{ display: "flex", gap: 4 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <span key={i} style={{ color: "#FFFFFF", fontSize: 16 }}>★</span>
    ))}
  </div>
);

const Testimonials: React.FC = () => (
  <section style={styles.section}>
    <div style={styles.container}>
      <div style={styles.sectionTitle}>
        <h2 style={styles.heading}>Client voices</h2>
        <p style={styles.text}>See what our partners have to say.</p>
      </div>
      <div style={styles.row}>
        {testimonials.map((t, i) => (
          <div key={i} style={styles.column}>
            <Stars />
            <p style={styles.quote}>"{t.quote}"</p>
            <div style={styles.avatar}>
              <div style={styles.avatarImg} />
              <div style={styles.avatarContent}>
                <span style={styles.name}>{t.name}</span>
                <span style={styles.role}>{t.role}</span>
              </div>
              <div style={styles.companyLogo}>
                <span style={styles.companyName}>⬡ {t.company}</span>
              </div>
            </div>
          </div>
        ))}
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
    gap: 80,
  },
  sectionTitle: {
    maxWidth: 768,
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
  row: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
  },
  column: {
    flex: "1 1 280px",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  quote: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(16px, 1.5vw, 26px)",
    lineHeight: 1.4,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
  },
  avatar: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  avatarImg: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2a3a4a 0%, #3a4a5a 100%)",
  },
  avatarContent: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  role: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  companyLogo: {
    height: 48,
    display: "flex",
    alignItems: "center",
  },
  companyName: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    color: "#FFFFFF",
    letterSpacing: "-0.01em",
  },
};

export default Testimonials;
