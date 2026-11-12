"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling + scene colours.
 * Every <section data-bg="#hex" data-fg="#hex"> repaints the page as it reaches mid-screen.
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({
        lerp: 0.075, // lower = smoother, more gliding inertia
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.6,
        syncTouch: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Drive in-page anchor clicks (logo, nav) ourselves and force the scrubbed
    // hero to settle on arrival, so a jump never parks its fade mid-animation.
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      const immediate = link.hasAttribute("data-scroll-instant");
      const settle = () => {
        let n = 0;
        const loop = () => {
          ScrollTrigger.update();
          if (++n < 60) requestAnimationFrame(loop);
        };
        loop();
      };
      if (lenis)
        lenis.scrollTo(target, {
          offset: 0,
          immediate,
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          onComplete: settle,
        });
      else if (immediate) {
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
        settle();
      }
      else {
        target.scrollIntoView();
        settle();
      }
    };
    document.addEventListener("click", onAnchorClick);

    const paint = (el: HTMLElement) =>
      gsap.to(root, {
        "--bg": el.dataset.bg,
        "--fg": el.dataset.fg,
        duration: reduce ? 0 : 0.9,
        ease: "power2.inOut",
        overwrite: true,
      });

    // Whichever section spans the middle of the screen sets the colours.
    const sections = gsap.utils.toArray<HTMLElement>("[data-bg]");
    let active: HTMLElement | null = null;
    const update = () => {
      const mid = window.innerHeight / 2;
      const hit = sections.find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      if (hit && hit !== active) {
        active = hit;
        paint(hit);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    ScrollTrigger.addEventListener("refresh", update);

    // Fonts change layout; re-measure once they're in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ScrollTrigger.removeEventListener("refresh", update);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
