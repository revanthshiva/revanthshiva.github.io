import type { Metadata } from "next";
import { profile, experience, capabilities, skills, education, languages } from "@/app/data";
import PrintButton from "@/components/PrintButton";
import s from "./resume.module.css";

export const metadata: Metadata = {
  title: "Revanth Shiva — Resume",
  description: "Resume of Revanth Shiva, full-stack developer & IT manager.",
};

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const homeHref = `${base}/`;

const summary =
  "Full-stack developer and IT manager who builds the internal software a business runs on, from operations and finance platforms to engineering portals and AI tools that answer questions straight from the data, and keeps it fast, reliable and easy to change. 4+ years across React, Vue, Laravel, Python and Node, with a growing focus on LLM-powered tooling.";

const skillGroups = ["Frontend", "Backend & data", "AI & automation", "Systems & security"];

// A focused selection of built products for a one–two page resume.
const selectedProjects = capabilities.slice(0, 6);

export default function ResumePage() {
  return (
    <main className={s.page}>
      <div className={s.toolbar}>
        <a href={homeHref} className={s.back} data-scroll-instant>
          ← Back to portfolio
        </a>
        <PrintButton className={s.print} />
      </div>

      <article className={s.sheet}>
        <header className={s.head}>
          <h1 className={s.name}>{profile.name}</h1>
          <p className={s.role}>Full-stack Developer &amp; IT Manager</p>
          <ul className={s.contact}>
            <li>{profile.city}</li>
            <li>
              <a href="tel:+917010538733">+91 70105 38733</a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/revanthshiva/">linkedin.com/in/revanthshiva</a>
            </li>
            <li>
              <a href="https://revanthshiva.github.io">revanthshiva.github.io</a>
            </li>
          </ul>
        </header>

        <section className={s.block}>
          <h2 className={s.h2}>Summary</h2>
          <p className={s.summary}>{summary}</p>
        </section>

        <section className={s.block}>
          <h2 className={s.h2}>Experience</h2>
          {experience.map((e) => (
            <div key={e.org} className={s.job}>
              <div className={s.jobTop}>
                <span className={s.org}>{e.org}</span>
                <span className={s.when}>
                  {e.type}, {e.when}
                </span>
              </div>
              <p className={s.where}>{e.where.replace(" · ", ", ")}</p>
              <ul className={s.roles}>
                {e.roles.map((r) => (
                  <li key={r.role}>
                    <span className={s.roleName}>{r.role}</span>
                    <span className={s.roleWhen}>
                      {r.when} ({r.duration})
                    </span>
                  </li>
                ))}
              </ul>
              {e.points.length > 0 && (
                <ul className={s.points}>
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className={s.block}>
          <h2 className={s.h2}>Projects</h2>
          <ul className={s.projects}>
            {selectedProjects.map((c) => (
              <li key={c.title} className={s.project}>
                <p className={s.projectHead}>
                  <span className={s.projectTitle}>{c.title}</span>
                  <span className={s.projectStack}>{c.stack.join(", ")}</span>
                </p>
                <p className={s.projectSummary}>{c.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.block}>
          <h2 className={s.h2}>Skills</h2>
          <dl className={s.skills}>
            {skills.map((row, i) => (
              <div key={skillGroups[i]} className={s.skillRow}>
                <dt>{skillGroups[i]}</dt>
                <dd>{row.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className={s.twoCol}>
          <section className={s.block}>
            <h2 className={s.h2}>Education</h2>
            <ul className={s.edu}>
              {education.map((ed) => (
                <li key={ed.title}>
                  <span className={s.eduTitle}>{ed.title}</span>
                  <span className={s.eduMeta}>
                    {ed.school}, {ed.when}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={s.block}>
            <h2 className={s.h2}>Languages</h2>
            <p className={s.languages}>{languages}</p>
          </section>
        </div>
      </article>
    </main>
  );
}
