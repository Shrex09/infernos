import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import PrivacyPolicy from "./PrivacyPolicy";

type SendState = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 120, phone: 30, email: 160, message: 4000 };

/**
 * Guards against CSV/formula injection: Google Sheets (and Excel) will
 * execute a cell that starts with =, +, -, @ or a tab/CR as a formula.
 * Prefixing with an apostrophe forces it to render as plain text.
 */
const sheetSafe = (value: string) => {
  const trimmed = value.trim();
  return /^[=+\-@\t\r]/.test(trimmed) ? `'${trimmed}` : trimmed;
};

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "13px 16px",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  color: "var(--text)",
  outline: "none",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
};

const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "rgba(255, 140, 60, 0.6)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 105, 35, 0.15)";
};

const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "var(--border)";
  e.currentTarget.style.boxShadow = "none";
};

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [state, setState] = useState<SendState>("idle");
  const [cooldown, setCooldown] = useState<number>(0);

  // Rate limiting (60 seconds cooldown stored in localStorage)
  useEffect(() => {
    const COOLDOWN_MS = 60 * 1000;
    const checkCooldown = () => {
      const lastSubmit = localStorage.getItem("infernos_last_form_submit");
      if (lastSubmit) {
        const elapsed = Date.now() - parseInt(lastSubmit, 10);
        if (elapsed < COOLDOWN_MS) {
          setCooldown(Math.ceil((COOLDOWN_MS - elapsed) / 1000));
        } else {
          setCooldown(0);
        }
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  // This will be the URL of your deployed Google Apps Script
  const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (cooldown > 0) return;

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail || !trimmedMessage) {
      setFieldError("All fields are required.");
      setState("error");
      return;
    }
    if (!agreed) {
      setFieldError("Please confirm you agree to the Privacy Policy.");
      setState("error");
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setFieldError("Enter a valid email address.");
      setState("error");
      return;
    }
    if (
      trimmedName.length > MAX_LEN.name ||
      trimmedPhone.length > MAX_LEN.phone ||
      trimmedEmail.length > MAX_LEN.email ||
      trimmedMessage.length > MAX_LEN.message
    ) {
      setFieldError("One of the fields is too long.");
      setState("error");
      return;
    }
    if (!scriptUrl) {
      console.error("Missing VITE_GOOGLE_SHEET_URL in your .env.local file");
      setFieldError(null);
      setState("error");
      return;
    }

    try {
      setState("sending");
      setFieldError(null);

      const formData = new FormData();
      formData.append("name", sheetSafe(trimmedName));
      formData.append("phone", sheetSafe(trimmedPhone));
      formData.append("email", sheetSafe(trimmedEmail));
      formData.append("message", sheetSafe(trimmedMessage));

      // We use no-cors so Google accepts the cross-origin POST request directly
      await fetch(scriptUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      localStorage.setItem("infernos_last_form_submit", Date.now().toString());
      setCooldown(60);
      setState("sent");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setAgreed(false);
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };

  const statusLine: Record<SendState, { text: string; color: string } | null> = {
    idle: null,
    sending: { text: "▸ sending…", color: "#ffc296" },
    sent: { text: "✓ Message sent — we'll get back to you within 24 hours.", color: "#7df0c0" },
    error: {
      text: fieldError ? `✗ ${fieldError}` : "✗ Could not send. Check the fields, or email us directly below.",
      color: "#ff8a8a",
    },
  };
  const status = statusLine[state];

  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.topGlow} />
      <div style={styles.container}>
        <div style={styles.content}>
          {/* ── Contact form ── */}
          <div style={styles.formCol}>
            <div style={styles.logoRow}>
              <img src="/infernos.jpeg" alt="Infernos" style={styles.logoImg} />
              <span style={styles.logoText}>INFERNOS</span>
            </div>

            <p style={styles.pitch}>
              Tell us about your project — we reply with a concrete plan, not a
              pitch deck.
            </p>

            <div style={styles.form}>
              <label style={styles.label} htmlFor="contact-name">your_name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={focusOn}
                onBlur={focusOff}
                style={inputBase}
                maxLength={MAX_LEN.name}
                autoComplete="name"
              />

              <label style={styles.label} htmlFor="contact-phone">your_phone</label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="+91 1234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={focusOn}
                onBlur={focusOff}
                style={inputBase}
                maxLength={MAX_LEN.phone}
                autoComplete="tel"
              />

              <label style={styles.label} htmlFor="contact-email">your_email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={focusOn}
                onBlur={focusOff}
                style={inputBase}
                maxLength={MAX_LEN.email}
                autoComplete="email"
              />

              <label style={styles.label} htmlFor="contact-message">project_brief</label>
              <textarea
                id="contact-message"
                placeholder="What are you building? Timeline? Budget range?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={focusOn}
                onBlur={focusOff}
                style={{ ...inputBase, minHeight: 110, resize: "vertical" }}
                maxLength={MAX_LEN.message}
              />

              <div style={styles.consentRow}>
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={styles.consentCheckbox}
                />
                <label htmlFor="contact-consent" style={styles.consentLabel}>
                  I agree to the{" "}
                  <a
                    href="#privacy"
                    style={styles.consentLink}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPrivacy(true);
                    }}
                  >
                    Privacy Policy
                  </a>{" "}
                  and consent to being contacted about this enquiry.
                </label>
              </div>

              <button
                className="btn-primary"
                style={{
                  justifyContent: "center",
                  opacity: state === "sending" || cooldown > 0 ? 0.7 : 1,
                  cursor: state === "sending" || cooldown > 0 ? "not-allowed" : "pointer",
                }}
                onClick={handleSubmit}
                disabled={state === "sending" || cooldown > 0}
              >
                {state === "sending"
                  ? "Sending…"
                  : cooldown > 0
                  ? `Wait ${cooldown}s to resubmit`
                  : "Send message →"}
              </button>

              {status && (
                <span role="status" aria-live="polite" style={{ ...styles.status, color: status.color }}>{status.text}</span>
              )}
            </div>
          </div>

          {/* ── Link columns ── */}
          <div style={styles.links}>
            <div style={styles.linkCol}>
              <span style={styles.colTitle}>services/</span>
              <div style={styles.linkList}>
                {["Web development", "Mobile apps", "UI/UX design", "E-commerce", "Digital transformation"].map((l) => (
                  <a
                    key={l}
                    href="#services"
                    className="footer-link"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={styles.link}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div style={styles.linkCol}>
              <span style={styles.colTitle}>company/</span>
              <div style={styles.linkList}>
                {[
                  { label: "Why us", id: "why" },
                  { label: "Our work", id: "work" },
                  { label: "Process", id: "process" },
                  { label: "Contact", id: "contact" },
                ].map((l) => (
                  <a
                    key={l.id + l.label}
                    href={`#${l.id}`}
                    className="footer-link"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={styles.link}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div style={styles.linkCol}>
              <span style={styles.colTitle}>connect/</span>
              <div style={styles.linkList}>
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
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
                    href: "https://instagram.com/connect.inferno",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" width="20" height="20">
                        <path d="M12.031 0C5.385 0 .003 5.385.003 12.03c0 2.124.551 4.195 1.603 6.012L.032 23.996l6.104-1.6c1.761.947 3.738 1.455 5.894 1.455h.001c6.645 0 12.03-5.384 12.03-12.03S18.675 0 12.031 0zm0 21.848h-.001c-1.796 0-3.555-.483-5.097-1.398l-.365-.216-3.785.992.993-3.69-.236-.376C2.564 15.654 2.015 13.882 2.015 12.03 2.015 6.496 6.51 2.001 12.046 2.001c2.68 0 5.197 1.044 7.093 2.94 1.895 1.896 2.94 4.415 2.94 7.095 0 5.534-4.496 10.029-10.03 10.029h-.018zM17.53 14.34c-.302-.152-1.788-.883-2.065-.984-.277-.101-.479-.151-.68.151-.202.302-.782.984-.959 1.185-.177.202-.353.226-.656.075-.302-.151-1.275-.47-2.43-1.498-.897-.799-1.503-1.785-1.68-2.087-.177-.302-.02-.465.131-.616.136-.136.302-.353.453-.53.151-.176.202-.302.302-.503.101-.202.051-.378-.025-.53-.075-.152-.68-1.638-.933-2.243-.245-.589-.494-.509-.68-.518-.178-.009-.38-.01-.582-.01s-.53.076-.807.378C6.945 7.42 6.09 8.226 6.09 9.864c0 1.637.882 3.222 1.008 3.398.126.177 2.316 3.538 5.612 4.96.786.339 1.4.542 1.88.694.787.25 1.504.214 2.067.13.633-.095 1.788-.73 2.04-1.436.252-.705.252-1.31.177-1.436-.075-.126-.277-.202-.579-.353z" />
                      </svg>
                    ),
                    name: "WhatsApp",
                    href: "https://wa.me/7774942956",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" width="20" height="20">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/infernos-solutions/",
                  },
                ].map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                    <span style={styles.socialIcon}>{s.icon}</span>
                    <span style={styles.link}>{s.name}</span>
                  </a>
                ))}
              </div>

              <div style={styles.responseBox}>
                <span className="status-dot" />
                <span style={styles.responseText}>Typical response: under 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Location ── */}
        <div className="glass" style={styles.locationPanel}>
          <div style={styles.locationInfo}>
            <span style={styles.colTitle}>location/</span>
            <h3 style={styles.locationHeading}>Where we work from</h3>
            <span style={styles.coords}>16.847433° N, 74.596833° E</span>
            <p style={styles.locationCity}>Sangli, Maharashtra, India</p>
            <p style={styles.locationNote}>
              Working with clients everywhere — drop by or book a call.
            </p>
            <a
              href="https://maps.app.goo.gl/wiWJZhKQf5K1g8rE6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={styles.mapLink}
            >
              Open in Google Maps ↗
            </a>
          </div>
          <div style={styles.mapWrap}>
            <iframe
              title="Infernos location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1324.3243147252174!2d74.59683323027285!3d16.847432608436556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc123a16254a443%3A0x6ae884f5ddcafc5d!2sInferno%20IT%20Solutions!5e0!3m2!1sen!2sin!4v1785492786434!5m2!1sen!2sin"
              style={{
                ...styles.mapFrame,
                filter: isDark ? "invert(92%) grayscale(45%) sepia(30%) contrast(88%)" : "none",
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div style={styles.mapEdgeGlow} />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={styles.credits}>
          <div style={styles.divider} />
          <div style={styles.creditRow}>
            <span style={styles.copyright}>
              © {new Date().getFullYear()} Inferno IT Solutions. All rights reserved.
            </span>
            <button
              className="footer-link"
              onClick={() => setShowPrivacy(true)}
              style={styles.privacyBtn}
            >
              Privacy Policy
            </button>
            <span style={styles.builtWith}>built_with: React + TypeScript</span>
            <a href="mailto:connect.inferno@gmail.com" style={styles.emailLink}>
              connect.inferno@gmail.com
            </a>
          </div>
        </div>
      </div>

      <PrivacyPolicy open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    position: "relative",
    background: "var(--bg-2)",
    padding: "100px 64px 48px",
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid rgba(255, 115, 45, 0.12)",
    overflow: "hidden",
  },
  topGlow: {
    position: "absolute",
    top: -200,
    left: "50%",
    transform: "translateX(-50%)",
    width: 800,
    height: 400,
    background: "radial-gradient(ellipse, rgba(255, 100, 35, 0.1), transparent 65%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    maxWidth: 1280,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 64,
    zIndex: 1,
  },
  content: {
    display: "flex",
    gap: 80,
    flexWrap: "wrap",
  },
  formCol: {
    flex: "1 1 380px",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logoImg: {
    height: 30,
    width: 30,
    objectFit: "contain",
    borderRadius: 6,
  },
  logoText: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: 16,
    color: "var(--text)",
    letterSpacing: "0.12em",
  },
  pitch: {
    fontSize: 16,
    lineHeight: 1.6,
    color: "var(--muted)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: 11.5,
    color: "var(--amber)",
    letterSpacing: "0.1em",
    marginTop: 6,
  },
  status: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    marginTop: 4,
  },
  consentRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 4,
  },
  consentCheckbox: {
    width: 18,
    height: 18,
    marginTop: 2,
    flexShrink: 0,
    accentColor: "var(--accent-bright)",
    cursor: "pointer",
  },
  consentLabel: {
    fontSize: 13.5,
    lineHeight: 1.55,
    color: "var(--muted)",
    cursor: "pointer",
  },
  consentLink: {
    color: "var(--accent-text)",
    textDecoration: "underline",
  },
  links: {
    flex: 1,
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
  },
  linkCol: {
    flex: "1 1 140px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  colTitle: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: 14,
    color: "var(--accent-text)",
    letterSpacing: "0.06em",
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
  },
  link: {
    fontSize: 15,
    lineHeight: 1.5,
    color: "var(--muted)",
    padding: "7px 0",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "7px 0",
    cursor: "pointer",
  },
  socialIcon: {
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  responseBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    padding: "10px 14px",
    borderRadius: 10,
    background: "rgba(255, 106, 43, 0.06)",
    border: "1px solid rgba(255, 106, 43, 0.22)",
  },
  responseText: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--accent-text)",
  },
  locationPanel: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0,
    overflow: "hidden",
    borderRadius: 18,
  },
  locationInfo: {
    flex: "1 1 280px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "32px 34px",
  },
  locationHeading: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 21,
    color: "var(--text)",
    letterSpacing: "-0.01em",
  },
  coords: {
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    color: "rgba(255, 165, 75, 0.75)",
    letterSpacing: "0.05em",
  },
  locationCity: {
    fontSize: 16,
    fontWeight: 600,
    color: "var(--text)",
  },
  locationNote: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "var(--muted)",
    flex: 1,
  },
  mapLink: {
    alignSelf: "flex-start",
    padding: "10px 20px",
    fontSize: 14,
    marginTop: 12,
  },
  mapWrap: {
    position: "relative",
    flex: "2 1 420px",
    minHeight: 320,
    borderLeft: "1px solid rgba(255, 122, 47, 0.15)",
  },
  mapFrame: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },
  mapEdgeGlow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    boxShadow: "inset 0 0 60px rgba(10, 6, 4, 0.55)",
  },
  credits: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  divider: {
    width: "100%",
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(255, 130, 55, 0.3), transparent)",
  },
  creditRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  copyright: {
    fontSize: 14,
    color: "var(--faint)",
  },
  privacyBtn: {
    fontSize: 13.5,
    color: "var(--muted)",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: "var(--font-body)",
  },
  builtWith: {
    fontFamily: "var(--font-mono)",
    fontSize: 12.5,
    color: "var(--amber)",
  },
  emailLink: {
    fontFamily: "var(--font-mono)",
    fontSize: 13.5,
    color: "var(--accent-text)",
  },
};

export default Footer;
