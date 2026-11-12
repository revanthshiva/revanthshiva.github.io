"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, heroStats } from "@/app/data";
import s from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);


export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(q(`.${s.reveal}`), { yPercent: 115, duration: 1, stagger: 0.09 })
        .from(q(`.${s.fade}`), { opacity: 0, y: 18, duration: 0.8, stagger: 0.06 }, 0.4)
        .from(q(`.${s.rail}`), { opacity: 0, y: 24, duration: 0.9 }, 0.5)
        .from(q(`.${s.layer}`), { opacity: 0, duration: 1.4 }, 0.1);

      const depth = q("[data-depth]") as HTMLElement[];
      depth.forEach((el) => {
        gsap.to(el, {
          yPercent: -Number(el.dataset.depth) * 9,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Pointer parallax for backdrop layers + a gentle tilt on the info cards.
      const movers = [...depth, ...(q("[data-tilt]") as HTMLElement[])].map((el) => ({
        d: Number(el.dataset.depth ?? el.dataset.tilt),
        x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(-nx * m.d * 14);
          m.y(-ny * m.d * 12);
        });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={s.hero} data-bg="#0b0b0f" data-fg="#f3f1ea" aria-label="Introduction">
      <div className={s.bg} aria-hidden="true">
        <span className={`${s.layer} ${s.glow}`} data-depth="2" />
        <span className={`${s.layer} ${s.bgText}`} data-depth="5">
          BUILD
        </span>
        <span className={`${s.layer} ${s.plus} ${s.p1}`} data-depth="3">+</span>
        <span className={`${s.layer} ${s.plus} ${s.p2}`} data-depth="6">+</span>
        <span className={`${s.layer} ${s.plus} ${s.p3}`} data-depth="4">+</span>
      </div>

      <div className={s.grid}>
        {/* left: identity */}
        <div className={s.inner}>
          <p className={`${s.status} ${s.fade}`}>
            <span className={s.dot} aria-hidden="true" />
            <span>
              <b>Available for new work.</b> Based in Bengaluru and happy to relocate.
            </span>
          </p>

          <h1 className={s.name}>
            <span className={s.mask}>
              <span className={s.reveal}>Revanth</span>
            </span>
            <span className={s.mask}>
              <span className={s.reveal}>Shiva</span>
            </span>
          </h1>

          <p className={`${s.role} ${s.fade}`}>Full-stack developer &amp; IT manager</p>
          <p className={`${s.tagline} ${s.fade}`}>{profile.tagline}</p>

          <div className={`${s.actions} ${s.fade}`}>
            <a className={s.primary} href="#work">
              View my work <span aria-hidden="true">→</span>
            </a>
            <a className={s.secondary} href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        {/* right: a short readout */}
        <aside className={s.rail} data-tilt="1.2" aria-label="In brief">
          <p className={s.note}>
            I build and run the internal software a business depends on — operations and
            finance platforms, engineering portals, and AI tools that answer questions
            straight from the data.
          </p>

          <dl className={s.stats}>
            {heroStats.map((st) => (
              <div key={st.label}>
                <dt>{st.num}</dt>
                <dd>{st.label}</dd>
              </div>
            ))}
          </dl>

          <p className={s.stack}>
            Mostly <strong>React</strong>, <strong>Vue</strong>, <strong>Laravel</strong>,{" "}
            <strong>Python</strong> and <strong>Node</strong>, with a growing amount of LLM work.
          </p>

          <div className={s.links}>
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                <span className={s.linkIcon} aria-hidden="true">
                  {/linkedin/i.test(l.label) ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" />
                    </svg>
                  )}
                </span>
                {l.label}
              </a>
            ))}
          </div>
        </aside>
      </div>

      <p className={`${s.scroll} ${s.fade}`} aria-hidden="true">
        Scroll <span className={s.scrollLine} />
      </p>
    </section>
  );
}
