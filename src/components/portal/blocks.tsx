import Link from "next/link";
import type { Milestone, Payment, Project } from "@/lib/portal/queries";
import { day, daysBetween, milestoneStatusLabel, money, paymentState, todayIST } from "@/lib/portal/format";
import { MilestoneDot, PaymentBadge } from "./ui";

export function progressOf(milestones: Milestone[]) {
  if (!milestones.length) return null;
  const done = milestones.filter((m) => m.status === "done").length;
  return { done, total: milestones.length, pct: Math.round((done / milestones.length) * 100) };
}

/** Vertical milestone timeline — a real sequence, so it is drawn as one. */
export function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  if (!milestones.length) return <p className="text-[14px] text-muted">Milestones will appear here once the plan is agreed.</p>;
  return (
    <ol className="relative">
      <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong" />
      {milestones.map((m) => (
        <li key={m.id} className="relative flex gap-4 pb-5 last:pb-0">
          <span className="mt-0.5">
            <MilestoneDot status={m.status} />
          </span>
          <div className="min-w-0 flex-1">
            <p className={`text-[15px] font-medium ${m.status === "done" ? "text-fg/70" : "text-fg"}`}>{m.title}</p>
            <p className="mt-0.5 text-[13px] text-subtle">
              {milestoneStatusLabel[m.status]}
              {m.status === "done" && m.completed_at ? ` on ${day(m.completed_at)}` : m.due_date ? ` · target ${day(m.due_date)}` : ""}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProgressBar({ milestones }: { milestones: Milestone[] }) {
  const p = progressOf(milestones);
  if (!p) return null;
  return (
    <div>
      <div className="flex justify-between text-[13px] text-muted">
        <span>
          {p.done} of {p.total} milestones done
        </span>
        <span className="font-medium text-fg tabular-nums">{p.pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={p.pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-gradient-to-r from-[#3d6bff] to-[#7032e6]" style={{ width: `${p.pct}%` }} />
      </div>
    </div>
  );
}

export function ProjectDates({ project }: { project: Project }) {
  const today = todayIST();
  const left = project.due_date ? daysBetween(today, project.due_date) : null;
  return (
    <dl className="grid grid-cols-2 gap-4 text-[14px] sm:grid-cols-3">
      <div>
        <dt className="text-subtle">Started</dt>
        <dd className="mt-0.5 font-medium text-fg">{day(project.start_date)}</dd>
      </div>
      <div>
        <dt className="text-subtle">Target delivery</dt>
        <dd className="mt-0.5 font-medium text-fg">{day(project.due_date)}</dd>
      </div>
      {left !== null && project.status !== "completed" ? (
        <div>
          <dt className="text-subtle">Time left</dt>
          <dd className={`mt-0.5 font-medium ${left < 0 ? "text-[#b42318]" : "text-fg"}`}>
            {left < 0 ? `${-left} days past target` : left === 0 ? "Due today" : `${left} days`}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

export function PaymentsTable({ payments, showProject = false }: { payments: Payment[]; showProject?: boolean }) {
  if (!payments.length) return <p className="px-5 py-8 text-center text-[14.5px] text-muted">No payments scheduled yet.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-[14px]">
        <thead className="text-[12.5px] text-subtle">
          <tr className="border-b border-line">
            <th className="px-5 py-3 font-medium">Payment</th>
            {showProject ? <th className="px-5 py-3 font-medium">Project</th> : null}
            <th className="px-5 py-3 font-medium">Due date</th>
            <th className="px-5 py-3 text-right font-medium">Amount</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => {
            const state = paymentState(p);
            return (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-5 py-3.5 font-medium text-fg">{p.label}</td>
                {showProject ? (
                  <td className="px-5 py-3.5 text-muted">
                    <Link href={`/portal/projects/${p.project_id}`} className="hover:text-fg hover:underline">
                      {p.project_name}
                    </Link>
                  </td>
                ) : null}
                <td className="px-5 py-3.5 text-muted">{state === "paid" ? `Paid ${day(p.paid_at)}` : day(p.due_date)}</td>
                <td className="px-5 py-3.5 text-right font-medium text-fg tabular-nums">{money(p.amount_paise)}</td>
                <td className="px-5 py-3.5">
                  <PaymentBadge state={state} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function paymentTotals(payments: Payment[]) {
  let paid = 0;
  let outstanding = 0;
  let overdue = 0;
  for (const p of payments) {
    const amt = Number(p.amount_paise);
    const s = paymentState(p);
    if (s === "paid") paid += amt;
    else if (s !== "cancelled") {
      outstanding += amt;
      if (s === "overdue") overdue += amt;
    }
  }
  return { paid, outstanding, overdue, total: paid + outstanding };
}
