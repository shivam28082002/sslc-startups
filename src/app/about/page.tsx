import type { Metadata } from "next";
import type { ReactNode } from "react";
import { company, differentiators, processSteps, services } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, ArrowUpRight, LinkedIn, WhatsApp } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description: `${company.name} is a Udyam-registered software development company in Noida, India, founded in 2024. Meet the team, see how we work and verify our registration.`,
  alternates: { canonical: "/about" },
};

const founded = new Date(company.registration.founded);
const foundedLabel = founded.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const facts = [
  { label: "Founded", value: String(founded.getUTCFullYear()) },
  { label: "Based in", value: company.location.label },
  { label: "Registered MSME", value: "Udyam" },
  { label: "Service lines", value: String(services.length) },
];

const details: { label: string; value: ReactNode }[] = [
  { label: "Enterprise name", value: "SSLC Startup" },
  { label: "Registration", value: "Udyam Registered MSME, Ministry of Micro, Small & Medium Enterprises, Government of India" },
  {
    label: "Udyam registration number",
    value: (
      <a href={company.registration.verifyUrl} target="_blank" rel="noopener noreferrer" className="font-mono whitespace-nowrap">
        {company.registration.number} <ArrowUpRight size={13} className="inline" />
      </a>
    ),
  },
  { label: "Enterprise type", value: "Micro enterprise" },
  { label: "Major activity", value: "Services: computer programming (NIC 62011)" },
  { label: "Date of incorporation", value: foundedLabel },
  { label: "Location", value: "Noida, Gautam Buddha Nagar, Uttar Pradesh, India" },
  { label: "Email", value: <a href={`mailto:${company.email}`}>{company.email}</a> },
  {
    label: "Phone / WhatsApp",
    value: (
      <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
        {company.phone}
      </a>
    ),
  },
  ...company.social
    .filter((s) => s.href)
    .map((s) => ({
      label: s.label,
      value: (
        <a href={s.href} target="_blank" rel="noopener noreferrer">
          {s.href.replace("https://www.", "")}
        </a>
      ),
    })),
];

const orgId = `${siteUrl}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/about#page`,
      url: `${siteUrl}/about`,
      name: `About ${company.name}`,
      about: { "@id": orgId },
      mainEntity: { "@id": orgId },
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/about#founder`,
      name: company.founder.name,
      jobTitle: company.founder.role,
      sameAs: [company.founder.linkedin],
      worksFor: { "@id": orgId },
    },
    { "@type": "Organization", "@id": orgId, founder: { "@id": `${siteUrl}/about#founder` } },
  ],
};

const initials = company.founder.name
  .split(" ")
  .map((p) => p[0])
  .join("");

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-bg pt-16 lg:pt-[76px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Intro on the same black stage as the home hero */}
        <section aria-labelledby="about-title" className="force-dark relative isolate overflow-hidden bg-black text-white">
          <div aria-hidden className="pointer-events-none absolute bottom-[-40%] left-1/2 -z-10 h-[520px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_100%,rgb(61_107_255/0.4),rgb(138_61_255/0.2)_45%,transparent_72%)]" />
          <div className="container-x py-16 sm:py-20 lg:py-24">
            <p className="text-[14px] font-medium text-[#8fb0ff]">About</p>
            <h1 id="about-title" className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,1.2rem+3.4vw,4rem)] leading-[1.06] font-medium tracking-[-0.03em]">
              We build software that businesses run on
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/72 sm:text-[18px]">
              {company.name} is a software development company in {company.location.label}. Since {founded.getUTCFullYear()} we
              have been designing and engineering AI agents, web platforms, mobile apps and business systems for startups
              and growing businesses.
            </p>

            <dl className="mt-12 grid grid-cols-2 border-t border-white/12 lg:grid-cols-4">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={[
                    "flex flex-col-reverse py-6 pr-4",
                    i % 2 === 1 ? "border-l border-white/12 pl-5 lg:pl-6" : "",
                    i >= 2 ? "border-t border-white/12 lg:border-t-0" : "",
                    i === 2 ? "lg:border-l lg:pl-6" : "",
                  ].join(" ")}
                >
                  <dt className="mt-2 text-[14px] text-white/60">{f.label}</dt>
                  <dd className="font-display text-[clamp(1.3rem,1rem+1vw,1.9rem)] leading-tight font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Who we are */}
        <section aria-labelledby="who-title" className="py-20 lg:py-28">
          <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <h2 id="who-title" className="font-display text-[clamp(1.7rem,1.2rem+1.5vw,2.6rem)] leading-[1.1] font-medium tracking-[-0.02em] text-fg">
                Who we are
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="space-y-5 text-[17px] leading-relaxed text-muted">
              <p>
                SSLC takes a product from idea to production and keeps improving it after launch. The people who scope
                your project also design it, write the code and deploy it, so nothing gets lost in a hand-off.
              </p>
              <p>
                Our work covers {services.map((s) => s.name).join(", ").replace(/, ([^,]*)$/, " and $1")}. We build on
                proven technology (React, Next.js, React Native, Python, Django, Node.js, PostgreSQL and AWS) and add AI
                where it removes real work.
              </p>
              <p>
                We are a registered MSME with the Government of India. Our Udyam registration,{" "}
                <a href={company.registration.verifyUrl} target="_blank" rel="noopener noreferrer" className="font-mono whitespace-nowrap text-fg underline underline-offset-4">
                  {company.registration.number}
                </a>
                , can be verified by anyone on the official Udyam portal.
              </p>
            </Reveal>
          </div>
        </section>

        {/* How we work */}
        <section aria-labelledby="principles-title" className="border-t border-line bg-surface/40 py-20 lg:py-28">
          <div className="container-x">
            <Reveal>
              <h2 id="principles-title" className="font-display text-[clamp(1.7rem,1.2rem+1.5vw,2.6rem)] leading-[1.1] font-medium tracking-[-0.02em] text-fg">
                How we work
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((d) => (
                <li key={d.title} className="bg-bg p-7 sm:p-8">
                  <h3 className="font-display text-[18px] font-medium text-fg">{d.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{d.detail}</p>
                </li>
              ))}
              <li className="flex flex-col justify-between gap-6 bg-bg p-7 sm:p-8">
                <p className="font-display text-[18px] font-medium text-fg">Free consultation before any proposal.</p>
                <InquiryLink variant="primary" size="md" className="self-start rounded-full">
                  Start a Project <ArrowRight size={15} />
                </InquiryLink>
              </li>
            </ul>

            <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {processSteps.map((s) => (
                <li key={s.n} className="border-t border-line pt-5">
                  <p className="font-mono text-[12px] text-subtle">{s.n}</p>
                  <h3 className="mt-2 font-display text-[17px] font-medium text-fg">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Founder */}
        <section aria-labelledby="team-title" className="py-20 lg:py-28">
          <div className="container-x">
            <Reveal>
              <h2 id="team-title" className="font-display text-[clamp(1.7rem,1.2rem+1.5vw,2.6rem)] leading-[1.1] font-medium tracking-[-0.02em] text-fg">
                Who leads SSLC
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-10 flex max-w-3xl flex-col gap-6 rounded-2xl border border-line p-7 sm:flex-row sm:items-start sm:p-8">
              <span aria-hidden className="grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#19c4ff] via-[#5b5bff] to-[#d23dff] font-display text-[26px] font-medium text-white">
                {initials}
              </span>
              <div>
                <p className="font-display text-[20px] font-medium text-fg">{company.founder.name}</p>
                <p className="mt-1 text-[14px] text-subtle">
                  {company.founder.role}, {company.name}
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{company.founder.bio}</p>
                <a
                  href={company.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[14px] font-medium text-fg transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
                >
                  <LinkedIn size={15} /> Connect on LinkedIn<span className="sr-only">: {company.founder.name}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Company details */}
        <section aria-labelledby="details-title" className="border-t border-line py-20 lg:py-28">
          <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <h2 id="details-title" className="font-display text-[clamp(1.7rem,1.2rem+1.5vw,2.6rem)] leading-[1.1] font-medium tracking-[-0.02em] text-fg">
                Company details
              </h2>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted">
                The facts you need before working with us, all checkable.
              </p>
            </Reveal>
            <dl className="divide-y divide-line border-y border-line text-[15.5px]">
              {details.map((d) => (
                <div key={d.label} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
                  <dt className="text-subtle">{d.label}</dt>
                  <dd className="min-w-0 break-words text-fg [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-fg/70">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="force-dark bg-black py-20 text-white lg:py-24">
          <div className="container-x flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="max-w-[20ch] font-display text-[clamp(1.7rem,1.2rem+1.6vw,2.7rem)] leading-[1.1] font-medium tracking-[-0.02em]">
              Have a project in mind? Let&apos;s talk.
            </h2>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <InquiryLink variant="primary" size="lg" className="w-full rounded-full bg-white text-black sm:w-auto">
                Get a free estimate <ArrowRight size={16} />
              </InquiryLink>
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/30 px-6 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/5 sm:w-auto"
              >
                <WhatsApp size={17} className="text-[#25d366]" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
