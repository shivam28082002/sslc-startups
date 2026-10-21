"use client";

import { ActionForm, Field, Submit, inputClass } from "@/components/portal/form";
import { projectStatusLabel } from "@/lib/portal/format";
import {
  addMilestone,
  addPayment,
  createClient,
  createProject,
  recordPayment,
  resetClientPassword,
  updateClient,
  updateProject,
} from "./actions";

const statuses = Object.entries(projectStatusLabel);

export function CreateClientForm() {
  return (
    <ActionForm action={createClient} resetOnSuccess className="grid gap-3 sm:grid-cols-2">
      <Field label="Name" htmlFor="c-name">
        <input id="c-name" name="name" className={inputClass} placeholder="Asha Mehta" />
      </Field>
      <Field label="Email" htmlFor="c-email">
        <input id="c-email" name="email" type="email" className={inputClass} placeholder="asha@company.com" />
      </Field>
      <Field label="Company" htmlFor="c-company">
        <input id="c-company" name="company" className={inputClass} />
      </Field>
      <Field label="Phone / WhatsApp" htmlFor="c-phone">
        <input id="c-phone" name="phone" className={inputClass} />
      </Field>
      <div className="sm:col-span-2">
        <Submit>Create client</Submit>
        <p className="mt-2 text-[12.5px] text-subtle">A temporary password is generated and shown once — share it with the client.</p>
      </div>
    </ActionForm>
  );
}

export function CreateProjectForm({ clients }: { clients: { id: string; label: string }[] }) {
  return (
    <ActionForm action={createProject} className="grid gap-3 sm:grid-cols-2">
      <Field label="Client" htmlFor="p-client" className="sm:col-span-2">
        <select id="p-client" name="client_id" className={inputClass} defaultValue="">
          <option value="" disabled>
            {clients.length ? "Choose a client" : "Create a client first"}
          </option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Project name" htmlFor="p-name" className="sm:col-span-2">
        <input id="p-name" name="name" className={inputClass} placeholder="Customer portal & mobile app" />
      </Field>
      <Field label="Start date" htmlFor="p-start">
        <input id="p-start" name="start_date" type="date" className={inputClass} />
      </Field>
      <Field label="Target delivery" htmlFor="p-due">
        <input id="p-due" name="due_date" type="date" className={inputClass} />
      </Field>
      <div className="sm:col-span-2">
        <Submit>Create project</Submit>
      </div>
    </ActionForm>
  );
}

export function EditClientForm({ client }: { client: { id: string; name: string; company: string | null; phone: string | null } }) {
  return (
    <ActionForm action={updateClient} className="grid gap-3 sm:grid-cols-3">
      <input type="hidden" name="id" value={client.id} />
      <Field label="Name" htmlFor="e-name">
        <input id="e-name" name="name" defaultValue={client.name} className={inputClass} />
      </Field>
      <Field label="Company" htmlFor="e-company">
        <input id="e-company" name="company" defaultValue={client.company ?? ""} className={inputClass} />
      </Field>
      <Field label="Phone / WhatsApp" htmlFor="e-phone">
        <input id="e-phone" name="phone" defaultValue={client.phone ?? ""} className={inputClass} />
      </Field>
      <div className="sm:col-span-3">
        <Submit variant="secondary">Save details</Submit>
      </div>
    </ActionForm>
  );
}

export function ResetPasswordForm({ id }: { id: string }) {
  return (
    <ActionForm action={resetClientPassword}>
      <input type="hidden" name="id" value={id} />
      <Submit variant="secondary">Generate new password</Submit>
    </ActionForm>
  );
}

export function EditProjectForm({
  project,
}: {
  project: { id: string; name: string; description: string | null; status: string; start_date: string | null; due_date: string | null };
}) {
  return (
    <ActionForm action={updateProject} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="id" value={project.id} />
      <Field label="Project name" htmlFor="ep-name" className="sm:col-span-2">
        <input id="ep-name" name="name" defaultValue={project.name} className={inputClass} />
      </Field>
      <Field label="Description (visible to the client)" htmlFor="ep-desc" className="sm:col-span-2">
        <textarea id="ep-desc" name="description" rows={3} defaultValue={project.description ?? ""} className={`${inputClass} h-auto py-2`} />
      </Field>
      <Field label="Status" htmlFor="ep-status">
        <select id="ep-status" name="status" defaultValue={project.status} className={inputClass}>
          {statuses.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start" htmlFor="ep-start">
          <input id="ep-start" name="start_date" type="date" defaultValue={project.start_date ?? ""} className={inputClass} />
        </Field>
        <Field label="Target" htmlFor="ep-due">
          <input id="ep-due" name="due_date" type="date" defaultValue={project.due_date ?? ""} className={inputClass} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Submit>Save project</Submit>
      </div>
    </ActionForm>
  );
}

export function AddMilestoneForm({ projectId }: { projectId: string }) {
  return (
    <ActionForm action={addMilestone} resetOnSuccess className="grid gap-3 sm:grid-cols-[1fr_170px_auto] sm:items-end">
      <input type="hidden" name="project_id" value={projectId} />
      <Field label="Milestone" htmlFor="m-title">
        <input id="m-title" name="title" className={inputClass} placeholder="UI design approved" />
      </Field>
      <Field label="Target date" htmlFor="m-due">
        <input id="m-due" name="due_date" type="date" className={inputClass} />
      </Field>
      <Submit>Add</Submit>
    </ActionForm>
  );
}

export function AddPaymentForm({ projectId }: { projectId: string }) {
  return (
    <ActionForm action={addPayment} resetOnSuccess className="grid gap-3 sm:grid-cols-[1fr_140px_170px_auto] sm:items-end">
      <input type="hidden" name="project_id" value={projectId} />
      <Field label="Payment" htmlFor="pay-label">
        <input id="pay-label" name="label" className={inputClass} placeholder="Advance (30%)" />
      </Field>
      <Field label="Amount (₹)" htmlFor="pay-amount">
        <input id="pay-amount" name="amount" inputMode="decimal" className={inputClass} placeholder="45000" />
      </Field>
      <Field label="Due date" htmlFor="pay-due">
        <input id="pay-due" name="due_date" type="date" className={inputClass} />
      </Field>
      <Submit>Schedule</Submit>
    </ActionForm>
  );
}

export function RecordPaymentForm({ id, projectId, status }: { id: string; projectId: string; status: string }) {
  if (status === "paid") {
    return (
      <ActionForm action={recordPayment}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="project_id" value={projectId} />
        <input type="hidden" name="status" value="pending" />
        <Submit variant="secondary" className="h-8 px-3 text-[12.5px]">
          Undo paid
        </Submit>
      </ActionForm>
    );
  }
  return (
    <ActionForm action={recordPayment} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="project_id" value={projectId} />
      <input type="hidden" name="status" value="paid" />
      <label className="sr-only" htmlFor={`pm-${id}`}>
        Method
      </label>
      <select id={`pm-${id}`} name="method" className={`${inputClass} !h-8 !w-[124px] py-0 text-[13px]`} defaultValue="UPI">
        <option>UPI</option>
        <option>Bank transfer</option>
        <option>Card</option>
        <option>Cash</option>
        <option>Other</option>
      </select>
      <label className="sr-only" htmlFor={`pr-${id}`}>
        Reference
      </label>
      <input id={`pr-${id}`} name="reference" placeholder="Ref / UTR" className={`${inputClass} !h-8 !w-[120px] text-[13px]`} />
      <Submit className="h-8 shrink-0 px-3 text-[12.5px]">Mark paid</Submit>
    </ActionForm>
  );
}
