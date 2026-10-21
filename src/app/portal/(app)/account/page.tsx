import type { Metadata } from "next";
import { requireUser } from "@/lib/portal/auth";
import { PageTitle, Panel } from "@/components/portal/ui";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <div className="grid min-w-0 max-w-2xl gap-8 [&>*]:min-w-0">
      <PageTitle title="Account" sub={`${user.name} · ${user.email}`} />
      <Panel title="Change password">
        <div className="p-6">
          <PasswordForm />
        </div>
      </Panel>
    </div>
  );
}
