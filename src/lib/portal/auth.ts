import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { cache } from "react";
import { db } from "./db";

export type Role = "admin" | "client";
export type SessionUser = { id: string; email: string; name: string; company: string | null; role: Role };

const COOKIE = "sslc_portal";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET is not configured");
  return new TextEncoder().encode(s);
}

export async function createSession(user: { id: string; role: Role; session_version: number }) {
  const token = await new SignJWT({ role: user.role, sv: user.session_version })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

/**
 * The signed-in user, re-checked against the database on every request so
 * deleted users and changed passwords (session_version) log out immediately.
 */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    if (!payload.sub) return null;
    const rows = await db()`
      select id, email, name, company, role, session_version
      from users where id = ${payload.sub}`;
    const u = rows[0];
    if (!u || u.session_version !== payload.sv) return null;
    return { id: u.id, email: u.email, name: u.name, company: u.company, role: u.role };
  } catch {
    return null;
  }
});

export async function requireUser() {
  const user = await getSession();
  if (!user) redirect("/portal/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/portal");
  return user;
}
