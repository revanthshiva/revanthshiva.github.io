"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Header.module.css";

gsap.registerPlugin(ScrollTrigger);

const tracked = ["work", "experience", "about", "contact"];

const navItems = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const t = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } },
    );
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let current = "top";
      for (const id of tracked) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          current = id;
          break;
        }
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    gsap.ticker.add(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      gsap.ticker.remove(onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span ref={bar} className={s.progress} aria-hidden="true" />

      <div className={s.dial}>
        <svg className={s.curve} viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden="true">
          <path className={s.track} d="M2 122 Q300 -34 598 122" vectorEffect="non-scaling-stroke" />
        </svg>

        <nav className={s.dialNav} aria-label="Sections">
          <ul>
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? s.navOn : undefined}
                  aria-current={active === id ? "true" : undefined}
                  onMouseDown={(e) => e.preventDefault()}
                  {...(id === "top" ? { "data-scroll-instant": "" } : {})}
                >
                  <span className={s.dot} aria-hidden="true" />
                  <span className={s.navLabel}>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
