"use client";

import { ActionForm, Field, Submit, inputClass } from "@/components/portal/form";
import { changePassword } from "../../actions";

export function PasswordForm() {
  return (
    <ActionForm action={changePassword} resetOnSuccess className="grid gap-4">
      <Field label="Current password" htmlFor="current">
        <input id="current" name="current" type="password" autoComplete="current-password" className={inputClass} />
      </Field>
      <Field label="New password" htmlFor="next" hint="At least 10 characters.">
        <input id="next" name="next" type="password" autoComplete="new-password" className={inputClass} />
      </Field>
      <Field label="Confirm new password" htmlFor="confirm">
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputClass} />
      </Field>
      <div>
        <Submit>Update password</Submit>
      </div>
    </ActionForm>
  );
}
