// Creates (or resets) an admin account for the client portal.
// Usage: npm run portal:admin -- you@sslctstartup.com "Your Name"
// Prints a strong temporary password once; change it after signing in (Account page).
import { existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

if (!process.env.DATABASE_URL && existsSync(".env.local")) process.loadEnvFile(".env.local");
const url = process.env.DATABASE_URL;
const [emailArg, ...nameParts] = process.argv.slice(2);
if (!url || !emailArg) {
  console.error('Usage: npm run portal:admin -- email@domain.com "Name"   (needs DATABASE_URL)');
  process.exit(1);
}

const email = emailArg.trim().toLowerCase();
const name = nameParts.join(" ").trim() || "SSLC Admin";
const password = randomBytes(12).toString("base64url");
const hash = await bcrypt.hash(password, 12);

const sql = neon(url);
await sql`
  insert into users (email, name, role, password_hash)
  values (${email}, ${name}, 'admin', ${hash})
  on conflict (email) do update
    set role = 'admin', password_hash = excluded.password_hash,
        session_version = users.session_version + 1`;

console.log(`Admin ready: ${email}`);
console.log(`Temporary password: ${password}`);
console.log("Sign in at /portal/login and change it on the Account page.");
