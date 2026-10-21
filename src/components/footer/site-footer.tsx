import Image from "next/image";
import Link from "next/link";
import { company, services } from "@/content/site";
import { Tagline } from "@/components/hero/tagline";

const solutionLinks = [
  { label: "AI", id: "ai" },
  { label: "SaaS", id: "saas" },
  { label: "Web", id: "web" },
  { label: "Mobile", id: "mobile" },
  { label: "CRM", id: "crm-erp" },
  { label: "ERP", id: "crm-erp" },
  { label: "Automation", id: "custom" },
].filter((l) => services.some((s) => s.id === l.id));

const companyLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Technology", href: "/#technology" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
  { label: "Client login", href: "/portal/login" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const linkClass = "text-[14px] text-muted transition-colors duration-300 hover:text-fg";

export function SiteFooter() {
  const social = company.social.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <footer className="force-dark relative overflow-hidden border-t border-line bg-bg">
      <div className="container-x relative pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/brand/sslc-mark.png" alt="" width={40} height={40} className="size-10" />
              <span className="flex flex-col leading-none">
                <span className="text-[17px] font-semibold tracking-[0.04em] text-fg">SSLC</span>
                <span className="mt-1 font-mono text-[10px] tracking-[0.42em] text-brand">STARTUP</span>
              </span>
              <span className="sr-only">— home</span>
            </Link>
            <p className="mt-6 max-w-sm text-title font-medium text-fg">
              {company.footerLine[0]}
              <br />
              <span className="text-muted">{company.footerLine[1]}</span>
            </p>
            <Tagline className="mt-5 text-sm sm:text-sm" />
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-muted">
              {company.name} is a software development company building AI agents, SaaS platforms, web applications,
              iOS &amp; Android apps, CRM/ERP systems and cloud infrastructure for startups and growing businesses.
            </p>
          </div>

          <nav aria-label="Solutions">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Solutions</h2>
            <ul className="mt-5 space-y-3">
              {solutionLinks.map((l) => (
                <li key={l.label}>
                  <Link href="/#services" className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Company</h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${company.email}`} className={linkClass}>
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp · {company.phone}
                </a>
              </li>
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-20 text-center text-[clamp(2.5rem,0.25rem+9.5vw,10rem)] leading-[0.8] whitespace-nowrap font-semibold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_var(--outline-text)]"
        >
          SSLC STARTUP
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved. ·{" "}
            <Link href="/privacy" className="underline-offset-4 hover:text-fg hover:underline">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/refund-policy" className="underline-offset-4 hover:text-fg hover:underline">
              Refunds
            </Link>{" "}
            ·{" "}
            <Link href="/cookie-policy" className="underline-offset-4 hover:text-fg hover:underline">
              Cookies
            </Link>
          </p>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase">Software product engineering</p>
        </div>
      </div>
    </footer>
  );
}
