"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSession, destroySession, requireUser, type Role } from "@/lib/portal/auth";
import { db } from "@/lib/portal/db";
import { isEmail, text, type FormState } from "@/lib/portal/validate";

const MAX_FAILURES = 8;
const WINDOW_MIN = 15;
// Compared against when the email doesn't exist, so timing doesn't reveal accounts.
const DUMMY_HASH = "$2b$12$r1.hy4PRwUr6Y6AJaLF0P.Tc3.slA7lPmW4BScWHyX8jBVIgCD/LC";

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email", 200).toLowerCase();
  const password = text(fd, "password", 200);
  if (!isEmail(email) || !password) return { error: "Enter your email and password." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${email}|${ip}`;
  const sql = db();

  const [attempt] = await sql`
    select failures, (window_start > now() - make_interval(mins => ${WINDOW_MIN})) as recent
    from login_attempts where key = ${key}`;
  if (attempt?.recent && attempt.failures >= MAX_FAILURES) {
    return { error: `Too many attempts. Try again in ${WINDOW_MIN} minutes or contact SSLC.` };
  }

  const [user] = await sql`select id, role, password_hash, session_version from users where email = ${email}`;
  const ok = await bcrypt.compare(password, user?.password_hash ?? DUMMY_HASH);

  if (!user || !ok) {
    await sql`
      insert into login_attempts (key, failures, window_start) values (${key}, 1, now())
      on conflict (key) do update set
        failures = case when login_attempts.window_start > now() - make_interval(mins => ${WINDOW_MIN})
                        then login_attempts.failures + 1 else 1 end,
        window_start = case when login_attempts.window_start > now() - make_interval(mins => ${WINDOW_MIN})
                            then login_attempts.window_start else now() end`;
    return { error: "That email and password don't match. Check them and try again." };
  }

  await sql`delete from login_attempts where key = ${key}`;
  await sql`update users set last_login_at = now() where id = ${user.id}`;
  await createSession(user as { id: string; role: Role; session_version: number });
  redirect(user.role === "admin" ? "/portal/admin" : "/portal");
}

export async function logout() {
  await destroySession();
  redirect("/portal/login");
}

export async function changePassword(_: FormState, fd: FormData): Promise<FormState> {
  const user = await requireUser();
  const current = text(fd, "current", 200);
  const next = text(fd, "next", 200);
  const confirm = text(fd, "confirm", 200);
  if (next.length < 10) return { error: "Use at least 10 characters for the new password." };
  if (next !== confirm) return { error: "The new passwords don't match." };

  const sql = db();
  const [row] = await sql`select password_hash, role from users where id = ${user.id}`;
  if (!row || !(await bcrypt.compare(current, row.password_hash))) {
    return { error: "Your current password is incorrect." };
  }
  const hash = await bcrypt.hash(next, 12);
  const [updated] = await sql`
    update users set password_hash = ${hash}, session_version = session_version + 1
    where id = ${user.id} returning id, role, session_version`;
  // Re-issue this device's session; all other devices are signed out.
  await createSession(updated as { id: string; role: Role; session_version: number });
  return { ok: "Password updated. Other devices have been signed out." };
}
