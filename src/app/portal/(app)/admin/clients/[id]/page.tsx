import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/portal/auth";
import { isUuid } from "@/lib/portal/validate";
import { day } from "@/lib/portal/format";
import { clientById, projectsForClient } from "@/lib/portal/queries";
import { ConfirmButton } from "@/components/portal/form";
import { Empty, PageTitle, Panel, ProjectBadge } from "@/components/portal/ui";
import { deleteClient } from "../../actions";
import { EditClientForm, ResetPasswordForm } from "../../forms";

export const metadata: Metadata = { title: "Client" };

export default async function AdminClientPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const client = await clientById(id);
  if (!client) notFound();
  const projects = await projectsForClient(id);

  return (
    <div className="grid min-w-0 gap-8 [&>*]:min-w-0">
      <div>
        <Link href="/portal/admin" className="text-[14px] text-muted hover:text-fg">
          ← Clients & projects
        </Link>
        <div className="mt-4">
          <PageTitle
            title={client.name}
            sub={`${client.email}${client.company ? ` · ${client.company}` : ""} · ${client.last_login_at ? `last signed in ${day(client.last_login_at.slice(0, 10))}` : "hasn't signed in yet"}`}
          />
        </div>
      </div>

      <Panel title="Details">
        <div className="p-5">
          <EditClientForm client={client} />
        </div>
      </Panel>

      <Panel title="Projects">
        {projects.length ? (
          <ul className="divide-y divide-line">
            {projects.map((p) => (
              <li key={p.id}>
                <Link href={`/portal/admin/projects/${p.id}`} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-surface-2">
                  <span className="text-[15px] font-medium text-fg">{p.name}</span>
                  <ProjectBadge status={p.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No projects for this client yet.</Empty>
        )}
      </Panel>

      <Panel title="Login">
        <div className="grid gap-4 p-5">
          <p className="text-[14px] text-muted">
            Clients sign in at <span className="font-medium text-fg">sslctstartup.com/portal/login</span> with their email. Generating a new
            password signs them out everywhere.
          </p>
          <ResetPasswordForm id={client.id} />
        </div>
      </Panel>

      <div className="flex justify-end">
        <ConfirmButton
          action={deleteClient}
          fields={{ id: client.id }}
          label="Delete client and all their projects"
          confirm={`Delete ${client.name} and all their projects, milestones and payments? This can't be undone.`}
          className="text-[#b42318] hover:text-[#b42318]"
        />
      </div>
    </div>
  );
}
