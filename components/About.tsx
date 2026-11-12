"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, languages, profile } from "@/app/data";
import s from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(`.${s.row}`, root.current).forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          row,
          { xPercent: dir < 0 ? 0 : -25 },
          {
            xPercent: dir < 0 ? -25 : 0,
            ease: "none",
            scrollTrigger: { trigger: `.${s.rows}`, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="about" className={s.about} data-bg="#101015" data-fg="#f3f1ea" aria-labelledby="about-title">
      <div className={s.intro}>
        <h2 id="about-title" className={s.h2}>About</h2>
        <div className={s.text}>
          <p>
            I&rsquo;m a full stack developer and currently the IT Manager at Composite Structures Australia, where I
            design and build the software the business runs on, from React and Vue frontends to REST APIs and SQL
            reporting.
          </p>
          <p>
            I started out building WordPress sites, which taught me that software only matters if people can find it
            and use it. My engineering background in mechatronics taught me to think in systems. I&rsquo;ve also worked
            onsite in New Zealand, alongside international teams. On the side I dig into cybersecurity, probing systems
            with Kali Linux so I understand how what I build can be attacked, and how to defend it.
          </p>
          <p>
            As IT Manager, I also keep the business running underneath the apps: cybersecurity and firewalls, Linux
            servers, and Google Workspace and Microsoft&nbsp;365 administration.
          </p>
          <dl className={s.facts}>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{languages}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={s.rows}>
        <h3 className="visually-hidden">Skills</h3>
        {skills.map((row, i) => {
          // Repeat the row so it always overflows the screen while it slides.
          const items = [...row, ...row, ...row];
          return (
            <ul key={i} className={s.row}>
              {items.map((sk, j) => (
                <li key={j} className={s.skill} aria-hidden={j >= row.length || undefined}>
                  {sk}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
}
