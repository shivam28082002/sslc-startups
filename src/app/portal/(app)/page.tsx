import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { company } from "@/content/site";
import { requireUser } from "@/lib/portal/auth";
import { day, daysBetween, money, paymentState, todayIST } from "@/lib/portal/format";
import { milestonesForProjects, paymentsForProjects, projectsForClient } from "@/lib/portal/queries";
import { MilestoneTimeline, PaymentsTable, ProgressBar, ProjectDates, paymentTotals } from "@/components/portal/blocks";
import { PageTitle, Panel, ProjectBadge } from "@/components/portal/ui";

export const metadata: Metadata = { title: "Overview" };

export default async function ClientOverview() {
  const user = await requireUser();
  if (user.role === "admin") redirect("/portal/admin");

  const projects = await projectsForClient(user.id);
  const ids = projects.map((p) => p.id);
  const [milestones, payments] = await Promise.all([milestonesForProjects(ids), paymentsForProjects(ids)]);
  const totals = paymentTotals(payments);
  const today = todayIST();
  const next = payments.find((p) => {
    const s = paymentState(p, today);
    return s === "overdue" || s === "due" || s === "upcoming";
  });
  const nextState = next ? paymentState(next, today) : null;
  const firstName = user.name.split(" ")[0];

  return (
    <div className="grid min-w-0 gap-8 [&>*]:min-w-0">
      <PageTitle title={`Hi ${firstName}`} sub={user.company ? `${user.company} · your projects with SSLC` : "Your projects with SSLC"} />

      {projects.length === 0 ? (
        <Panel>
          <div className="px-6 py-12 text-center">
            <p className="text-[16px] font-medium text-fg">Your project will appear here once it&apos;s set up.</p>
            <p className="mt-2 text-[14.5px] text-muted">
              Questions in the meantime? Message us on{" "}
              <a className="text-fg underline underline-offset-4" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              .
            </p>
          </div>
        </Panel>
      ) : (
        <>
          {/* What's next on payments — the single most useful thing on this screen */}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <Panel className={nextState === "overdue" ? "border-[#b42318]/40" : undefined}>
              <div className="p-6">
                <p className="text-[14px] text-muted">Next payment</p>
                {next ? (
                  <>
                    <p className="mt-2 font-display text-[clamp(1.9rem,1.5rem+1.4vw,2.6rem)] leading-none font-medium text-fg tabular-nums">
                      {money(next.amount_paise)}
                    </p>
                    <p className="mt-3 text-[15px] text-fg">
                      {next.label} <span className="text-muted">· {next.project_name}</span>
                    </p>
                    <p className={`mt-1 text-[14px] ${nextState === "overdue" ? "font-medium text-[#b42318]" : nextState === "due" ? "font-medium text-[#9a5b00]" : "text-muted"}`}>
                      {next.due_date
                        ? (() => {
                            const d = daysBetween(today, next.due_date);
                            return d < 0 ? `Overdue by ${-d} days (was due ${day(next.due_date)})` : d === 0 ? "Due today" : `Due ${day(next.due_date)} — in ${d} days`;
                          })()
                        : "Due date to be confirmed"}
                    </p>
                    <p className="mt-5 border-t border-line pt-4 text-[13.5px] text-muted">
                      Online payment is coming soon. To pay now, contact us on{" "}
                      <a className="text-fg underline underline-offset-4" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>{" "}
                      for bank or UPI details.
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-[16px] font-medium text-[#0b7a4b]">You&apos;re all paid up. Nothing is due right now.</p>
                )}
              </div>
            </Panel>

            <Panel>
              <dl className="grid h-full grid-cols-1 divide-y divide-line">
                <div className="flex items-baseline justify-between px-6 py-4">
                  <dt className="text-[14px] text-muted">Total agreed</dt>
                  <dd className="text-[16px] font-medium text-fg tabular-nums">{money(totals.total)}</dd>
                </div>
                <div className="flex items-baseline justify-between px-6 py-4">
                  <dt className="text-[14px] text-muted">Paid so far</dt>
                  <dd className="text-[16px] font-medium text-[#0b7a4b] tabular-nums">{money(totals.paid)}</dd>
                </div>
                <div className="flex items-baseline justify-between px-6 py-4">
                  <dt className="text-[14px] text-muted">Remaining</dt>
                  <dd className="text-[16px] font-medium text-fg tabular-nums">{money(totals.outstanding)}</dd>
                </div>
                {totals.overdue > 0 ? (
                  <div className="flex items-baseline justify-between px-6 py-4">
                    <dt className="text-[14px] text-[#b42318]">Overdue</dt>
                    <dd className="text-[16px] font-medium text-[#b42318] tabular-nums">{money(totals.overdue)}</dd>
                  </div>
                ) : null}
              </dl>
            </Panel>
          </div>

          {projects.map((project) => {
            const ms = milestones.filter((m) => m.project_id === project.id);
            return (
              <Panel key={project.id}>
                <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-[20px] font-medium text-fg">{project.name}</h2>
                      <ProjectBadge status={project.status} />
                    </div>
                    {project.description ? <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-muted">{project.description}</p> : null}
                    <div className="mt-6">
                      <ProjectDates project={project} />
                    </div>
                    <div className="mt-6">
                      <ProgressBar milestones={ms} />
                    </div>
                    <Link href={`/portal/projects/${project.id}`} className="mt-6 inline-flex text-[14px] font-medium text-fg underline underline-offset-4">
                      View project details
                    </Link>
                  </div>
                  <div>
                    <h3 className="mb-4 text-[14px] font-semibold text-fg">Milestones</h3>
                    <MilestoneTimeline milestones={ms} />
                  </div>
                </div>
              </Panel>
            );
          })}

          <Panel title="All payments">
            <PaymentsTable payments={payments} showProject={projects.length > 1} />
          </Panel>
        </>
      )}
    </div>
  );
}
