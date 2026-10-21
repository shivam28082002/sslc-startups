"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { company, nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail, WhatsApp } from "@/components/ui/icons";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      {/* Solid bar (white in light mode); gains a hairline and blur once scrolled. */}
      <div
        className={cn(
          "border-b bg-bg/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-500",
          scrolled || open ? "border-line shadow-[0_6px_24px_-18px_rgb(0_0_0/0.35)]" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[76px] lg:px-10">
          <Logo onClick={close} />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="px-3.5 py-2 text-[14.5px] text-fg/85 transition-colors duration-300 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/portal/login"
              className="hidden h-10 items-center px-2 text-[14px] text-fg/80 transition-colors hover:text-fg lg:inline-flex"
            >
              Client login
            </Link>
            <ThemeToggle />
            <InquiryLink variant="primary" size="md" className="hidden sm:inline-flex">
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
                <InquiryLink variant="primary" size="lg" className="w-full" onClick={close}>
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
                </div>
              </m.div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
