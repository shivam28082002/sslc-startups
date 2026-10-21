import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/portal/auth";
import { isUuid } from "@/lib/portal/validate";
import { day, milestoneStatusLabel, money, paymentState } from "@/lib/portal/format";
import { clientById, milestonesForProjects, paymentsForProjects, projectById } from "@/lib/portal/queries";
import { paymentTotals } from "@/components/portal/blocks";
import { ConfirmButton } from "@/components/portal/form";
import { Empty, MilestoneDot, PageTitle, Panel, PaymentBadge } from "@/components/portal/ui";
import { deleteMilestone, deletePayment, deleteProject, setMilestoneStatus } from "../../actions";
import { AddMilestoneForm, AddPaymentForm, EditProjectForm, RecordPaymentForm } from "../../forms";

export const metadata: Metadata = { title: "Edit project" };

const nextStatus: Record<string, string> = { pending: "in_progress", in_progress: "done", done: "pending" };
const nextLabel: Record<string, string> = { pending: "Start", in_progress: "Mark done", done: "Reopen" };

export default async function AdminProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const project = await projectById(id);
  if (!project) notFound();
  const [client, milestones, payments] = await Promise.all([clientById(project.client_id), milestonesForProjects([id]), paymentsForProjects([id])]);
  const totals = paymentTotals(payments);

  return (
    <div className="grid min-w-0 gap-8 [&>*]:min-w-0">
      <div>
        <Link href="/portal/admin" className="text-[14px] text-muted hover:text-fg">
          ← Clients & projects
        </Link>
        <div className="mt-4">
          <PageTitle
            title={project.name}
            sub={
              client ? (
                <>
                  For{" "}
                  <Link href={`/portal/admin/clients/${client.id}`} className="text-fg underline underline-offset-4">
                    {client.name}
                    {client.company ? ` — ${client.company}` : ""}
                  </Link>
                </>
              ) : undefined
            }
            actions={
              <Link href={`/portal/projects/${id}`} className="inline-flex h-10 items-center rounded-md border border-line-strong bg-bg px-4 text-[14px] font-semibold text-fg hover:bg-surface-2">
                Preview as client
              </Link>
            }
          />
        </div>
      </div>

      <Panel title="Project">
        <div className="p-5">
          <EditProjectForm project={project} />
        </div>
      </Panel>

      <Panel title="Milestones">
        {milestones.length ? (
          <ul className="divide-y divide-line">
            {milestones.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center gap-4 px-5 py-3">
                <MilestoneDot status={m.status} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-fg">{m.title}</span>
                  <span className="block text-[13px] text-muted">
                    {milestoneStatusLabel[m.status]}
                    {m.due_date ? ` · target ${day(m.due_date)}` : ""}
                    {m.completed_at ? ` · done ${day(m.completed_at)}` : ""}
                  </span>
                </span>
                <form action={setMilestoneStatus}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="project_id" value={id} />
                  <input type="hidden" name="status" value={nextStatus[m.status]} />
                  <button type="submit" className="h-8 rounded-md border border-line-strong px-3 text-[12.5px] font-semibold text-fg hover:bg-surface-2">
                    {nextLabel[m.status]}
                  </button>
                </form>
                <ConfirmButton action={deleteMilestone} fields={{ id: m.id, project_id: id }} label="Delete" confirm={`Delete milestone “${m.title}”?`} />
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No milestones yet — add the plan below so the client can follow progress.</Empty>
        )}
        <div className="border-t border-line p-5">
          <AddMilestoneForm projectId={id} />
        </div>
      </Panel>

      <Panel
        title="Payments"
        action={
          <span className="text-[13px] text-muted tabular-nums">
            {money(totals.paid)} paid · {money(totals.outstanding)} remaining
          </span>
        }
      >
        {payments.length ? (
          <ul className="divide-y divide-line">
            {payments.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-3.5">
                <span className="min-w-0 basis-full sm:basis-auto sm:flex-1">
                  <span className="block text-[15px] font-medium text-fg">{p.label}</span>
                  <span className="block text-[13px] text-muted">
                    {p.status === "paid"
                      ? `Paid ${day(p.paid_at)}${p.method ? ` · ${p.method}` : ""}${p.reference ? ` · ${p.reference}` : ""}`
                      : `Due ${day(p.due_date)}`}
                  </span>
                </span>
                <span className="text-[15px] font-medium text-fg tabular-nums sm:w-28 sm:text-right">{money(p.amount_paise)}</span>
                <PaymentBadge state={paymentState(p)} />
                <RecordPaymentForm id={p.id} projectId={id} status={p.status} />
                <ConfirmButton action={deletePayment} fields={{ id: p.id, project_id: id }} label="Delete" confirm={`Delete payment “${p.label}”?`} />
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No payments scheduled yet.</Empty>
        )}
        <div className="border-t border-line p-5">
          <AddPaymentForm projectId={id} />
        </div>
      </Panel>

      <div className="flex justify-end">
        <ConfirmButton
          action={deleteProject}
          fields={{ id }}
          label="Delete this project"
          confirm={`Delete “${project.name}” with all its milestones and payments? This can't be undone.`}
          className="text-[#b42318] hover:text-[#b42318]"
        />
      </div>
    </div>
  );
}
