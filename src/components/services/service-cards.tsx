import type { ComponentType } from "react";
import type { ProjectType } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { ChatMock, DashboardMock, PhoneMock, PipelineMock, PortalMock, TerminalMock } from "@/components/mockups/mockups";

type Mock = ComponentType<{ className?: string }>;

const cards: { title: string; detail: string; mock: Mock; mockClass: string; type: ProjectType }[] = [
  { title: "AI Agents & Automation", detail: "AI agents, chatbots and workflow automation grounded in your data — with guardrails and human review where it matters.", mock: ChatMock, mockClass: "w-[78%]", type: "AI Product" },
  { title: "SaaS & Web Platforms", detail: "Multi-tenant SaaS, dashboards, portals and marketplaces — fast, secure and ready for paying customers.", mock: DashboardMock, mockClass: "w-[92%]", type: "SaaS" },
  { title: "Mobile App Development", detail: "iOS, Android and cross-platform apps with offline support, push and the same backend as your web product.", mock: PhoneMock, mockClass: "w-[38%]", type: "Mobile App" },
  { title: "CRM & ERP Systems", detail: "One connected system for sales, operations, inventory and customers instead of five tools that don't agree.", mock: PipelineMock, mockClass: "w-[86%]", type: "CRM / ERP" },
  { title: "Custom Software", detail: "Business systems shaped around the way you work, integrated with the tools you already use.", mock: PortalMock, mockClass: "w-[80%]", type: "Custom Software" },
  { title: "API, Backend & Cloud", detail: "Django and Node.js APIs, PostgreSQL, queues and AWS infrastructure with CI/CD and monitoring.", mock: TerminalMock, mockClass: "w-[82%]", type: "Custom Software" },
];

export function ServiceCards() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line bg-bg-1 py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <h2 id="services-title" className="font-display text-[clamp(1.9rem,1.3rem+1.8vw,2.9rem)] leading-[1.15] font-medium tracking-[-0.02em] text-fg">
            Custom Software Development Services
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            Effective software takes more than engineering. It takes strategy, design, AI and development working
            together from the start.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ title, detail, mock: M, mockClass, type }, i) => (
            <RevealItem key={title} delay={(i % 3) * 0.06} className="flex flex-col border border-line bg-surface">
              <div className="force-dark relative grid h-52 place-items-center overflow-hidden bg-[#0b0a14]">
                <div aria-hidden className="absolute inset-0 grid-texture opacity-40" />
                <div aria-hidden className="absolute -bottom-16 -left-10 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(138_61_255/0.45),transparent)]" />
                <div className={`relative ${mockClass} max-w-[360px] translate-y-6`}>
                  <M />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[17px] font-medium text-fg">{title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{detail}</p>
                <div className="mt-auto pt-6">
                  <InquiryLink type={type} variant="secondary" size="md">
                    Discuss Project<span className="sr-only">: {title}</span> <ArrowUpRight size={14} />
                  </InquiryLink>
                </div>
              </div>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
