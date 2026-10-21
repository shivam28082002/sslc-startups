/** Small FormData helpers shared by portal server actions. */

export type FormState = { error?: string; ok?: string } | undefined;

export function text(fd: FormData, key: string, max = 200) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function optionalText(fd: FormData, key: string, max = 200) {
  return text(fd, key, max) || null;
}

/** Accepts YYYY-MM-DD (what <input type="date"> sends) or empty. */
export function dateOrNull(fd: FormData, key: string) {
  const v = text(fd, key, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
}

/** "50000", "50,000", "50000.50" rupees → integer paise, or null if invalid. */
export function rupeesToPaise(fd: FormData, key: string) {
  const raw = text(fd, key, 20).replace(/[,\s₹]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) return null;
  const paise = Math.round(Number(raw) * 100);
  return paise > 0 && paise < 1e13 ? paise : null;
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function oneOf<T extends string>(v: string, allowed: readonly T[]): T | null {
  return (allowed as readonly string[]).includes(v) ? (v as T) : null;
}

export const isUuid = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
