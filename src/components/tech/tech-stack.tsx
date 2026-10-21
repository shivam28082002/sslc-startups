"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { TechLogo, techName, type TechId } from "./tech-logos";

/** The six technologies SSLC leads with, and what each one is used for. */
const core: { id: TechId; role: string; detail: string; with: TechId[] }[] = [
  {
    id: "nextjs",
    role: "Web apps & SaaS dashboards",
    detail: "Fast, SEO-friendly websites, customer portals and multi-tenant SaaS front ends.",
    with: ["typescript", "tailwind"],
  },
  {
    id: "react-native",
    role: "iOS & Android apps",
    detail: "One codebase for both stores, with offline support, push notifications and over-the-air updates.",
    with: ["expo", "flutter"],
  },
  {
    id: "django",
    role: "Business logic & admin",
    detail: "Secure APIs, admin panels, CRM/ERP back offices and background jobs in Python.",
    with: ["python", "celery"],
  },
  {
    id: "nodejs",
    role: "Real-time APIs & integrations",
    detail: "Chat, live updates, webhooks and third-party integrations that need to respond in milliseconds.",
    with: ["graphql", "redis"],
  },
  {
    id: "aws",
    role: "Cloud infrastructure",
    detail: "Containerised deployments, managed databases, storage and monitoring that scale with usage.",
    with: ["docker", "github-actions"],
  },
  {
    id: "llm",
    role: "AI agents & automation",
    detail: "Assistants and agents grounded in your own data, with guardrails and human review where it matters.",
    with: ["claude", "gemini"],
  },
];

const outer: TechId[] = ["python", "typescript", "postgresql", "redis", "docker", "tailwind", "expo", "graphql", "celery", "github-actions"];

export function TechStack() {
  const [active, setActive] = useState<TechId | null>(null);

  return (
    <section id="technology" aria-labelledby="tech-title" className="force-dark relative overflow-hidden bg-black py-20 text-white lg:py-28">
      <div aria-hidden className="absolute inset-0 grid-texture opacity-25" />
      <div aria-hidden className="absolute top-1/2 right-[8%] size-[620px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(112_50_230/0.28),transparent)]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <h2 id="tech-title" className="max-w-xl font-display text-[clamp(1.9rem,1.3rem+1.8vw,2.9rem)] leading-[1.15] font-medium tracking-[-0.02em]">
            The stack behind every SSLC product
          </h2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/70">
            Proven, widely supported technology — so your product is fast today and easy to hire for, extend and scale
            tomorrow.
          </p>

          <ul className="mt-10 border-t border-white/12" onMouseLeave={() => setActive(null)}>
            {core.map((t) => {
              const on = active === t.id;
              const open = (active ?? "nextjs") === t.id;
              return (
                <li key={t.id} className="border-b border-white/12">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(t.id)}
                    onFocus={() => setActive(t.id)}
                    onBlur={() => setActive(null)}
                    aria-describedby={`tech-${t.id}`}
                    className="group grid w-full grid-cols-[44px_minmax(0,1fr)] items-start gap-4 py-4 text-left outline-none focus-visible:bg-white/[0.04]"
                  >
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-xl border bg-white/[0.04] transition-colors duration-300",
                        on ? "border-white/40 bg-white/[0.09]" : "border-white/12",
                      )}
                    >
                      <TechLogo id={t.id} size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-3">
                        <span className="text-[17px] font-semibold">{techName[t.id]}</span>
                        <span className="text-[14px] text-white/60">{t.role}</span>
                      </span>
                      <span
                        id={`tech-${t.id}`}
                        className={cn(
                          "grid text-[14.5px] leading-relaxed text-white/70 transition-[grid-template-rows,opacity] duration-300",
                          open ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 max-lg:mt-1.5 max-lg:grid-rows-[1fr] max-lg:opacity-100",
                        )}
                      >
                        <span className="overflow-hidden">
                          {t.detail}{" "}
                          <span className="text-white/50">With {t.with.map((w) => techName[w]).join(" & ")}.</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <InquiryLink variant="secondary" size="md" className="mt-8 border-white/40 text-white hover:border-white">
            Discuss your stack <ArrowUpRight size={15} />
          </InquiryLink>
        </div>

        {/* Orbit stage — scaled down on small screens */}
        <div aria-hidden className="relative mx-auto h-[330px] w-full sm:h-[480px]">
          <div className="absolute top-1/2 left-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 max-sm:scale-[0.68]">
            <div className="relative flex size-full items-center justify-center">
              <div className="absolute size-28 rounded-full bg-[radial-gradient(closest-side,rgb(138_61_255/0.55),transparent)]" />
              <Image src="/brand/sslc-mark.png" alt="" width={256} height={256} className="relative size-16 drop-shadow-[0_8px_30px_rgb(168_85_247/0.6)]" />

              <OrbitingCircles radius={128} duration={34} iconSize={54}>
                {core.map((t) => (
                  <span
                    key={t.id}
                    className={cn(
                      "grid size-full place-items-center rounded-2xl border bg-[#0f0d1a] shadow-[0_8px_24px_-8px_rgb(0_0_0/0.8)] transition-[transform,border-color,box-shadow] duration-300",
                      active === t.id
                        ? "scale-125 border-white/60 shadow-[0_0_0_4px_rgb(138_61_255/0.35),0_10px_30px_-6px_rgb(138_61_255/0.6)]"
                        : "border-white/15",
                      active && active !== t.id && "opacity-50",
                    )}
                  >
                    <TechLogo id={t.id} size={26} />
                  </span>
                ))}
              </OrbitingCircles>

              <OrbitingCircles radius={212} duration={52} iconSize={40} reverse>
                {outer.map((id) => (
                  <span
                    key={id}
                    title={techName[id]}
                    className={cn("grid size-full place-items-center rounded-full border border-white/12 bg-[#0c0b14] transition-opacity duration-300", active && "opacity-40")}
                  >
                    <TechLogo id={id} size={19} />
                  </span>
                ))}
              </OrbitingCircles>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
