"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Motion controller — 1:1 port of the index.html script:
 * - hero H1 line-mask reveal (CSS holds lines at translateY(110%))
 * - .rv reveals (opacity 0 / y:36 → visible at top 88%)
 * - gentle parallax on .wash (scrub 1.2, yPercent -18)
 * Reduced motion: everything is simply made visible.
 */
export default function MotionRoot() {
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".hero h1 .line > span");
    const reveals = document.querySelectorAll<HTMLElement>(".rv");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((el) => (el.style.transform = "none"));
      reveals.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(lines, { y: 0, duration: 1.2, stagger: 0.14, ease: "power4.out", delay: 0.15 });

      reveals.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      document.querySelectorAll<HTMLElement>(".wash").forEach((w) => {
        gsap.to(w, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: w.parentElement, scrub: 1.2 },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
