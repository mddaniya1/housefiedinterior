import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — HOUSEFIED" },
      { name: "description", content: "HOUSEFIED project management." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-display text-3xl">Admin</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Content management is not yet configured.
        </p>
      </div>
    </main>
  );
}
