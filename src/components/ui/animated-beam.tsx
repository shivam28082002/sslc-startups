"use client";

// Adapted from Magic UI "Animated Beam" (MIT, https://magicui.design/docs/components/animated-beam).
// Uses framer-motion's `m` (the site runs LazyMotion in strict mode).
import { m } from "framer-motion";
import { useEffect, useId, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "white",
  pathWidth = 2,
  pathOpacity = 0.18,
  gradientStartColor = "#19c4ff",
  gradientStopColor = "#a855f7",
}: AnimatedBeamProps) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [box, setBox] = useState({ width: 0, height: 0 });
  const coords = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] };

  useEffect(() => {
    const update = () => {
      const c = containerRef.current;
      const a = fromRef.current;
      const b = toRef.current;
      if (!c || !a || !b) return;
      const cr = c.getBoundingClientRect();
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      setBox({ width: cr.width, height: cr.height });
      // Anchor on the facing edges (not centres) so the beam stays visible between nodes.
      const ax = ra.left - cr.left + ra.width / 2;
      const ay = ra.top - cr.top + ra.height / 2;
      const bx = rb.left - cr.left + rb.width / 2;
      const by = rb.top - cr.top + rb.height / 2;
      const horizontal = Math.abs(bx - ax) > Math.abs(by - ay);
      const dirX = Math.sign(bx - ax) || 1;
      const dirY = Math.sign(by - ay) || 1;
      const sx = horizontal ? ax + (dirX * ra.width) / 2 : ax;
      const sy = horizontal ? ay : ay + (dirY * ra.height) / 2;
      const ex = horizontal ? bx - (dirX * rb.width) / 2 : bx;
      const ey = horizontal ? by : by - (dirY * rb.height) / 2;
      const d = horizontal
        ? `M ${sx},${sy} C ${(sx + ex) / 2},${sy - curvature} ${(sx + ex) / 2},${ey} ${ex},${ey}`
        : `M ${sx},${sy} C ${sx},${(sy + ey) / 2} ${ex},${(sy + ey) / 2} ${ex},${ey}`;
      setPathD(d);
    };
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    update();
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      fill="none"
      width={box.width}
      height={box.height}
      aria-hidden
      className={cn("pointer-events-none absolute top-0 left-0 transform-gpu", className)}
      viewBox={`0 0 ${box.width} ${box.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeLinecap="round" />
      <defs>
        <m.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={coords}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0 }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </m.linearGradient>
      </defs>
    </svg>
  );
}
