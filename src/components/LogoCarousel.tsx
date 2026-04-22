import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getDisplacementFilter,
  supportsBackdropFilterUrl,
} from "~/lib/liquidGlass";

type Logo = { src: string; alt: string };

const logos: Logo[] = [
  { src: "/logos/vw.webp", alt: "Volkswagen" },
  { src: "/logos/mercedes.webp", alt: "Mercedes-Benz" },
  { src: "/logos/skoda.webp", alt: "Škoda" },
  { src: "/logos/vattenfall.webp", alt: "Vattenfall" },
  { src: "/logos/vanguard.webp", alt: "Vanguard" },
  { src: "/logos/targobank.webp", alt: "TargoBank" },
  { src: "/logos/consors.webp", alt: "Consorsbank" },
  { src: "/logos/vonovia.webp", alt: "Vonovia" },
  { src: "/logos/gewobag.webp", alt: "Gewobag" },
  { src: "/logos/howoge.webp", alt: "Howoge" },
  { src: "/logos/berlinovo.webp", alt: "Berlinovo" },
  { src: "/logos/circlon.webp", alt: "Circlon" },
  { src: "/logos/edenspiekermann.webp", alt: "Edenspiekermann" },
  { src: "/logos/atrum.webp", alt: "Atrum" },
  { src: "/logos/wohnmobilekraus.webp", alt: "Wohnmobile Kraus" },
  { src: "/logos/popularc.webp", alt: "Popularc" },
  { src: "/logos/rapidfacture.webp", alt: "Rapidfacture" },
  { src: "/logos/motius.webp", alt: "Motius" },
  { src: "/logos/intech.webp", alt: "Intech" },
  { src: "/logos/bmw.webp", alt: "BMW" },
];

const CARD_W = 176;
const CARD_H = 96;
const GAP = 24;
const BUFFER = CARD_W + GAP;
const MIN_SPACING = CARD_W + GAP;
const SPEED = 25;

const GLASS = {
  depth: 8,
  strength: 20,
  chromaticAberration: 1,
  blur: 0,
  brightness: 1.02,
  saturate: 1.1,
};

export function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const edgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const pausedRef = useRef(false);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!supportsBackdropFilterUrl()) return;

    const applyGlass = (el: HTMLDivElement | null) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;
      const url = getDisplacementFilter({
        width: w,
        height: h,
        radius: 0,
        depth: GLASS.depth,
        strength: GLASS.strength,
        chromaticAberration: GLASS.chromaticAberration,
      });
      const filter = `blur(${GLASS.blur / 2}px) url('${url}') blur(${GLASS.blur}px) brightness(${GLASS.brightness}) saturate(${GLASS.saturate})`;
      el.style.backdropFilter = filter;
      (el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = filter;
    };

    const update = () => edgeRefs.current.forEach(applyGlass);
    update();

    const ro = new ResizeObserver(update);
    edgeRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (width === 0) return;
    const n = logos.length;
    const minL = (n * MIN_SPACING) / 2;
    const L = Math.max(width + 2 * BUFFER, minL);
    const P = 2 * L;
    const bottomY = CARD_H + GAP;

    const place = () => {
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const p = (progressRef.current + (i / n) * P) % P;
        if (p < L) {
          el.style.transform = `translate(${p - BUFFER}px, 0)`;
        } else {
          el.style.transform = `translate(${2 * L - p - BUFFER}px, ${bottomY}px)`;
        }
      }
    };

    place();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        progressRef.current = (progressRef.current + SPEED * dt) % P;
      }
      place();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [width]);

  return (
    <section
      className="relative w-full md:w-5xl py-8 overflow-hidden"
      aria-label="Companies I have worked with"
    >
      <ul className="sr-only">
        {logos.map((logo) => (
          <li key={logo.alt}>{logo.alt}</li>
        ))}
      </ul>
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${2 * CARD_H + GAP}px` }}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        aria-hidden="true"
      >
        {logos.map((logo, i) => (
          <div
            key={logo.alt}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 flex h-24 w-44 items-center justify-center rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 will-change-transform"
            style={{ transform: "translate(-9999px, 0)" }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-full max-w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
      {(
        [
          { side: "left", row: "top" },
          { side: "left", row: "bottom" },
          { side: "right", row: "top" },
          { side: "right", row: "bottom" },
        ] as const
      ).map(({ side, row }, i) => {
        const horizontal = side === "left" ? "left-0" : "right-0";
        const vertical = row === "top" ? "top-8" : "bottom-8";
        const fadeDir = side === "left" ? "to right" : "to left";
        const mask = `linear-gradient(${fadeDir}, black 0%, black 70%, transparent 100%)`;
        return (
          <div
            key={`${side}-${row}`}
            ref={(el) => {
              edgeRefs.current[i] = el;
            }}
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 h-24 w-5 bg-white/5 dark:bg-white/[0.03] ${horizontal} ${vertical}`}
            style={{
              backdropFilter: "blur(1px) saturate(110%)",
              WebkitBackdropFilter: "blur(1px) saturate(110%)",
              boxShadow: "inset 0 0 4px rgba(255,255,255,0.35)",
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </section>
  );
}
