# Revanth Shiva — Portfolio

Personal portfolio site for **Revanth Shiva**, full-stack developer & IT manager.
A dark, motion-led scroll story covering the software I build, my experience, and how to get in touch.

**Live sections:** Hero · Work (software I've built) · Experience · About · Contact

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript, Turbopack)
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll-driven animation
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- CSS Modules with CSS custom properties for theming (no Tailwind)
- Fonts: Unbounded (display) + Atkinson Hyperlegible Next (body)

All site content lives in [`app/data.ts`](app/data.ts).

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Accessibility & motion

Animations respect `prefers-reduced-motion`, and the navigation is keyboard-operable with visible focus states.

---

© Revanth Shiva
