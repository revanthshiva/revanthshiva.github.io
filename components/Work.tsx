"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities, experience, education } from "@/app/data";
import s from "./Work.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      const slide = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Layers inside each panel move at their own speed while the track slides.
      gsap.utils.toArray<HTMLElement>("[data-speed]", track.current).forEach((layer) => {
        const speed = Number(layer.dataset.speed);
        gsap.fromTo(
          layer,
          { x: 160 * speed },
          {
            x: -160 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: layer.closest(`.${s.panel}`),
              containerAnimation: slide,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Timeline line draws as you read down.
      gsap.fromTo(
        `.${s.rail}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: `.${s.timeline}`, start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="work" className={s.work} data-bg="#0b0b0f" data-fg="#f3f1ea" aria-labelledby="work-title">
      <div ref={pin} className={s.pin}>
        <div className={s.head}>
          <h2 id="work-title" className={s.h2}>Software I’ve built</h2>
          <p className={s.lead}>A selection of what I&rsquo;ve built, from internal platforms to AI tools. Private work is shown without names.</p>
        </div>

        <div ref={track} className={s.track}>
          {capabilities.map((c) => (
            <article key={c.title} className={s.panel} style={{ "--c": c.color } as React.CSSProperties}>
              <div className={s.visual} aria-hidden="true">
                <span className={s.orb} data-speed="0.4" />
                <span className={s.sheet} data-speed="1">
                  <span className={s.sheetBar} />
                  <span className={s.sheetRow} />
                  <span className={s.sheetRow} />
                  <span className={s.sheetRowShort} />
                </span>
              </div>
              <div className={s.copy}>
                <h3 className={s.title}>{c.title}</h3>
                <p className={s.summary}>{c.summary}</p>
                <ul className={s.points}>
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="experience" className={s.exp}>
        <div className={s.expHead}>
          <h2 className={s.h2}>Experience</h2>
          <p className={s.total}>
            <span className={s.totalNum}>4+</span>
            <span className={s.totalLabel}>
              years across software,
              <br />
              web &amp; automation
            </span>
          </p>
        </div>
        <div className={s.timeline}>
          <span className={s.rail} aria-hidden="true" />
          <ol className={s.jobs}>
          {experience.map((e) => {
            const grouped = e.roles.length > 1;
            return (
              <li key={e.org} className={s.job}>
                <p className={s.when}>
                  {e.when}
                  <span className={s.dur}>{e.duration}</span>
                </p>
                <div>
                  {grouped ? (
                    <>
                      <h3 className={s.jobRole}>{e.org}</h3>
                      <p className={s.org}>
                        {e.type} <span className={s.sep}>·</span> {e.duration}
                      </p>
                      <p className={s.loc}>{e.where}</p>
                      <ul className={s.roles}>
                        {e.roles.map((r) => (
                          <li key={r.role}>
                            <span className={s.roleName}>{r.role}</span>
                            <span className={s.roleWhen}>
                              {r.when} <span className={s.sep}>·</span> {r.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h3 className={s.jobRole}>{e.roles[0].role}</h3>
                      <p className={s.org}>
                        {e.org} <span className={s.sep}>·</span> {e.type}
                      </p>
                      <p className={s.loc}>{e.where}</p>
                    </>
                  )}
                </div>
              </li>
            );
          })}
          </ol>
        </div>

        <h3 className={s.eduTitle}>Education</h3>
        <ul className={s.edu}>
          {education.map((e) => (
            <li key={e.title}>
              <strong>{e.title}</strong>
              <span>
                {e.school}, {e.when}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
