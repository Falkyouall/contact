import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  { src: "/logos/faz.webp", alt: "Frankfurter Allgemeine Zeitung" },
];

const CARD_W = 176;
const CARD_H = 96;
const GAP = 24;
const BUFFER = CARD_W + GAP;
const MIN_SPACING = CARD_W + GAP;
const SPEED = 25;

const STRENGTH = 14;
const CA = 2;
const FILTER_ID = "lg-displace";

const strips = [
  { key: "lt", side: "left", row: "top" },
  { key: "lb", side: "left", row: "bottom" },
  { key: "rt", side: "right", row: "top" },
  { key: "rb", side: "right", row: "bottom" },
] as const;

export function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mirrorRefs = useRef<(HTMLDivElement | null)[][]>([[], [], [], []]);
  const progressRef = useRef(0);
  const pausedRef = useRef(false);
  const [width, setWidth] = useState(0);

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
        const p = (progressRef.current + (i / n) * P) % P;
        const x = p < L ? p - BUFFER : 2 * L - p - BUFFER;
        const y = p < L ? 0 : bottomY;
        const transform = `translate(${x}px, ${y}px)`;

        const main = cardRefs.current[i];
        if (main) main.style.transform = transform;

        for (let si = 0; si < 4; si++) {
          const mirror = mirrorRefs.current[si][i];
          if (mirror) mirror.style.transform = transform;
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
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute" }}
      >
        <defs>
          <filter
            id={FILTER_ID}
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.03"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={STRENGTH + CA * 2}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="dR"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={STRENGTH + CA}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="dG"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={STRENGTH}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="dB"
            />
            <feBlend in="dR" in2="dG" mode="screen" result="dRG" />
            <feBlend in="dRG" in2="dB" mode="screen" />
          </filter>
        </defs>
      </svg>

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

      {strips.map((strip, si) => {
        const outerHorizontal = strip.side === "left" ? "left-0" : "right-0";
        const outerVertical = strip.row === "top" ? "top-8" : "bottom-8";
        const innerHorizontal = strip.side === "left" ? "left-0" : "right-0";
        const innerTop = strip.row === "top" ? 0 : -(CARD_H + GAP);
        const filter = `url(#${FILTER_ID})`;
        return (
          <div
            key={strip.key}
            aria-hidden="true"
            className={`pointer-events-none absolute h-24 w-5 overflow-hidden ${outerHorizontal} ${outerVertical}`}
            style={{ filter, WebkitFilter: filter }}
          >
            <div
              className={`absolute ${innerHorizontal} bg-white dark:bg-gray-900`}
              style={{
                top: `${innerTop}px`,
                width: `${width}px`,
                height: `${2 * CARD_H + GAP}px`,
              }}
            >
              {logos.map((logo, li) => (
                <div
                  key={logo.alt}
                  ref={(el) => {
                    mirrorRefs.current[si][li] = el;
                  }}
                  className="absolute left-0 top-0 flex h-24 w-44 items-center justify-center rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 will-change-transform"
                  style={{ transform: "translate(-9999px, 0)" }}
                >
                  <img
                    src={logo.src}
                    alt=""
                    aria-hidden="true"
                    className="max-h-full max-w-full object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {strips.map((strip) => {
        const outerHorizontal = strip.side === "left" ? "left-0" : "right-0";
        const outerVertical = strip.row === "top" ? "top-8" : "bottom-8";
        const fadeDir = strip.side === "left" ? "to right" : "to left";
        const mask = `linear-gradient(${fadeDir}, black 0%, black 70%, transparent 100%)`;
        return (
          <div
            key={`glass-${strip.key}`}
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 h-24 w-5 ${outerHorizontal} ${outerVertical}`}
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          >
            <div
              className="absolute inset-0 bg-white/10 dark:bg-white/[0.06]"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 0 6px rgba(255,255,255,0.25)",
              }}
            />
          </div>
        );
      })}
    </section>
  );
}
