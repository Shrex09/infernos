import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../lib/motion";
import { CONTACT } from "../data";
import { Eyebrow, RollButton } from "./ui";
import PrivacyPolicy from "./PrivacyPolicy";

type SendState = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 120, phone: 30, email: 160, message: 4000 };
const COOLDOWN_MS = 60 * 1000;
const COOLDOWN_KEY = "infernos_last_form_submit";

/**
 * Guards against CSV/formula injection: Google Sheets (and Excel) will
 * execute a cell that starts with =, +, -, @ or a tab/CR as a formula.
 * Prefixing with an apostrophe forces it to render as plain text.
 */
const sheetSafe = (value: string) => {
  const trimmed = value.trim();
  return /^[=+\-@\t\r]/.test(trimmed) ? `'${trimmed}` : trimmed;
};

const readLastSubmit = () => {
  try {
    return parseInt(localStorage.getItem(COOLDOWN_KEY) ?? "", 10) || 0;
  } catch {
    return 0;
  }
};

const Field: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  max: number;
  autoComplete?: string;
  placeholder: string;
}> = ({ id, label, value, onChange, type = "text", textarea, max, autoComplete, placeholder }) => (
  <div className={`field ${value ? "has-value" : ""}`}>
    <label htmlFor={id}>{label}</label>
    {textarea ? (
      <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} maxLength={max} rows={4} placeholder={placeholder} data-lenis-prevent />
    ) : (
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} maxLength={max} autoComplete={autoComplete} placeholder={placeholder} />
    )}
    <span className="field-line" />
  </div>
);

const Contact: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [state, setState] = useState<SendState>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Rate limiting: 60s between submissions, remembered across reloads
  useEffect(() => {
    const check = () => {
      const elapsed = Date.now() - readLastSubmit();
      setCooldown(elapsed < COOLDOWN_MS ? Math.ceil((COOLDOWN_MS - elapsed) / 1000) : 0);
    };
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-line-inner", {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

  const fail = (msg: string | null) => {
    setFieldError(msg);
    setState("error");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0 || state === "sending") return;

    const n = name.trim();
    const p = phone.trim();
    const em = email.trim();
    const m = message.trim();

    if (!n || !p || !em || !m) return fail("All fields are required.");
    if (!agreed) return fail("Please confirm you agree to the Privacy Policy.");
    if (!EMAIL_RE.test(em)) return fail("Enter a valid email address.");
    if (n.length > MAX_LEN.name || p.length > MAX_LEN.phone || em.length > MAX_LEN.email || m.length > MAX_LEN.message) {
      return fail("One of the fields is too long.");
    }
    if (!scriptUrl) {
      console.error("Missing VITE_GOOGLE_SHEET_URL in your .env.local file");
      return fail(null);
    }

    try {
      setState("sending");
      setFieldError(null);
      const formData = new FormData();
      formData.append("name", sheetSafe(n));
      formData.append("phone", sheetSafe(p));
      formData.append("email", sheetSafe(em));
      formData.append("message", sheetSafe(m));

      // no-cors so Google accepts the cross-origin POST directly
      await fetch(scriptUrl, { method: "POST", body: formData, mode: "no-cors" });

      try {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      } catch {
        /* storage unavailable — cooldown just won't survive a reload */
      }
      setCooldown(60);
      setState("sent");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setAgreed(false);
    } catch (err) {
      console.error(err);
      fail(null);
    }
  };

  const closePrivacy = useCallback(() => setShowPrivacy(false), []);

  const status =
    state === "sending"
      ? { text: "Sending…", tone: "pending" }
      : state === "sent"
      ? { text: "✓ Message sent — we'll get back to you within 24 hours.", tone: "ok" }
      : state === "error"
      ? { text: fieldError ? `✗ ${fieldError}` : "✗ Could not send. Check the fields, or email us directly.", tone: "err" }
      : null;

  return (
    <section id="contact" ref={root} className="section contact" data-orb="0 0.55 1.05 1.15" data-orb-mobile="0 0.62 1 1">
      <div className="container">
        <div className="cta">
          <Eyebrow index="(08)">Let's talk</Eyebrow>
          <h2 className="cta-title">
            <span className="cta-line">
              <span className="cta-line-inner">Let's build</span>
            </span>
            <span className="cta-line">
              <span className="cta-line-inner">
                something <em className="serif-accent">extraordinary.</em>
              </span>
            </span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <p className="lead">
              Tell us about your project. We reply with an honest assessment — scope, timeline and cost — not a sales
              pitch.
            </p>
            <a className="contact-email" href={`mailto:${CONTACT.email}`} data-cursor="Mail">
              {CONTACT.email}
            </a>
            <dl className="contact-list">
              <div>
                <dt>Response</dt>
                <dd>
                  <span className="live-dot" /> Typically under 24h
                </dd>
              </div>
              <div>
                <dt>Studio</dt>
                <dd>
                  <a href={CONTACT.maps} target="_blank" rel="noopener noreferrer">
                    {CONTACT.city} ↗
                  </a>
                </dd>
              </div>
              <div>
                <dt>Social</dt>
                <dd className="contact-socials">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </dd>
              </div>
            </dl>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <Field id="contact-name" label="Your name" value={name} onChange={setName} max={MAX_LEN.name} autoComplete="name" placeholder="John Doe" />
              <Field id="contact-phone" label="Phone" type="tel" value={phone} onChange={setPhone} max={MAX_LEN.phone} autoComplete="tel" placeholder="+91 98765 43210" />
            </div>
            <Field id="contact-email" label="Email" type="email" value={email} onChange={setEmail} max={MAX_LEN.email} autoComplete="email" placeholder="you@company.com" />
            <Field
              id="contact-message"
              label="Project brief"
              value={message}
              onChange={setMessage}
              max={MAX_LEN.message}
              textarea
              placeholder="What are you building? Timeline? Budget range?"
            />

            <label className="consent" htmlFor="contact-consent">
              <input id="contact-consent" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span className="consent-box" aria-hidden="true" />
              <span>
                I agree to the{" "}
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPrivacy(true);
                  }}
                >
                  Privacy Policy
                </a>{" "}
                and consent to being contacted about this enquiry.
              </span>
            </label>

            <div className="form-submit">
              <RollButton type="submit" disabled={state === "sending" || cooldown > 0}>
                {state === "sending" ? "Sending…" : cooldown > 0 ? `Wait ${cooldown}s` : "Send message"}
              </RollButton>
              {status && (
                <span role="status" aria-live="polite" className={`form-status form-status--${status.tone}`}>
                  {status.text}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
      <PrivacyPolicy open={showPrivacy} onClose={closePrivacy} />
    </section>
  );
};

export default Contact;
