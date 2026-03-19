import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Footer: React.FC = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!email || !message) {
      alert("Please fill all fields");
      return;
    }

    emailjs.send(
      "service_f44xtjm",
      "template_xlypmix",
      {
        user_email: email,
        message: message,
      },
      "cJf6dwcZ25b3FGoFv"
    )
    .then(() => {
      alert("Message sent successfully 🚀");
      setEmail("");
      setMessage("");
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message ❌");
    });
  };

  return (
    


  <footer id="footer" style={styles.footer}>
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Newsletter */}
        <div style={styles.newsletter}>
  <div style={styles.logo}>
    <span style={styles.logoText}>Inferno</span>
  </div>

  <p style={styles.newsletterText}>
    Tell us about your project — we’ll get back to you.
  </p>

  <div style={styles.actions}>
    <input
      type="email"
      placeholder="Your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={styles.input}
    />

    <textarea
      placeholder="Describe your project..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={styles.textarea}
    />

    <button onClick={handleSubmit} style={styles.btnSubscribe}>
      Send
    </button>
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
              {["About us", "Our team","Contact"].map((l, i) => (
                <a key={i} href="#" style={styles.link}>{l}</a>
              ))}
            </div>
          </div>
          <div style={styles.linkCol}>
            <span style={styles.colTitle}>Follow us</span>
            <div style={styles.linkList}>
              {[
                { icon: "◻", name: "Instagram" },
                {name:"Whatsapp", icon: "w"},
                { icon: "in", name: "LinkedIn" },
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
          <span style={styles.copyright}>© Inferno IT Solutions. All rights reserved.</span>
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
};


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
    color: "#000000",
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
  textarea: {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: "10px",
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  color: "#FFFFFF",
  borderRadius: 8,
  outline: "none",
  minHeight: 80,
  resize: "none",
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
