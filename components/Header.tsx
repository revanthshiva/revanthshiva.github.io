"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Header.module.css";

gsap.registerPlugin(ScrollTrigger);

const tracked = ["work", "experience", "about", "contact"];

const icons: Record<string, ReactNode> = {
  top: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10.2V20h13v-9.8" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.4" />
      <rect x="14" y="3" width="7" height="7" rx="1.4" />
      <rect x="3" y="14" width="7" height="7" rx="1.4" />
      <rect x="14" y="14" width="7" height="7" rx="1.4" />
    </>
  ),
  experience: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12.5h18" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m4 7 8 5.5L20 7" />
    </>
  ),
};

// Items sit on the dial's curve: path M2 122 Q300 -34 598 122 in a 600x130 box.
// Because the control point's x is the midpoint, x(t) is linear, so even t = even x.
const curveX = (t: number) => ((2 + 596 * t) / 600) * 100; // % of dial width
const curveY = (t: number) => ((122 - 312 * t * (1 - t)) / 130) * 100; // % of dial height

const navItems = [
  { id: "top", label: "Home", t: 0.13 },
  { id: "work", label: "Work", t: 0.315 },
  { id: "experience", label: "Experience", t: 0.5 },
  { id: "about", label: "About", t: 0.685 },
  { id: "contact", label: "Contact", t: 0.87 },
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
            {navItems.map(({ id, label, t }) => (
              <li key={id} style={{ left: `${curveX(t)}%`, top: `${curveY(t)}%` }}>
                <a
                  href={`#${id}`}
                  className={active === id ? s.navOn : undefined}
                  aria-current={active === id ? "true" : undefined}
                  onMouseDown={(e) => e.preventDefault()}
                  {...(id === "top" ? { "data-scroll-instant": "" } : {})}
                >
                  <span className={s.icon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icons[id]}
                    </svg>
                  </span>
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
