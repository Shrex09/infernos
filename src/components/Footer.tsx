import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async () => {
    if (!email || !message) {
      alert("Please fill all fields");
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      alert("Email service is not configured. Please set VITE_EMAILJS_* variables.");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_email: email,
          message,
        },
        publicKey
      );

      alert("Message sent successfully");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <footer id="footer" style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.newsletter}>
            <div style={styles.logo}>
              <span style={styles.logoText}>Inferno</span>
            </div>

            <p style={styles.newsletterText}>
              Tell us about your project - we will get back to you.
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

          <div style={styles.links}>
            <div style={styles.linkCol}>
              <span style={styles.colTitle}>Services</span>
              <div style={styles.linkList}>
                {[
                  "Web development",
                  "Mobile apps",
                  "UI/UX design",
                  "Digital transformation",
                  "Case studies",
                ].map((l, i) => (
                  <a key={i} style={styles.link}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div style={styles.linkCol}>
              <span style={styles.colTitle}>Company</span>
              <div style={styles.linkList}>
                {[
                  { label: "About us", id: "about" },
                  { label: "Our team", id: "team" },
                  { label: "Contact", id: "footer" }
                ].map((l, i) => (
                  <a
                    key={i}
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={styles.link}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div style={styles.linkCol}>
              <span style={styles.colTitle}>Follow us</span>
              <div style={styles.linkList}>
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <defs>
                          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f09433" />
                            <stop offset="25%" stopColor="#e6683c" />
                            <stop offset="50%" stopColor="#dc2743" />
                            <stop offset="75%" stopColor="#cc2366" />
                            <stop offset="100%" stopColor="#bc1888" />
                          </linearGradient>
                        </defs>
                        <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.344 3.608 1.32.975.975 1.258 2.242 1.32 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.344 2.633-1.32 3.608-.975.975-2.242 1.258-3.608 1.32-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.344-3.608-1.32-.975-.975-1.258-2.242-1.32-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.344-2.633 1.32-3.608.975-.975 2.242-1.258 3.608-1.32 1.266-.058 1.646-.07 4.85-.07l.004-.002zm0-2.163c-3.259 0-3.667.014-4.947.072-1.622.074-3.266.452-4.484 1.67C1.351 2.96.973 4.604.899 6.226.841 7.506.827 7.914.827 11.173s.014 3.667.072 4.947c.074 1.622.452 3.266 1.67 4.484 1.218 1.218 2.862 1.596 4.484 1.67 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.622-.074 3.266-.452 4.484-1.67 1.218-1.218 1.596-2.862 1.67-4.484.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.074-1.622-.452-3.266-1.67-4.484-1.218-1.218-2.862-1.596-4.484-1.67-1.28-.058-1.688-.072-4.947-.072z" />
                        <path fill="url(#ig-grad)" d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8z" />
                        <circle fill="url(#ig-grad)" cx="18.406" cy="5.594" r="1.44" />
                      </svg>
                    ),
                    name: "Instagram",
                    href: "https://instagram.com/connect.inferno"
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" width="24" height="24">
                        <path d="M12.031 0C5.385 0 .003 5.385.003 12.03c0 2.124.551 4.195 1.603 6.012L.032 23.996l6.104-1.6c1.761.947 3.738 1.455 5.894 1.455h.001c6.645 0 12.03-5.384 12.03-12.03S18.675 0 12.031 0zm0 21.848h-.001c-1.796 0-3.555-.483-5.097-1.398l-.365-.216-3.785.992.993-3.69-.236-.376C2.564 15.654 2.015 13.882 2.015 12.03 2.015 6.496 6.51 2.001 12.046 2.001c2.68 0 5.197 1.044 7.093 2.94 1.895 1.896 2.94 4.415 2.94 7.095 0 5.534-4.496 10.029-10.03 10.029h-.018zM17.53 14.34c-.302-.152-1.788-.883-2.065-.984-.277-.101-.479-.151-.68.151-.202.302-.782.984-.959 1.185-.177.202-.353.226-.656.075-.302-.151-1.275-.47-2.43-1.498-.897-.799-1.503-1.785-1.68-2.087-.177-.302-.02-.465.131-.616.136-.136.302-.353.453-.53.151-.176.202-.302.302-.503.101-.202.051-.378-.025-.53-.075-.152-.68-1.638-.933-2.243-.245-.589-.494-.509-.68-.518-.178-.009-.38-.01-.582-.01s-.53.076-.807.378C6.945 7.42 6.09 8.226 6.09 9.864c0 1.637.882 3.222 1.008 3.398.126.177 2.316 3.538 5.612 4.96.786.339 1.4.542 1.88.694.787.25 1.504.214 2.067.13.633-.095 1.788-.73 2.04-1.436.252-.705.252-1.31.177-1.436-.075-.126-.277-.202-.579-.353z" />
                      </svg>
                    ),
                    name: "Whatsapp",
                    href: "https://wa.me/9021191174"
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" width="24" height="24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/infernos-solutions/"
                  },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                    <span style={styles.socialIcon}>{s.icon}</span>
                    <span style={styles.link}>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.credits}>
          <div style={styles.divider} />
          <div style={styles.creditRow}>
            <span style={styles.copyright}>
              (c) Inferno IT Solutions. All rights reserved.
            </span>
            <a href="mailto:connect.inferno@gmail.com" style={{ ...styles.copyright, textDecoration: 'none', cursor: 'pointer' }}>
              connect.inferno@gmail.com
            </a>
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
