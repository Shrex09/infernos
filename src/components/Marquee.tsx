import React, { useEffect, useRef } from "react";
import { gsap, onScroll, prefersReducedMotion } from "../lib/motion";

/**
 * Endless horizontal ticker. Scroll velocity speeds it up and flips its
 * direction, so the band feels physically connected to the page.
 */
const Marquee: React.FC<{ items: string[]; speed?: number; className?: string; separator?: React.ReactNode }> = ({
  items,
  speed = 40,
  className,
  separator = <span className="mq-star">✦</span>,
}) => {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0;
    let dir = -1;
    let boost = 0;
    const off = onScroll((_, v) => {
      if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1;
      boost = Math.min(Math.abs(v) * 0.9, 18);
    });
    const tick = (_t: number, dtMs: number) => {
      const half = el.scrollWidth / 2;
      x += (dir * (speed + boost * 20) * dtMs) / 1000;
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      off();
      gsap.ticker.remove(tick);
    };
  }, [speed]);

  const row = (key: string) => (
    <div className="mq-row" key={key} aria-hidden={key === "b"}>
      {items.map((it, i) => (
        <span className="mq-item" key={i}>
          {it}
          {separator}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="mq-track" ref={track}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
};

export default Marquee;
