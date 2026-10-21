import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { milestoneStatusLabel, projectStatusLabel, type PaymentState } from "@/lib/portal/format";

/* Status colours carry meaning: green = paid/done, amber = due soon,
   red = overdue, violet = in progress, grey = not started/neutral. */

const paymentTone: Record<PaymentState, string> = {
  paid: "bg-[#e6f6ee] text-[#0b7a4b] ring-[#0b7a4b]/20",
  overdue: "bg-[#fdecea] text-[#b42318] ring-[#b42318]/20",
  due: "bg-[#fff4e0] text-[#9a5b00] ring-[#9a5b00]/20",
  upcoming: "bg-surface-2 text-fg/75 ring-line-strong",
  cancelled: "bg-surface-2 text-subtle ring-line line-through",
};
const paymentText: Record<PaymentState, string> = {
  paid: "Paid",
  overdue: "Overdue",
  due: "Due soon",
  upcoming: "Upcoming",
  cancelled: "Cancelled",
};

export function PaymentBadge({ state }: { state: PaymentState }) {
  return <Badge className={paymentTone[state]}>{paymentText[state]}</Badge>;
}

const projectTone: Record<string, string> = {
  planning: "bg-surface-2 text-fg/75 ring-line-strong",
  in_progress: "bg-[#efeaff] text-[#5b2fd6] ring-[#5b2fd6]/20",
  review: "bg-[#fff4e0] text-[#9a5b00] ring-[#9a5b00]/20",
  completed: "bg-[#e6f6ee] text-[#0b7a4b] ring-[#0b7a4b]/20",
  on_hold: "bg-[#fdecea] text-[#b42318] ring-[#b42318]/20",
};

export function ProjectBadge({ status }: { status: string }) {
  return <Badge className={projectTone[status] ?? projectTone.planning}>{projectStatusLabel[status] ?? status}</Badge>;
}

export function MilestoneDot({ status }: { status: string }) {
  return (
    <span
      title={milestoneStatusLabel[status]}
      className={cn(
        "relative z-10 grid size-4 shrink-0 place-items-center rounded-full border-2 bg-bg",
        status === "done" && "border-[#0b7a4b] bg-[#0b7a4b]",
        status === "in_progress" && "border-[#5b2fd6]",
        status === "pending" && "border-line-strong",
      )}
    >
      {status === "done" ? (
        <svg viewBox="0 0 12 12" className="size-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="m2.5 6.2 2.2 2.2 4.8-4.9" />
        </svg>
      ) : status === "in_progress" ? (
        <span className="size-1.5 rounded-full bg-[#5b2fd6]" />
      ) : null}
    </span>
  );
}

function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex h-6 items-center rounded-full px-2.5 text-[12.5px] font-medium whitespace-nowrap ring-1 ring-inset", className)}>
      {children}
    </span>
  );
}

export function PageTitle({ title, sub, actions }: { title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-tight font-medium tracking-[-0.02em] text-fg">{title}</h1>
        {sub ? <p className="mt-2 text-[15px] text-muted">{sub}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-lg border border-line bg-surface", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
          <h2 className="text-[15px] font-semibold text-fg">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="px-5 py-8 text-center text-[14.5px] text-muted">{children}</p>;
}
