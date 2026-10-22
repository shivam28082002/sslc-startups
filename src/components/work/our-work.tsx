import type { ComponentType } from "react";
import { caseStudies } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { CtaArrow, buttonClass } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { ChatMock, DashboardMock, DocumentMock, PhoneMock, PipelineMock, PortalMock } from "@/components/mockups/mockups";

type Mock = ComponentType<{ className?: string }>;

const panels: { id: string; mock: Mock; glow: string; mockClass: string }[] = [
  // Mock-ups render at a fixed natural width and are scaled, so they never crop sideways.
  { id: "ai-support-agent", mock: ChatMock, glow: "rgb(61 107 255 / 0.55)", mockClass: "w-[340px] scale-[0.95] max-sm:scale-[0.88]" },
  { id: "multi-tenant-saas", mock: DashboardMock, glow: "rgb(168 85 247 / 0.5)", mockClass: "w-[460px] scale-[0.8] max-sm:scale-[0.64]" },
  { id: "realtime-mobile", mock: PhoneMock, glow: "rgb(224 59 255 / 0.45)", mockClass: "w-[190px] scale-[0.85]" },
  { id: "crm-erp-suite", mock: PipelineMock, glow: "rgb(25 196 255 / 0.45)", mockClass: "w-[420px] scale-[0.85] max-sm:scale-[0.72]" },
  { id: "ai-document-automation", mock: DocumentMock, glow: "rgb(91 91 255 / 0.55)", mockClass: "w-[400px] scale-[0.88] max-sm:scale-[0.76]" },
  { id: "customer-portal", mock: PortalMock, glow: "rgb(210 61 255 / 0.45)", mockClass: "w-[380px] scale-[0.88] max-sm:scale-[0.8]" },
];

/**
 * "Our Work" — black stage matching the hero: large showcase cards with a
 * brand-colour glow behind each product mock-up. All entries are solution
 * blueprints (clearly labelled), not client case studies.
 */
export function OurWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="force-dark relative isolate overflow-hidden bg-black py-20 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[420px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_0%,rgb(110_80_255/0.22),transparent_70%)]" />

      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[14px] font-medium text-[#a78bff]">Our Work</p>
          <h2 id="work-title" className="mt-4 font-display text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)] leading-[1.08] font-medium tracking-[-0.02em]">
            Systems we design and engineer end to end
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/65">
            Solution blueprints from data model to device: the products we build for startups and growing businesses.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6">
          {panels.map(({ id, mock: M, glow, mockClass }, i) => {
            const study = caseStudies.find((c) => c.id === id);
            if (!study) return null;
            return (
              <RevealItem
                key={id}
                delay={(i % 2) * 0.08}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0a12] transition-colors duration-500 hover:border-white/25"
              >
                {/* Stage: glow + mock-up, fading into the card */}
                <div
                  className="relative h-[300px] overflow-hidden sm:h-[360px] lg:h-[380px]"
                  style={{ backgroundImage: `radial-gradient(60% 70% at 50% 85%, ${glow}, transparent 75%)` }}
                >
                  <div className="absolute inset-0 grid-texture opacity-[0.15]" aria-hidden />
                  <div className={`absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${mockClass}`}>
                    <div aria-hidden className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3">
                      <M />
                    </div>
                  </div>
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0a12] to-transparent" />
                </div>

                {/* Copy */}
                <div className="relative flex flex-1 flex-col px-6 pb-7 sm:px-8 sm:pb-8">
                  <p className="flex items-center gap-2.5 text-[13px] font-medium text-white/60">
                    <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10.5px] tracking-[0.14em] text-white/70 uppercase">
                      Blueprint
                    </span>
                    {study.name}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(1.3rem,1.05rem+0.7vw,1.65rem)] leading-snug font-medium tracking-[-0.01em]">
                    {study.summary}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white/65">{study.solution}</p>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                    <ul aria-label="Technology" className="flex flex-wrap gap-1.5">
                      {study.technology.map((t) => (
                        <li key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[12px] text-white/75">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white underline-offset-4 hover:underline"
                    >
                      Build something like this<span className="sr-only">: {study.name}</span> <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <a href="#quote" className={buttonClass("primary", "lg", "bg-white text-black")}>
            Discuss your project
            <CtaArrow>
              <ArrowRight size={16} />
            </CtaArrow>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
