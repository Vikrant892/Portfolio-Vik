import { useEffect, useState } from "react";
import { lenis } from "./Navbar";

const ScrollProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    let offLenisScroll: (() => void) | undefined;

    const update = () => {
      if (lenis) {
        const limit = lenis.limit;
        setPct(limit > 0 ? (lenis.scroll / limit) * 100 : 0);
        return;
      }
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };

    const tryAttachLenis = () => {
      if (cancelled) return;
      if (lenis) {
        update();
        offLenisScroll = lenis.on("scroll", update);
        return;
      }
      rafId = requestAnimationFrame(tryAttachLenis);
    };

    tryAttachLenis();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      offLenisScroll?.();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="scroll-progress-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: `${pct}%`,
        zIndex: 9999,
        background: "var(--accentColor)",
        pointerEvents: "none",
      }}
    />
  );
};

export default ScrollProgress;
