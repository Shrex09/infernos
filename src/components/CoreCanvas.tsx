import React, { useEffect, useRef, useState } from "react";
import type { InfernoScene, CorePose } from "../three/InfernoScene";
import { onScroll, prefersReducedMotion, isTouch } from "../lib/motion";

/**
 * Parses a section's `data-orb` / `data-orb-mobile` attribute:
 * "x y scale intensity", e.g. "0.5 0 1 1".
 */
const readPose = (el: Element, mobile: boolean): CorePose | null => {
  const raw = (mobile && el.getAttribute("data-orb-mobile")) || el.getAttribute("data-orb");
  if (!raw) return null;
  const [x, y, scale, intensity] = raw.trim().split(/\s+/).map(Number);
  return { x, y, scale, intensity };
};

/** Fixed full-screen WebGL layer that follows the page's section choreography. */
const CoreCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mobileQuery = window.matchMedia("(max-width: 820px)");

    let scene: InfernoScene | null = null;
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    // three.js lives in its own chunk so text and layout paint before it arrives
    import("../three/InfernoScene")
      .then(({ InfernoScene }) => {
        if (cancelled) return;
        try {
          scene = new InfernoScene(canvas, { mobile: mobileQuery.matches || isTouch(), reducedMotion: prefersReducedMotion() });
        } catch {
          setFailed(true);
          return;
        }
        cleanup = wire(scene);
      })
      .catch(() => !cancelled && setFailed(true));

    const wire = (s: InfernoScene) => {
      const updatePose = () => {
        const vh = window.innerHeight;
        const sections = Array.from(document.querySelectorAll("[data-orb]"));
        let active: Element | undefined = sections[0];
        for (const sec of sections) {
          if (sec.getBoundingClientRect().top <= vh * 0.55) active = sec;
        }
        const pose = active && readPose(active, mobileQuery.matches);
        if (pose) s.setPose(pose);
      };

      const offScroll = onScroll((y, v) => {
        s.setScroll(y, v);
        updatePose();
      });
      const onNativeScroll = () => updatePose();
      window.addEventListener("scroll", onNativeScroll, { passive: true });

      const onPointer = (e: PointerEvent) => {
        s.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const onResize = () => {
        s.resize();
        updatePose();
      };
      window.addEventListener("resize", onResize);

      const onVisibility = () => (document.hidden ? s.stop() : s.start());
      document.addEventListener("visibilitychange", onVisibility);

      updatePose();
      s.start();

      return () => {
        offScroll();
        window.removeEventListener("scroll", onNativeScroll);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    };

    return () => {
      cancelled = true;
      cleanup?.();
      scene?.dispose();
    };
  }, []);

  return (
    <div className="core-layer" aria-hidden="true">
      {failed ? <div className="core-fallback" /> : <canvas ref={canvasRef} className="core-canvas" />}
      <div className="core-vignette" />
      <div className="grain" />
    </div>
  );
};

export default CoreCanvas;
