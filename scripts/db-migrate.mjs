// Applies db/schema.sql to DATABASE_URL (reads .env.local when present).
// Usage: npm run db:migrate
import { readFileSync, existsSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL && existsSync(".env.local")) process.loadEnvFile(".env.local");
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Run `vercel env pull .env.local` first.");
  process.exit(1);
}

const sql = neon(url);
const statements = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8")
  .split(/;\s*$/m)
  .map((s) => s.replace(/--.*$/gm, "").trim())
  .filter(Boolean);

for (const stmt of statements) await sql.query(stmt);
const tables = await sql.query(
  "select table_name from information_schema.tables where table_schema = 'public' order by table_name",
);
console.log(`Applied ${statements.length} statements. Tables:`, tables.map((t) => t.table_name).join(", "));
