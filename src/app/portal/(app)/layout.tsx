import Link from "next/link";
import type { ReactNode } from "react";
import { requireUser } from "@/lib/portal/auth";
import { Logo } from "@/components/ui/logo";
import { logout } from "../actions";

export default async function PortalAppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  const links =
    user.role === "admin"
      ? [
          { href: "/portal/admin", label: "Clients & projects" },
          { href: "/portal/account", label: "Account" },
        ]
      : [
          { href: "/portal", label: "Overview" },
          { href: "/portal/account", label: "Account" },
        ];

  return (
    <div className="min-h-svh bg-bg-1">
      <header className="border-b border-line bg-bg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-6">
            <Logo />
            <span className="hidden h-5 w-px bg-line-strong sm:block" />
            <nav aria-label="Portal" className="hidden sm:block">
              <ul className="flex gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="rounded-md px-3 py-2 text-[14px] text-muted hover:bg-surface-2 hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-right text-[13px] leading-tight md:block">
              <span className="block font-medium text-fg">{user.name}</span>
              <span className="block text-subtle">{user.role === "admin" ? "SSLC admin" : (user.company ?? user.email)}</span>
            </span>
            <form action={logout}>
              <button type="submit" className="h-9 rounded-md border border-line-strong px-3 text-[13.5px] font-medium text-fg hover:bg-surface-2">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <nav aria-label="Portal mobile" className="border-t border-line sm:hidden">
          <ul className="flex gap-1 px-3 py-1.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-md px-3 py-2 text-[14px] text-muted hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
