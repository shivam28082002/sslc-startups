"use client";

import { createContext, startTransition, useActionState, useContext, useEffect, useRef, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import type { FormState } from "@/lib/portal/validate";

export const inputClass =
  "block h-10 w-full rounded-md border border-line-strong bg-bg px-3 text-[14.5px] text-fg placeholder:text-subtle outline-none transition-[border-color,box-shadow] focus:border-violet focus:shadow-[0_0_0_3px_rgb(112_50_230/0.18)]";

type Action = (state: FormState, fd: FormData) => Promise<FormState>;

const PendingContext = createContext<boolean | null>(null);

/**
 * Form bound to a server action, with inline success/error messages.
 * Submits via onSubmit + startTransition instead of the `action` prop so
 * React doesn't auto-reset the fields after every submit — what the user
 * typed survives validation errors; it's cleared only on success when
 * resetOnSuccess is set.
 */
export function ActionForm({
  action,
  children,
  className,
  resetOnSuccess = false,
}: {
  action: Action;
  children: ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const [state, dispatch, pending] = useActionState(action, undefined);
  const ref = useRef<HTMLFormElement>(null);
  const submitted = useRef("");
  const snapshot = (form: HTMLFormElement) =>
    JSON.stringify([...new FormData(form).entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]));
  useEffect(() => {
    // Clear only if nothing was typed since this submission (avoids wiping the next entry).
    if (resetOnSuccess && state?.ok && ref.current && snapshot(ref.current) === submitted.current) ref.current.reset();
  }, [state, resetOnSuccess]);

  return (
    <PendingContext.Provider value={pending}>
      <form
        ref={ref}
        className={className}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          submitted.current = snapshot(e.currentTarget);
          startTransition(() => dispatch(fd));
        }}
      >
        {children}
        {state?.error ? (
          <p role="alert" className="mt-3 text-[13.5px] text-[#b42318]">
            {state.error}
          </p>
        ) : null}
        {state?.ok ? (
          <p role="status" className="mt-3 rounded-md bg-[#e6f6ee] px-3 py-2 text-[13.5px] break-words text-[#0b7a4b]">
            {state.ok}
          </p>
        ) : null}
      </form>
    </PendingContext.Provider>
  );
}

export function Field({ label, htmlFor, hint, children, className }: { label: string; htmlFor: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-fg/85">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1 text-[12.5px] text-subtle">{hint}</p> : null}
    </div>
  );
}

export function Submit({
  children,
  className,
  variant = "primary",
  pendingLabel = "Saving…",
}: {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  pendingLabel?: string;
}) {
  const ctx = useContext(PendingContext);
  const status = useFormStatus();
  const pending = ctx ?? status.pending;
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-[14px] font-semibold transition-opacity disabled:opacity-60",
        variant === "primary" && "bg-fg text-bg hover:opacity-85",
        variant === "secondary" && "border border-line-strong bg-bg text-fg hover:bg-surface-2",
        variant === "danger" && "border border-[#b42318]/30 bg-bg text-[#b42318] hover:bg-[#fdecea]",
        className,
      )}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Plain server-action button form (no state), with a confirm prompt for destructive actions. */
export function ConfirmButton({
  action,
  fields,
  label,
  confirm,
  className,
}: {
  action: (fd: FormData) => Promise<void>;
  fields: Record<string, string>;
  label: string;
  confirm?: string;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <button type="submit" className={cn("text-[13px] font-medium text-muted underline-offset-4 hover:text-fg hover:underline", className)}>
        {label}
      </button>
    </form>
  );
}
