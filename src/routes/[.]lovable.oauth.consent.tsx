import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { BRAND } from "@/constants/site";
import { Button } from "@/components/ui/button";

type OAuthDecision = { redirect_url?: string; redirect_to?: string };
type AuthorizationDetails = OAuthDecision & {
  client?: { name?: string; client_name?: string; redirect_uri?: string } | null;
  scope?: string | null;
};

type OAuthNamespace = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthDecision | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: OAuthDecision | null; error: { message: string } | null }>;
};

function oauth(): OAuthNamespace {
  return (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  // Browser-only: the session lives in localStorage, absent during SSR.
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s['authorization_id'] === "string" ? s['authorization_id'] : "",
  }),
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    if (!authorizationId) throw new Error("Missing authorization_id");

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return { signedIn: false, details: null, email: null };

    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);

    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });

    return {
      signedIn: true,
      details: data,
      email: sessionData.session.user.email ?? null,
    };
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
  const { signedIn, details, email } = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "this application";
  const scopes: string[] = (details?.scope ?? "").split(/\s+/).filter(Boolean);

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
    if (!result.redirected) window.location.reload();
  }

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error: decisionError } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (decisionError) {
      setBusy(false);
      setError(decisionError.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect was returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {BRAND.name}
        </p>

        {!signedIn ? (
          <>
            <h1 className="mt-4 font-display text-2xl text-foreground">
              Sign in to continue
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sign in to your {BRAND.name} account to review and approve this connection request.
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
        ) : (
          <>
            <h1 className="mt-4 font-display text-2xl text-foreground">
              Connect {clientName} to your account
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {clientName} will be able to call this studio&apos;s enabled tools as you
              {email ? ` (${email})` : ""}.
            </p>

            {details?.client?.redirect_uri && (
              <p className="mt-4 break-all text-xs text-muted-foreground">
                Redirects to {details.client.redirect_uri}
              </p>
            )}

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li>Read studio information, services and projects</li>
              <li>Send and read your own consultation enquiries</li>
              {scopes
                .filter((s) => !["openid", "email", "profile"].includes(s))
                .map((s) => (
                  <li key={s}>Additional permission requested: {s}</li>
                ))}
            </ul>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              This does not bypass this app&apos;s permissions — it can only reach data you can
              already access.
            </p>

            {error && (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="mt-7 flex flex-col gap-3">
              <Button disabled={busy} onClick={() => decide(true)}>
                Approve
              </Button>
              <Button variant="outline" disabled={busy} onClick={() => decide(false)}>
                Cancel connection
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
