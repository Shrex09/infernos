import React from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The e-commerce platform for our nursery has transformed our business. Online sales have increased by 300% since launch. The team understood our needs perfectly.",
    name: "Mayur Koli",
    role: "Owner",
    company: "Mayur Nursery",
    logo: "/mayur.png",
  },
  {
    quote: "The barcode scanning solution has streamlined our inventory management completely. The integration with our existing systems was flawless. Excellent technical skills and support.",
    name: "Sarah Kumar",
    role: "IT Director, MGTech Systems",
    company: "MGTech Systems",
    logo: "/mg_logo.png",
  },
  {
    quote: "A modern healthcare platform that redefines convenience by bringing appointments, records, and care into one intelligent system.",
    name: "Dr.Akshay B.Pawar",
    role: "Owner, Doctor",
    company: "MediCore",
    logo: "/medicore.png",
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
              <img
                src={t.logo}
                alt={t.company}
                style={styles.avatarImg}
              />
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
  width: 66,
  height: 66,
  borderRadius: "50%",
  objectFit: "cover", // 👈 important
  background: "#fff", // optional (good for logos)
  padding: 4, // optional spacing
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
