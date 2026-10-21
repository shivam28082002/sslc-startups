"use server";

import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/portal/auth";
import { db } from "@/lib/portal/db";
import {
  dateOrNull,
  isEmail,
  isUuid,
  oneOf,
  optionalText,
  rupeesToPaise,
  text,
  type FormState,
} from "@/lib/portal/validate";

const PROJECT_STATUSES = ["planning", "in_progress", "review", "completed", "on_hold"] as const;
const MILESTONE_STATUSES = ["pending", "in_progress", "done"] as const;
const PAYMENT_STATUSES = ["pending", "paid", "cancelled"] as const;

const tempPassword = () => randomBytes(9).toString("base64url");

function refresh(...paths: string[]) {
  for (const p of ["/portal", "/portal/admin", ...paths]) revalidatePath(p);
}

/* ── Clients ─────────────────────────────────────────────────── */

export async function createClient(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const name = text(fd, "name", 120);
  const email = text(fd, "email", 200).toLowerCase();
  const company = optionalText(fd, "company", 160);
  const phone = optionalText(fd, "phone", 40);
  if (!name) return { error: "Add the client's name." };
  if (!isEmail(email)) return { error: "Add a valid email address." };

  const password = tempPassword();
  const hash = await bcrypt.hash(password, 12);
  try {
    await db()`
      insert into users (email, name, company, phone, role, password_hash)
      values (${email}, ${name}, ${company}, ${phone}, 'client', ${hash})`;
  } catch {
    return { error: "A user with this email already exists." };
  }
  refresh();
  return { ok: `Client created. Share these login details: ${email} / ${password}` };
}

export async function resetClientPassword(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(fd, "id", 40);
  if (!isUuid(id)) return { error: "Unknown client." };
  const password = tempPassword();
  const hash = await bcrypt.hash(password, 12);
  const rows = await db()`
    update users set password_hash = ${hash}, session_version = session_version + 1
    where id = ${id} and role = 'client' returning email`;
  if (!rows[0]) return { error: "Unknown client." };
  return { ok: `New password for ${rows[0].email}: ${password} (their old sessions are signed out)` };
}

export async function updateClient(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(fd, "id", 40);
  const name = text(fd, "name", 120);
  if (!isUuid(id) || !name) return { error: "Add the client's name." };
  await db()`
    update users set name = ${name}, company = ${optionalText(fd, "company", 160)}, phone = ${optionalText(fd, "phone", 40)}
    where id = ${id} and role = 'client'`;
  refresh(`/portal/admin/clients/${id}`);
  return { ok: "Client details saved." };
}

export async function deleteClient(fd: FormData) {
  await requireAdmin();
  const id = text(fd, "id", 40);
  if (isUuid(id)) await db()`delete from users where id = ${id} and role = 'client'`;
  refresh();
  redirect("/portal/admin");
}

/* ── Projects ────────────────────────────────────────────────── */

export async function createProject(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const clientId = text(fd, "client_id", 40);
  const name = text(fd, "name", 160);
  if (!isUuid(clientId)) return { error: "Choose a client." };
  if (!name) return { error: "Add a project name." };
  const status = oneOf(text(fd, "status", 20), PROJECT_STATUSES) ?? "planning";
  const [row] = await db()`
    insert into projects (client_id, name, description, status, start_date, due_date)
    select ${clientId}::uuid, ${name}::text, ${optionalText(fd, "description", 2000)}::text, ${status}::text,
           ${dateOrNull(fd, "start_date")}::date, ${dateOrNull(fd, "due_date")}::date
    where exists (select 1 from users where id = ${clientId}::uuid and role = 'client')
    returning id`;
  if (!row) return { error: "Choose a client." };
  refresh();
  redirect(`/portal/admin/projects/${row.id}`);
}

export async function updateProject(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(fd, "id", 40);
  const name = text(fd, "name", 160);
  if (!isUuid(id) || !name) return { error: "Add a project name." };
  const status = oneOf(text(fd, "status", 20), PROJECT_STATUSES);
  if (!status) return { error: "Choose a status." };
  await db()`
    update projects set name = ${name}, description = ${optionalText(fd, "description", 2000)},
      status = ${status}, start_date = ${dateOrNull(fd, "start_date")}, due_date = ${dateOrNull(fd, "due_date")},
      updated_at = now()
    where id = ${id}`;
  refresh(`/portal/admin/projects/${id}`, `/portal/projects/${id}`);
  return { ok: "Project saved." };
}

export async function deleteProject(fd: FormData) {
  await requireAdmin();
  const id = text(fd, "id", 40);
  if (isUuid(id)) await db()`delete from projects where id = ${id}`;
  refresh();
  redirect("/portal/admin");
}

/* ── Milestones ──────────────────────────────────────────────── */

export async function addMilestone(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const projectId = text(fd, "project_id", 40);
  const title = text(fd, "title", 200);
  if (!isUuid(projectId) || !title) return { error: "Add a milestone title." };
  await db()`
    insert into milestones (project_id, title, due_date) values (${projectId}, ${title}, ${dateOrNull(fd, "due_date")})`;
  await db()`update projects set updated_at = now() where id = ${projectId}`;
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`);
  return { ok: "Milestone added." };
}

export async function setMilestoneStatus(fd: FormData) {
  await requireAdmin();
  const id = text(fd, "id", 40);
  const projectId = text(fd, "project_id", 40);
  const status = oneOf(text(fd, "status", 20), MILESTONE_STATUSES);
  if (!isUuid(id) || !status) return;
  await db()`
    update milestones set status = ${status},
      completed_at = case when ${status} = 'done' then coalesce(completed_at, (now() at time zone 'Asia/Kolkata')::date) else null end
    where id = ${id}`;
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`);
}

export async function deleteMilestone(fd: FormData) {
  await requireAdmin();
  const id = text(fd, "id", 40);
  const projectId = text(fd, "project_id", 40);
  if (isUuid(id)) await db()`delete from milestones where id = ${id}`;
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`);
}

/* ── Payments ────────────────────────────────────────────────── */

export async function addPayment(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const projectId = text(fd, "project_id", 40);
  const label = text(fd, "label", 160);
  const amount = rupeesToPaise(fd, "amount");
  if (!isUuid(projectId) || !label) return { error: "Add a payment label, e.g. “Advance — 30%”." };
  if (!amount) return { error: "Enter the amount in rupees, e.g. 45000." };
  await db()`
    insert into payments (project_id, label, amount_paise, due_date)
    values (${projectId}, ${label}, ${amount}, ${dateOrNull(fd, "due_date")})`;
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`);
  return { ok: "Payment scheduled." };
}

export async function recordPayment(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(fd, "id", 40);
  const projectId = text(fd, "project_id", 40);
  const status = oneOf(text(fd, "status", 20), PAYMENT_STATUSES);
  if (!isUuid(id) || !status) return { error: "Unknown payment." };
  const paidAt = status === "paid" ? (dateOrNull(fd, "paid_at") ?? new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date())) : null;
  await db()`
    update payments set status = ${status}, paid_at = ${paidAt},
      method = ${status === "paid" ? optionalText(fd, "method", 60) : null},
      reference = ${status === "paid" ? optionalText(fd, "reference", 120) : null}
    where id = ${id}`;
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`);
  return { ok: status === "paid" ? "Marked as paid." : "Payment updated." };
}

export async function deletePayment(fd: FormData) {
  await requireAdmin();
  const id = text(fd, "id", 40);
  const projectId = text(fd, "project_id", 40);
  if (isUuid(id)) await db()`delete from payments where id = ${id}`;
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`);
}
