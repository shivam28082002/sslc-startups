"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { ArrowRight, LinkedIn, Mail, WhatsApp } from "@/components/ui/icons";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link of the section in the middle of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.split("#")[1] ?? ""))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Scroll lock is applied/released synchronously so in-menu links can
  // scroll the page in the same click that closes the menu.
  const setMenu = (next: boolean) => {
    document.body.style.overflow = next ? "hidden" : "";
    setOpen(next);
  };
  const close = () => setMenu(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "";
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) {
        document.body.style.overflow = "";
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Full-width bar at the top; once scrolled it becomes a floating glass pill. */}
      <div
        className={cn(
          "mx-auto transition-[max-width,margin,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
          scrolled && !open
            ? "mt-2.5 max-w-[1180px] px-2.5 sm:px-4 lg:mt-3"
            : "mt-0 max-w-[1440px] px-0",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between border transition-[height,border-radius,background-color,border-color,box-shadow,padding] duration-500 ease-[var(--ease-out-expo)]",
            scrolled && !open
              ? "h-14 rounded-full border-line-strong bg-bg/85 pr-2 pl-4 shadow-[0_16px_44px_-22px_rgb(60_40_160/0.45)] backdrop-blur-xl sm:pl-5 lg:h-[60px]"
              : "h-16 rounded-none border-transparent border-b-line bg-bg px-5 sm:px-8 lg:h-[76px] lg:px-10",
          )}
        >
          <Logo onClick={close} />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-line bg-fg/[0.03] p-1">
              {nav.map((item) => {
                const hash = item.href.split("#")[1];
                const isActive = hash ? pathname === "/" && active === hash : pathname === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "block rounded-full px-4 py-1.5 text-[14px] transition-colors duration-300",
                        isActive ? "bg-fg/[0.08] text-fg" : "text-fg/70 hover:bg-fg/[0.05] hover:text-fg",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/portal/login"
              className="hidden h-10 items-center px-2.5 text-[14px] text-fg/70 transition-colors hover:text-fg lg:inline-flex"
            >
              Client login
            </Link>
            <ThemeToggle />
            <InquiryLink
              variant="primary"
              size="md"
              className="hidden rounded-full px-5 shadow-[0_0_0_0_rgb(120_80_255/0)] transition-shadow hover:opacity-100 hover:shadow-[0_0_24px_0_rgb(120_80_255/0.5)] sm:inline-flex"
            >
              Start a Project <ArrowRight size={15} />
            </InquiryLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenu(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-10 place-items-center rounded-full border border-line-strong md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-[18px] bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-[18px] bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture fade-mask-radial opacity-60" />
            <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col pt-10 pb-8">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a href={item.href} onClick={close} className="flex items-baseline justify-between py-5">
                      <span className="text-[34px] font-semibold tracking-[-0.03em] text-fg">{item.label}</span>
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </a>
                  </m.li>
                ))}
              </ul>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-auto pt-10"
              >
                <InquiryLink variant="primary" size="lg" className="w-full rounded-full" onClick={close}>
                  Start a Project
                  <ArrowRight size={16} />
                </InquiryLink>
                <div className="mt-6 flex flex-col gap-3 text-sm text-muted">
                  <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 hover:text-fg">
                    <Mail size={15} /> {company.email}
                  </a>
                  <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-fg">
                    <WhatsApp size={15} /> WhatsApp · {company.phone}
                  </a>
                  {company.social
                    .filter((s) => s.label === "LinkedIn" && s.href)
                    .map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-fg">
                        <LinkedIn size={15} /> Follow us on LinkedIn
                      </a>
                    ))}
                </div>
              </m.div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
