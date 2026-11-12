"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, resumeHref } from "@/app/data";
import s from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

const lines = ["Have something", "your team still", "does by hand?"];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5z" />
    <path d="M9 13h6M9 17h6" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

const tiles = [
  { label: "LinkedIn", sub: "Connect with me", href: "https://www.linkedin.com/in/revanthshiva/", external: true, icon: <LinkedInIcon /> },
  { label: "Résumé", sub: "View & download", href: resumeHref, external: true, icon: <DocIcon /> },
  { label: "Email", sub: profile.email, href: `mailto:${profile.email}`, external: false, icon: <MailIcon /> },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(`.${s.line}`, root.current).forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 120 + i * 90, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 15%", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const from = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${from}`);
    // Opens the visitor's mail client, pre-addressed to me.
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section ref={root} id="contact" className={s.contact} data-bg="#0b0b0f" data-fg="#f3f1ea" aria-labelledby="contact-title">
      <h2 id="contact-title" className={s.big}>
        {lines.map((l) => (
          <span key={l} className={s.line}>
            {l}
          </span>
        ))}
      </h2>
      <p className={s.lead}>Let&rsquo;s turn it into software. I usually reply within a day.</p>

      <div className={s.grid}>
        <form className={s.form} onSubmit={onSubmit}>
          <div className={s.row}>
            <label className={s.field}>
              <span>Your name</span>
              <input name="name" type="text" required autoComplete="name" placeholder="Jane Doe" />
            </label>
            <label className={s.field}>
              <span>Your email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" />
            </label>
          </div>
          <label className={s.field}>
            <span>What do you need built?</span>
            <textarea name="message" rows={4} required placeholder="Tell me about the task your team still does by hand." />
          </label>
          <button type="submit" className={s.submit}>
            {status === "sent" ? "Opening your email…" : "Send message"}
          </button>
          {status === "sent" && (
            <p className={s.note} role="status">
              Your email app should open with the message ready to send. Prefer not to? Use the email tile.
            </p>
          )}
        </form>

        <div className={s.tiles}>
          {tiles.map((t) => (
            <a
              key={t.label}
              className={s.tile}
              href={t.href}
              target={t.external ? "_blank" : undefined}
              rel={t.external ? "noreferrer" : undefined}
            >
              <span className={s.tileIcon}>{t.icon}</span>
              <span className={s.tileText}>
                <span className={s.tileLabel}>{t.label}</span>
                <span className={s.tileSub}>{t.sub}</span>
              </span>
              <span className={s.tileArrow} aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>

      <footer className={s.footer}>
        <p>© 2026 {profile.name}</p>
        <p>{profile.location}</p>
      </footer>
    </section>
  );
}
