import React, { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LAST_UPDATED = "20 August 2026";

const PrivacyPolicy: React.FC<Props> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        style={styles.panel}
        className="glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 id="privacy-title" style={styles.title}>Privacy Policy</h2>
          <button onClick={onClose} aria-label="Close privacy policy" style={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div style={styles.body}>
          <p style={styles.updated}>Last updated: {LAST_UPDATED}</p>

          <p style={styles.p}>
            Infernos IT Solutions ("we", "us") respects your privacy. This
            page explains what we collect through this website, why, and
            what you can do about it.
          </p>

          <h3 style={styles.h3}>What we collect</h3>
          <p style={styles.p}>
            When you submit the contact form, we collect your name, phone
            number, email address, and message. That's it — we don't
            collect anything else about you through this site.
          </p>

          <h3 style={styles.h3}>How it's used</h3>
          <p style={styles.p}>
            Submissions are sent to a private Google Sheet via Google Apps
            Script and used only to respond to your enquiry. We don't sell,
            rent, or share your details with third parties for marketing.
          </p>

          <h3 style={styles.h3}>Local storage</h3>
          <p style={styles.p}>
            We store two small values in your browser's local storage: your
            light/dark theme preference, and a timestamp used to prevent
            rapid repeat form submissions. Neither identifies you and
            neither leaves your device.
          </p>

          <h3 style={styles.h3}>Third-party services</h3>
          <p style={styles.p}>
            This site loads fonts from Google Fonts and embeds a Google
            Maps location — both load resources directly from Google's
            servers, which may log your IP address per{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Google's own privacy policy
            </a>
            . We don't run any analytics or advertising trackers on this
            site.
          </p>

          <h3 style={styles.h3}>Your rights</h3>
          <p style={styles.p}>
            Email{" "}
            <a href="mailto:connect.inferno@gmail.com" style={styles.link}>
              connect.inferno@gmail.com
            </a>{" "}
            at any time to request a copy of, or the deletion of, any
            information you've sent us. We'll action it within a reasonable
            time.
          </p>

          <h3 style={styles.h3}>Changes</h3>
          <p style={styles.p}>
            If this policy changes, we'll update the date at the top of
            this page.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(10, 6, 4, 0.55)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 2000,
  },
  panel: {
    width: "min(640px, 100%)",
    maxHeight: "min(80vh, 720px)",
    display: "flex",
    flexDirection: "column",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 40px 100px -30px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderBottom: "1px solid var(--border)",
    flexShrink: 0,
  },
  title: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 20,
    color: "var(--text)",
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--muted)",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  body: {
    padding: "20px 24px 28px",
    overflowY: "auto",
  },
  updated: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--faint)",
    marginBottom: 16,
  },
  h3: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: 15,
    color: "var(--text)",
    marginTop: 18,
    marginBottom: 6,
  },
  p: {
    fontSize: 14.5,
    lineHeight: 1.65,
    color: "var(--muted)",
  },
  link: {
    color: "var(--accent-text)",
    textDecoration: "underline",
  },
};

export default PrivacyPolicy;
