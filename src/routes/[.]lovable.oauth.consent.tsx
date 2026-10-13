import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { lovable } from "@/integrations/lovable/index";
import { BRAND } from "@/constants/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/.lovable/oauth/consent")({
  // Browser-only consent UI; no backend auth provider is configured yet.
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "",
  }),
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    if (!authorizationId) throw new Error("Missing authorization_id");
    return { signedIn: false as const, details: null, email: null };
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md space-y-3 text-center">
        <h1 className="font-display text-2xl text-foreground">Authorization unavailable</h1>
        <p className="text-sm text-muted-foreground">
          {String((error as Error)?.message ?? error)}
        </p>
      </div>
    </main>
  ),
});

function Consent() {
  const { signedIn } = Route.useLoaderData();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setBusy(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.href,
    });
    if (result.error) {
      setBusy(false);
      setError(result.error.message);
      return;
    }
    if (!result.redirected) {
      setBusy(false);
      setError("Sign-in is not available until an auth provider is configured.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{BRAND.name}</p>

        {!signedIn ? (
          <>
            <h1 className="mt-4 font-display text-2xl text-foreground">Sign in to continue</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Authentication is not configured yet. OAuth consent cannot be completed.
            </p>
            {error && (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {error}
              </p>
            )}
            <Button className="mt-6 w-full" disabled={busy} onClick={signIn}>
              Continue with Google
            </Button>
          </>
        ) : null}
      </div>
    </main>
  );
}
