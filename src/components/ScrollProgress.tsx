"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      if (!bar) return;
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      bar.style.transform = `scaleX(${Math.min(1, progress)})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="scroll-progress"
      className="progress-bar"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
