import { useEffect, useRef, useState } from "react";
import "./styles/ScrollProgress.css";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(scrollPercent);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{
        width: `${progress}%`,
        opacity: progress > 0 ? 1 : 0,
      }}
    />
  );
};

export default ScrollProgress;
