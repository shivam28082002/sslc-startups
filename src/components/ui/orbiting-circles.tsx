// Adapted from Magic UI "Orbiting Circles" (MIT, https://magicui.design/docs/components/orbiting-circles).
import React from "react";
import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  /** Seconds per revolution. */
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  ...props
}: OrbitingCirclesProps) {
  const count = React.Children.count(children);
  return (
    <>
      {path ? (
        <svg aria-hidden className="pointer-events-none absolute inset-0 size-full">
          <circle className="stroke-white/12" strokeWidth={1} strokeDasharray="2 6" cx="50%" cy="50%" r={radius} fill="none" />
        </svg>
      ) : null}
      {React.Children.map(children, (child, index) => (
        <div
          style={
            {
              "--duration": duration,
              "--radius": radius,
              "--angle": (360 / count) * index,
              "--icon-size": `${iconSize}px`,
            } as React.CSSProperties
          }
          className={cn(
            "absolute flex size-(--icon-size) animate-orbit transform-gpu items-center justify-center rounded-full",
            reverse && "[animation-direction:reverse]",
            className,
          )}
          {...props}
        >
          {child}
        </div>
      ))}
    </>
  );
}
