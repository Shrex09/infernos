import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * While `active`: moves focus into the dialog (to `initial`, else the first
 * focusable), keeps Tab / Shift+Tab cycling inside the elements under
 * `getRoots`, and on deactivation hands focus back to whatever had it before.
 */
export const useFocusTrap = (
  active: boolean,
  getRoots: () => (HTMLElement | null)[],
  initial?: () => HTMLElement | null
) => {
  // Latest callbacks without re-running the effect on every render
  const roots = useRef(getRoots);
  const first = useRef(initial);
  roots.current = getRoots;
  first.current = initial;

  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    const items = () =>
      roots.current().flatMap((r) =>
        r ? [...(r.matches(FOCUSABLE) ? [r] : []), ...Array.from(r.querySelectorAll<HTMLElement>(FOCUSABLE))] : []
      );

    // Next frame: a dialog revealed by an animation may still be visibility:hidden right now
    const id = window.setTimeout(() => (first.current?.() ?? items()[0])?.focus({ preventScroll: true }), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        list[list.length - 1].focus();
      } else if (!e.shiftKey && (i === -1 || i === list.length - 1)) {
        e.preventDefault();
        list[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [active]);
};
