import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set password — HOUSEFIED" },
      { name: "description", content: "Set a new admin password." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password saved");
    navigate({ to: "/admin", replace: true });
  }

  return (
    <main className="min-h-screen px-4 pb-20 pt-32">
      <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-[2rem] bg-card p-8 shadow-soft">
        <h1 className="font-display text-2xl">Set a new password</h1>
        <input
          type="password"
          required
          minLength={8}
          placeholder="New password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-h-11 rounded-xl border border-border bg-card px-4 text-sm"
        />
        <button disabled={busy} className="min-h-11 w-full rounded-full bg-primary text-sm text-primary-foreground disabled:opacity-60">
          {busy ? "Saving…" : "Save password"}
        </button>
      </form>
    </main>
  );
}
