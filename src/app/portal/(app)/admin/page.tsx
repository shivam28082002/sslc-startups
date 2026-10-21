import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/portal/auth";
import { day, money, paymentState } from "@/lib/portal/format";
import { allClients, allOpenPayments, allProjectsWithClient } from "@/lib/portal/queries";
import { Empty, PageTitle, Panel, PaymentBadge, ProjectBadge } from "@/components/portal/ui";
import { CreateClientForm, CreateProjectForm } from "./forms";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminHome() {
  await requireAdmin();
  const [clients, projects, open] = await Promise.all([allClients(), allProjectsWithClient(), allOpenPayments()]);
  const outstanding = open.reduce((s, p) => s + Number(p.amount_paise), 0);
  const overdue = open.filter((p) => paymentState(p) === "overdue");

  return (
    <div className="grid min-w-0 gap-8 [&>*]:min-w-0">
      <PageTitle
        title="Clients & projects"
        sub={`${clients.length} clients · ${projects.length} projects · ${money(outstanding)} outstanding${overdue.length ? ` · ${overdue.length} overdue` : ""}`}
      />

      <Panel title="Payments to collect">
        {open.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead className="text-[12.5px] text-subtle">
                <tr className="border-b border-line">
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Project · payment</th>
                  <th className="px-5 py-3 font-medium">Due</th>
                  <th className="px-5 py-3 text-right font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {open.slice(0, 12).map((p) => (
                  <tr key={p.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium text-fg">{p.client_name}</td>
                    <td className="px-5 py-3 text-muted">
                      <Link href={`/portal/admin/projects/${p.project_id}`} className="hover:text-fg hover:underline">
                        {p.project_name}
                      </Link>{" "}
                      · {p.label}
                    </td>
                    <td className="px-5 py-3 text-muted">{day(p.due_date)}</td>
                    <td className="px-5 py-3 text-right font-medium text-fg tabular-nums">{money(p.amount_paise)}</td>
                    <td className="px-5 py-3">
                      <PaymentBadge state={paymentState(p)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>Nothing to collect. Scheduled payments appear here until they&apos;re marked paid.</Empty>
        )}
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <Panel title="New client">
          <div className="p-5">
            <CreateClientForm />
          </div>
        </Panel>
        <Panel title="New project">
          <div className="p-5">
            <CreateProjectForm clients={clients.map((c) => ({ id: c.id, label: c.company ? `${c.name} — ${c.company}` : c.name }))} />
          </div>
        </Panel>
      </div>

      <Panel title="Projects">
        {projects.length ? (
          <ul className="divide-y divide-line">
            {projects.map((p) => (
              <li key={p.id}>
                <Link href={`/portal/admin/projects/${p.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 hover:bg-surface-2">
                  <span>
                    <span className="block text-[15px] font-medium text-fg">{p.name}</span>
                    <span className="block text-[13px] text-muted">
                      {p.client_name}
                      {p.client_company ? ` — ${p.client_company}` : ""} · target {day(p.due_date)}
                    </span>
                  </span>
                  <ProjectBadge status={p.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No projects yet. Create a client, then a project for them.</Empty>
        )}
      </Panel>

      <Panel title="Clients">
        {clients.length ? (
          <ul className="divide-y divide-line">
            {clients.map((c) => (
              <li key={c.id}>
                <Link href={`/portal/admin/clients/${c.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 hover:bg-surface-2">
                  <span>
                    <span className="block text-[15px] font-medium text-fg">
                      {c.name}
                      {c.company ? <span className="font-normal text-muted"> — {c.company}</span> : null}
                    </span>
                    <span className="block text-[13px] text-muted">{c.email}</span>
                  </span>
                  <span className="text-[13px] text-muted">
                    {c.project_count} {c.project_count === 1 ? "project" : "projects"} ·{" "}
                    {c.last_login_at ? `last seen ${day(c.last_login_at.slice(0, 10))}` : "hasn't signed in yet"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No clients yet. Add your first client above.</Empty>
        )}
      </Panel>
    </div>
  );
}
