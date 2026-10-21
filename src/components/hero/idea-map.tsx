"use client";

import Image from "next/image";
import { forwardRef, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { TechLogo, type TechId } from "@/components/tech/tech-logos";

type Out = { label: string; stack: string; logo: TechId };

/** What a brief becomes: each output names the platform and the stack behind it. */
const outputs: Out[] = [
  { label: "Web app", stack: "Next.js", logo: "nextjs" },
  { label: "iOS & Android", stack: "React Native", logo: "react-native" },
  { label: "APIs & admin", stack: "Django · Node.js", logo: "django" },
  { label: "AI agent", stack: "LLM APIs", logo: "llm" },
  { label: "Cloud", stack: "AWS", logo: "aws" },
];

const Node = forwardRef<HTMLDivElement, { className?: string; children: ReactNode }>(function Node({ className, children }, ref) {
  return (
    <div ref={ref} className={cn("relative z-10 border border-white/12 bg-[#0e0d18]/95 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.9)] backdrop-blur", className)}>
      {children}
    </div>
  );
});

const Output = forwardRef<HTMLDivElement, { o: Out; className?: string }>(function Output({ o, className }, ref) {
  return (
    <Node ref={ref} className={cn("flex items-center gap-3 rounded-xl px-3.5 py-3", className)}>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05]">
        <TechLogo id={o.logo} size={18} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[14px] font-medium text-white">{o.label}</span>
        <span className="block text-[12.5px] text-white/55">{o.stack}</span>
      </span>
    </Node>
  );
});

/**
 * Hero visual: a client brief flows into SSLC and out as the pieces of a real
 * product. Beams are decorative; the same information is in the copy.
 */
export function IdeaMap() {
  const container = useRef<HTMLDivElement>(null);
  const idea = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const r0 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      aria-hidden
      className="relative grid grid-cols-2 gap-x-3 gap-y-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 lg:grid-cols-[1.15fr_auto_1fr] lg:items-center lg:gap-x-20 lg:gap-y-0 lg:p-10"
    >
      {/* the brief */}
      <Node ref={idea} className="col-span-2 rounded-xl p-4 lg:col-span-1 lg:p-5">
        <p className="text-[12.5px] text-white/50">Example brief</p>
        <p className="mt-2 text-[15px] leading-relaxed text-white/90">
          “Customers should book and pay from their phone, and my team needs a dashboard to manage it all.”
        </p>
        <p className="mt-4 text-[12.5px] text-white/55">Scoped, designed, built and launched by one team.</p>
      </Node>

      {/* SSLC core */}
      <div className="col-span-2 flex justify-center lg:col-span-1">
        <Node ref={core} className="grid size-24 place-items-center rounded-3xl border-white/25 bg-[#120f24] lg:size-28">
          <div className="absolute inset-[-30%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(138_61_255/0.55),transparent)]" />
          <Image src="/brand/sslc-mark.png" alt="" width={256} height={256} className="size-12 lg:size-14" />
        </Node>
      </div>

      {/* what ships */}
      <div className="col-span-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-1 lg:grid-cols-1">
        <Output o={outputs[0]} ref={r0} />
        <Output o={outputs[1]} ref={r1} />
        <Output o={outputs[2]} ref={r2} />
        <Output o={outputs[3]} ref={r3} />
        <Output o={outputs[4]} ref={r4} className="max-sm:col-span-2" />
      </div>

      <AnimatedBeam containerRef={container} fromRef={idea} toRef={core} duration={3.2} />
      <AnimatedBeam containerRef={container} fromRef={core} toRef={r0} curvature={0} duration={3.2} delay={0.5} />
      <AnimatedBeam containerRef={container} fromRef={core} toRef={r1} curvature={0} duration={3.2} delay={0.75} />
      <AnimatedBeam containerRef={container} fromRef={core} toRef={r2} className="max-lg:hidden" duration={3.2} delay={1} />
      <AnimatedBeam containerRef={container} fromRef={core} toRef={r3} className="max-lg:hidden" curvature={0} duration={3.2} delay={1.25} />
      <AnimatedBeam containerRef={container} fromRef={core} toRef={r4} className="max-lg:hidden" curvature={0} duration={3.2} delay={1.5} />
    </div>
  );
}
