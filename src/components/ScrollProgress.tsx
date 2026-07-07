import React, { useEffect, useRef } from "react";

/**
 * Thin flame-gradient bar fixed to the top of the viewport that fills
 * as the user scrolls down the page. Width is driven directly on the
 * DOM node from a rAF-throttled scroll listener, so it never re-renders.
 */
const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${p.toFixed(4)})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={styles.track}>
      <div ref={barRef} style={styles.bar} />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  track: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 1001,
    pointerEvents: "none",
  },
  bar: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, #9c2a08, #e8431c 55%, #ffa53c)",
    boxShadow: "0 0 10px rgba(255, 110, 30, 0.55)",
    transform: "scaleX(0)",
    transformOrigin: "left",
  },
};

export default ScrollProgress;
