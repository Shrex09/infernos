import React, { useEffect, useRef } from "react";
import { gsap, isTouch } from "../lib/motion";

/** The Infernos "IN" mark — two bars and the ember diagonal, as in the brand logo. */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 28, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="lm-ember" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ff8a3d" />
        <stop offset="1" stopColor="#e2300c" />
      </linearGradient>
      <linearGradient id="lm-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7a1a0a" />
        <stop offset="1" stopColor="#ff5a1f" />
      </linearGradient>
    </defs>
    <path d="M8 9 L13 6 L13 33 L8 36 Z" fill="currentColor" opacity="0.92" />
    <path d="M16 3 L21 0.5 L21 23 L16 26 Z" fill="url(#lm-dark)" />
    <path d="M16 13 L21 10 L30 22 L30 31 Z" fill="url(#lm-ember)" />
    <path d="M27 9 L32 6 L32 33 L27 36 Z" fill="url(#lm-ember)" />
  </svg>
);

/** Pulls its child toward the pointer while hovered. */
export const Magnetic: React.FC<{ children: React.ReactElement; strength?: number }> = ({ children, strength = 0.35 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
};

/** Pill button whose label rolls to a duplicate on hover, with an ember fill rising from below. */
export const RollButton: React.FC<{
  children: string;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  arrow?: boolean;
  className?: string;
}> = ({ children, onClick, href, variant = "solid", type = "button", disabled, arrow = true, className }) => {
  const inner = (
    <>
      <span className="rb-fill" />
      <span className="rb-label">
        <span className="rb-text" data-text={children}>
          {children}
        </span>
        {arrow && (
          <span className="rb-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        )}
      </span>
    </>
  );
  const cls = `roll-btn roll-btn--${variant} ${className ?? ""}`;
  return (
    <Magnetic strength={0.25}>
      {href ? (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <button className={cls} type={type} onClick={onClick} disabled={disabled}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
};

/** Small mono label with a pulsing ember dot, used above section headings. */
export const Eyebrow: React.FC<{ children: React.ReactNode; index?: string; as?: "div" | "h2" }> = ({
  children,
  index,
  as: Tag = "div",
}) => (
  <Tag className="eyebrow" data-reveal>
    {index && (
      <span className="eyebrow-index" aria-hidden="true">
        {index}
      </span>
    )}
    <span className="eyebrow-dot" />
    <span>{children}</span>
  </Tag>
);
