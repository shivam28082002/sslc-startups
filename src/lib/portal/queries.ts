import "server-only";
import { db } from "./db";

export type Project = {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  due_date: string | null;
};
export type Milestone = {
  id: string;
  project_id: string;
  title: string;
  due_date: string | null;
  status: string;
  completed_at: string | null;
};
export type Payment = {
  id: string;
  project_id: string;
  project_name?: string;
  label: string;
  amount_paise: string;
  due_date: string | null;
  status: string;
  paid_at: string | null;
  method: string | null;
  reference: string | null;
};
export type Client = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  phone: string | null;
  created_at: string;
  last_login_at: string | null;
  project_count?: number;
};

// Dates are selected as text (YYYY-MM-DD) to avoid timezone conversion.
const P = `p.id, p.client_id, p.name, p.description, p.status,
  p.start_date::text as start_date, p.due_date::text as due_date`;
const M = `m.id, m.project_id, m.title, m.due_date::text as due_date, m.status, m.completed_at::text as completed_at`;
const PAY = `pay.id, pay.project_id, pay.label, pay.amount_paise::text as amount_paise,
  pay.due_date::text as due_date, pay.status, pay.paid_at::text as paid_at, pay.method, pay.reference`;

export async function projectsForClient(clientId: string) {
  return (await db().query(`select ${P} from projects p where p.client_id = $1 order by p.created_at desc`, [
    clientId,
  ])) as Project[];
}

export async function projectById(id: string) {
  const rows = (await db().query(`select ${P} from projects p where p.id = $1`, [id])) as Project[];
  return rows[0] ?? null;
}

export async function milestonesForProjects(projectIds: string[]) {
  if (!projectIds.length) return [] as Milestone[];
  return (await db().query(
    `select ${M} from milestones m where m.project_id = any($1::uuid[])
     order by m.due_date nulls last, m.created_at`,
    [projectIds],
  )) as Milestone[];
}

export async function paymentsForProjects(projectIds: string[]) {
  if (!projectIds.length) return [] as Payment[];
  return (await db().query(
    `select ${PAY}, p.name as project_name from payments pay join projects p on p.id = pay.project_id
     where pay.project_id = any($1::uuid[]) order by pay.due_date nulls last, pay.created_at`,
    [projectIds],
  )) as Payment[];
}

export async function allClients() {
  return (await db().query(
    `select u.id, u.email, u.name, u.company, u.phone, u.created_at::text as created_at,
            u.last_login_at::text as last_login_at, count(p.id)::int as project_count
     from users u left join projects p on p.client_id = u.id
     where u.role = 'client' group by u.id order by u.created_at desc`,
  )) as Client[];
}

export async function clientById(id: string) {
  const rows = (await db().query(
    `select id, email, name, company, phone, created_at::text as created_at, last_login_at::text as last_login_at
     from users where id = $1 and role = 'client'`,
    [id],
  )) as Client[];
  return rows[0] ?? null;
}

export async function allProjectsWithClient() {
  return (await db().query(
    `select ${P}, u.name as client_name, u.company as client_company
     from projects p join users u on u.id = p.client_id order by p.updated_at desc`,
  )) as (Project & { client_name: string; client_company: string | null })[];
}

export async function allOpenPayments() {
  return (await db().query(
    `select ${PAY}, p.name as project_name, u.name as client_name
     from payments pay join projects p on p.id = pay.project_id join users u on u.id = p.client_id
     where pay.status = 'pending' order by pay.due_date nulls last`,
  )) as (Payment & { client_name: string })[];
}
