import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/portal/auth";
import { isUuid } from "@/lib/portal/validate";
import { money } from "@/lib/portal/format";
import { milestonesForProjects, paymentsForProjects, projectById } from "@/lib/portal/queries";
import { MilestoneTimeline, PaymentsTable, ProgressBar, ProjectDates, paymentTotals } from "@/components/portal/blocks";
import { PageTitle, Panel, ProjectBadge } from "@/components/portal/ui";

export const metadata: Metadata = { title: "Project" };

export default async function ClientProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const project = await projectById(id);
  // Clients may only see their own projects; admins can preview any.
  if (!project || (user.role !== "admin" && project.client_id !== user.id)) notFound();

  const [milestones, payments] = await Promise.all([milestonesForProjects([id]), paymentsForProjects([id])]);
  const totals = paymentTotals(payments);

  return (
    <div className="grid min-w-0 gap-8 [&>*]:min-w-0">
      <div>
        <Link href={user.role === "admin" ? `/portal/admin/projects/${id}` : "/portal"} className="text-[14px] text-muted hover:text-fg">
          ← {user.role === "admin" ? "Back to editing" : "All projects"}
        </Link>
        <div className="mt-4">
          <PageTitle title={project.name} actions={<ProjectBadge status={project.status} />} />
        </div>
        {project.description ? <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">{project.description}</p> : null}
      </div>

      <Panel>
        <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
          <ProjectDates project={project} />
          <ProgressBar milestones={milestones} />
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Panel title="Milestones">
          <div className="p-6">
            <MilestoneTimeline milestones={milestones} />
          </div>
        </Panel>
        <Panel
          title="Payments"
          action={
            <span className="text-[13px] text-muted tabular-nums">
              {money(totals.paid)} of {money(totals.total)} paid
            </span>
          }
        >
          <PaymentsTable payments={payments} />
        </Panel>
      </div>
    </div>
  );
}
