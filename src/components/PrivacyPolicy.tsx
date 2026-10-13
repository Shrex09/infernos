import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "../lib/motion";
import { CONTACT } from "../data";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LAST_UPDATED = "13 October 2026";

const PrivacyPolicy: React.FC<Props> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="privacy-title">Privacy Policy</h2>
          <button onClick={onClose} aria-label="Close privacy policy" className="modal-close">
            ✕
          </button>
        </div>

        <div className="modal-body" data-lenis-prevent>
          <p className="modal-updated">Last updated: {LAST_UPDATED}</p>

          <p>
            Infernos IT Solutions ("we", "us") respects your privacy. This page explains what we collect through this
            website, why, and what you can do about it.
          </p>

          <h3>What we collect</h3>
          <p>
            When you submit the contact form, we collect your name, phone number, email address, and message. That's
            it — we don't collect anything else about you through this site.
          </p>

          <h3>How it's used</h3>
          <p>
            Submissions are sent to a private Google Sheet via Google Apps Script and used only to respond to your
            enquiry. We don't sell, rent, or share your details with third parties for marketing.
          </p>

          <h3>Local storage</h3>
          <p>
            We store one small value in your browser's local storage: a timestamp used to prevent rapid repeat form
            submissions. It doesn't identify you and never leaves your device.
          </p>

          <h3>Third-party services</h3>
          <p>
            This site loads fonts from Google Fonts, which loads resources directly from Google's servers and may log
            your IP address per{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google's own privacy policy
            </a>
            . We don't run any analytics or advertising trackers on this site.
          </p>

          <h3>Your rights</h3>
          <p>
            Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> at any time to request a copy of, or the
            deletion of, any information you've sent us. We'll action it within a reasonable time.
          </p>

          <h3>Changes</h3>
          <p>If this policy changes, we'll update the date at the top of this page.</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PrivacyPolicy;
