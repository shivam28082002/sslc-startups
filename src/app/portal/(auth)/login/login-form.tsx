"use client";

import { ActionForm, Field, Submit, inputClass } from "@/components/portal/form";
import { login } from "../../actions";

export function LoginForm() {
  return (
    <ActionForm action={login} className="mt-8 grid gap-4">
      <Field label="Email" htmlFor="email">
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </Field>
      <Field label="Password" htmlFor="password">
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </Field>
      <Submit className="mt-2 h-11 w-full" pendingLabel="Signing in…">
        Sign in
      </Submit>
    </ActionForm>
  );
}
