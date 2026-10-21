/** Shared, environment-agnostic formatting helpers for the portal. */

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export function money(paise: number | string | bigint) {
  return inr.format(Number(paise) / 100);
}

/** Dates are stored as 'YYYY-MM-DD' strings; format without timezone drift. */
export function day(iso: string | null | undefined) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Today's date in India (YYYY-MM-DD). */
export function todayIST() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export function daysBetween(fromIso: string, toIso: string) {
  const a = Date.parse(`${fromIso}T00:00:00Z`);
  const b = Date.parse(`${toIso}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}

export type PaymentState = "paid" | "overdue" | "due" | "upcoming" | "cancelled";

export function paymentState(p: { status: string; due_date: string | null }, today = todayIST()): PaymentState {
  if (p.status === "paid") return "paid";
  if (p.status === "cancelled") return "cancelled";
  if (!p.due_date) return "upcoming";
  const d = daysBetween(today, p.due_date);
  if (d < 0) return "overdue";
  if (d <= 7) return "due";
  return "upcoming";
}

export const projectStatusLabel: Record<string, string> = {
  planning: "Planning",
  in_progress: "In progress",
  review: "In review",
  completed: "Completed",
  on_hold: "On hold",
};

export const milestoneStatusLabel: Record<string, string> = {
  pending: "Not started",
  in_progress: "In progress",
  done: "Done",
};
