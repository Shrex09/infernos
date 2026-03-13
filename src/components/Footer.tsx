import React from "react";

const Footer: React.FC = () => (
  <footer style={styles.footer}>
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Newsletter */}
        <div style={styles.newsletter}>
          <div style={styles.logo}>
            <span style={styles.logoText}>Logo</span>
          </div>
          <p style={styles.newsletterText}>
            Stay informed on new solutions and industry insights.
          </p>
          <div style={styles.actions}>
            <div style={styles.form}>
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.input}
              />
              <a href="#" style={styles.btnSubscribe}>Subscribe</a>
            </div>
            <p style={styles.disclaimer}>
              You agree to our Privacy Policy and consent to updates.
            </p>
          </div>
        </div>

        {/* Links */}
        <div style={styles.links}>
          <div style={styles.linkCol}>
            <span style={styles.colTitle}>Services</span>
            <div style={styles.linkList}>
              {["Web development", "Mobile apps", "UI/UX design", "Digital transformation", "Case studies"].map((l, i) => (
                <a key={i} href="#" style={styles.link}>{l}</a>
              ))}
            </div>
          </div>
          <div style={styles.linkCol}>
            <span style={styles.colTitle}>Company</span>
            <div style={styles.linkList}>
              {["About us", "Our team", "Careers", "Blog", "Contact"].map((l, i) => (
                <a key={i} href="#" style={styles.link}>{l}</a>
              ))}
            </div>
          </div>
          <div style={styles.linkCol}>
            <span style={styles.colTitle}>Follow us</span>
            <div style={styles.linkList}>
              {[
                { icon: "f", name: "Facebook" },
                { icon: "◻", name: "Instagram" },
                { icon: "✕", name: "X" },
                { icon: "in", name: "LinkedIn" },
                { icon: "▶", name: "YouTube" },
              ].map((s, i) => (
                <a key={i} href="#" style={styles.socialLink}>
                  <span style={styles.socialIcon}>{s.icon}</span>
                  <span style={styles.link}>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div style={styles.credits}>
        <div style={styles.divider} />
        <div style={styles.creditRow}>
          <span style={styles.copyright}>© 2025 Freelance IT Solutions. All rights reserved.</span>
          <div style={styles.footerLinks}>
            {["Privacy policy", "Terms of service", "Cookie settings"].map((l, i) => (
              <a key={i} href="#" style={styles.footerLink}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const styles: Record<string, React.CSSProperties> = {
  footer: {
    background: "#000B0D",
    padding: "80px 64px",
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
  content: {
    display: "flex",
    gap: 128,
    flexWrap: "wrap",
  },
  newsletter: {
    flex: "0 0 400px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  logo: { height: 36, display: "flex", alignItems: "center" },
  logoText: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: "#FFFFFF",
  },
  newsletterText: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  form: {
    display: "flex",
    gap: 16,
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    padding: "8px 0",
    fontFamily: "'Inter', sans-serif",
    fontSize: 18,
    color: "#FFFFFF",
    outline: "none",
  },
  btnSubscribe: {
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
  disclaimer: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  links: {
    flex: 1,
    display: "flex",
    gap: 40,
    flexWrap: "wrap",
  },
  linkCol: {
    flex: "1 1 120px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  colTitle: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
  },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.5,
    color: "#FFFFFF",
    padding: "8px 0",
    cursor: "pointer",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 0",
    cursor: "pointer",
  },
  socialIcon: {
    width: 24,
    height: 24,
    color: "#FFFFFF",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  credits: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  divider: {
    width: "100%",
    height: 1,
    background: "rgba(255,255,255,0.2)",
  },
  creditRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  copyright: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  footerLinks: {
    display: "flex",
    gap: 24,
  },
  footerLink: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.5,
    color: "#FFFFFF",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Footer;
