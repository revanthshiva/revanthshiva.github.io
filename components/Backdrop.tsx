"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Backdrop.module.css";

gsap.registerPlugin(ScrollTrigger);

// Faint "+" marks scattered down the whole page (~one per screen).
const lefts = [12, 78, 45, 88, 22, 63, 8, 70, 35, 92, 18, 55];
const marks = Array.from({ length: 26 }, (_, i) => ({
  left: `${lefts[i % lefts.length]}%`,
  top: `${(2 + (i / 26) * 95).toFixed(1)}%`,
  d: 3 + (i % 4),
}));

// Big faint wordmarks behind the sections, spread through the page.
const words = ["AUTOMATE", "SOFTWARE", "DATA", "SYSTEMS", "SECURE", "SHIP", "RUN"].map((text, i) => ({
  text,
  top: `${9 + i * 13}%`,
  d: 5 + (i % 3),
}));

export default function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(ref);
      (q("[data-depth]") as HTMLElement[]).forEach((el) => {
        gsap.to(el, {
          yPercent: -Number(el.dataset.depth) * 4,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={s.backdrop} aria-hidden="true">
      {words.map(({ text, top, d }) => (
        <span key={text} className={s.word} style={{ top }} data-depth={d}>
          {text}
        </span>
      ))}
      {marks.map(({ left, top, d }, i) => (
        <span key={i} className={s.plus} style={{ left, top }} data-depth={d}>
          +
        </span>
      ))}
    </div>
  );
}
