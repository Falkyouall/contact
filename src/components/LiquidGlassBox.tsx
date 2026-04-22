import { useLayoutEffect, useRef } from "react";
import {
  getDisplacementFilter,
  supportsBackdropFilterUrl,
} from "~/lib/liquidGlass";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  depth?: number;
  strength?: number;
  chromaticAberration?: number;
  blur?: number;
  brightness?: number;
  saturate?: number;
};

const DEFAULTS = {
  radius: 16,
  depth: 15,
  strength: 60,
  chromaticAberration: 5,
  blur: 1,
  brightness: 1.05,
  saturate: 2,
};

export function LiquidGlassBox({
  children,
  className = "",
  style,
  ...opts
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const cfg = { ...DEFAULTS, ...opts };

  useLayoutEffect(() => {
    if (!supportsBackdropFilterUrl()) return;
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;
      const url = getDisplacementFilter({
        width: w,
        height: h,
        radius: cfg.radius,
        depth: cfg.depth,
        strength: cfg.strength,
        chromaticAberration: cfg.chromaticAberration,
      });
      const filter = `blur(${cfg.blur / 2}px) url('${url}') blur(${cfg.blur}px) brightness(${cfg.brightness}) saturate(${cfg.saturate})`;
      el.style.backdropFilter = filter;
      (
        el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }
      ).webkitBackdropFilter = filter;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [
    cfg.radius,
    cfg.depth,
    cfg.strength,
    cfg.chromaticAberration,
    cfg.blur,
    cfg.brightness,
    cfg.saturate,
  ]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        borderRadius: cfg.radius,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 0 12px rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.12)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
