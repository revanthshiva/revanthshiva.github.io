"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { story } from "@/app/data";
import s from "./Story.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(`.${s.chapter}`, root.current).forEach((ch) => {
        // Words light up as the sentence crosses the screen.
        gsap.fromTo(
          ch.querySelectorAll(`.${s.word}`),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ch, start: "top 75%", end: "center 45%", scrub: true },
          },
        );
        // The big number drifts slower than the page: depth.
        gsap.fromTo(
          ch.querySelector(`.${s.num}`),
          { yPercent: 35 },
          {
            yPercent: -35,
            ease: "none",
            scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        // The sentence itself moves a little faster than the page.
        gsap.fromTo(
          ch.querySelector(`.${s.text}`),
          { y: 80 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={s.story} data-bg="#141019" data-fg="#f3f1ea" aria-label="How I work">
      {story.map((c, i) => (
        <div key={i} className={s.chapter}>
          <span className={s.num} aria-hidden="true">
            {i + 1}
          </span>
          <p className={s.kicker}>
            <span className={s.kickerNum}>0{i + 1}</span>
            <span className={s.kickerLabel}>{c.label}</span>
          </p>
          <p className={s.text}>
            {c.text.split(" ").map((w, j) => (
              <span key={j} className={s.word}>
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  );
}
