import React from "react";
import { useReveal, revealStyle } from "../hooks";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo: string;
  result: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The e-commerce platform for our nursery has transformed our business. Online sales have increased by 300% since launch. The team understood our needs perfectly.",
    name: "Mayur Koli",
    role: "Owner",
    company: "Mayur Nursery",
    logo: "/mayur.png",
    result: "+300% online sales",
  },
  {
    quote: "The barcode scanning solution has streamlined our inventory management completely. The integration with our existing systems was flawless. Excellent technical skills and support.",
    name: "Sarah Kumar",
    role: "IT Director",
    company: "MGTech Systems",
    logo: "/mg_logo.png",
    result: "Flawless system integration",
  },
  {
    quote: "A modern healthcare platform that redefines convenience by bringing appointments, records, and care into one intelligent system.",
    name: "Dr. Akshay B. Pawar",
    role: "Owner, Doctor",
    company: "MediCore",
    logo: "/medicore.png",
    result: "Unified patient platform",
  },
];

const Stars: React.FC = () => (
  <div style={{ display: "flex", gap: 4 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <span key={i} style={{ color: "#ffa53c", fontSize: 15, textShadow: "0 0 8px rgba(255,165,60,0.6)" }}>★</span>
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="testimonials" className="section" style={styles.section}>
      <div className="section-inner">
        <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
          <span className="kicker">Client voices</span>
          <h2 className="section-heading">
            What our clients <span className="text-gradient">say</span>
          </h2>
          <p className="section-sub">
            Every quote below comes from a client whose product is linked in
            the work section above.
          </p>
        </div>

        <div ref={grid.ref} style={styles.row}>
          {testimonials.map((t, i) => (
            <div
              key={t.company}
              className="glass hover-glow"
              style={{ ...styles.card, ...revealStyle(grid.visible, i * 120) }}
            >
              <div style={styles.cardTop}>
                <Stars />
                <span style={styles.verified}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Verified client
                </span>
              </div>

              <p style={styles.quote}>"{t.quote}"</p>

              <div style={styles.resultChip}>{t.result}</div>

              <div style={styles.divider} />

              <div style={styles.person}>
                <img src={t.logo} alt={t.company} style={styles.avatarImg} />
                <div style={styles.personInfo}>
                  <span style={styles.name}>{t.name}</span>
                  <span style={styles.role}>{t.role} · {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg-2)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 56,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: 24,
  },
  card: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  verified: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 600,
    color: "#7df0c0",
    background: "rgba(52, 211, 153, 0.08)",
    border: "1px solid rgba(52, 211, 153, 0.3)",
    borderRadius: 999,
    padding: "4px 11px",
    letterSpacing: "0.05em",
  },
  quote: {
    fontSize: 15.5,
    lineHeight: 1.7,
    color: "rgba(245, 238, 230, 0.88)",
    flex: 1,
  },
  resultChip: {
    alignSelf: "flex-start",
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    fontWeight: 600,
    color: "#ffc296",
    background: "rgba(255, 105, 35, 0.1)",
    border: "1px solid rgba(255, 130, 55, 0.3)",
    borderRadius: 8,
    padding: "6px 12px",
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg, rgba(255,130,55,0.3), transparent)",
  },
  person: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    objectFit: "cover",
    background: "#fff",
    padding: 3,
    border: "1px solid rgba(255, 130, 55, 0.3)",
  },
  personInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  name: {
    fontWeight: 600,
    fontSize: 15.5,
    color: "#fff",
  },
  role: {
    fontSize: 13.5,
    color: "var(--faint)",
  },
};

export default Testimonials;
