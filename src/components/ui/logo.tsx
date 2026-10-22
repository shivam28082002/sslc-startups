import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/brand/sslc-mark.png"
        alt="SSLC Startup"
        width={32}
        height={32}
        priority
        className="size-8 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6"
      />
      <span aria-hidden className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.04em] text-fg">SSLC</span>
        <span className="mt-1 font-mono text-[9.5px] tracking-[0.42em] text-brand">STARTUP</span>
      </span>
      <span className="sr-only">— home</span>
    </Link>
  );
}
