import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { company } from "@/content/site";
import { getSession } from "@/lib/portal/auth";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  const user = await getSession();
  if (user) redirect(user.role === "admin" ? "/portal/admin" : "/portal");

  return (
    <main className="grid min-h-svh bg-bg lg:grid-cols-[1fr_minmax(0,560px)]">
      <section className="force-dark relative hidden overflow-hidden bg-black p-12 lg:flex lg:flex-col">
        <div aria-hidden className="absolute inset-0 grid-texture opacity-40" />
        <div aria-hidden className="absolute -bottom-40 -left-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(112_50_230/0.45),transparent)]" />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative mt-auto max-w-md">
          <p className="font-display text-[34px] leading-[1.15] font-medium text-white">Your project, in one place.</p>
          <p className="mt-4 text-[16px] leading-relaxed text-white/70">
            See where each project stands, what&apos;s been delivered, what&apos;s next, and every payment — scheduled,
            due and paid.
          </p>
        </div>
      </section>

      <section className="flex flex-col px-6 py-10 sm:px-12">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="my-auto w-full max-w-sm self-center py-12">
          <h1 className="font-display text-[26px] font-medium text-fg">Sign in to your portal</h1>
          <p className="mt-2 text-[15px] text-muted">Use the email and password SSLC shared with you.</p>
          <LoginForm />
          <p className="mt-8 text-[14px] text-muted">
            Forgot your password?{" "}
            <a className="text-fg underline underline-offset-4" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
            </a>{" "}
            or email <a className="text-fg underline underline-offset-4" href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </div>
        <Link href="/" className="text-[13.5px] text-muted hover:text-fg">
          ← Back to sslctstartup.com
        </Link>
      </section>
    </main>
  );
}
