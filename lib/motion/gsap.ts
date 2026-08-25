"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapRegistered() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).gsap = gsap;
      (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger =
        ScrollTrigger;
    }
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
