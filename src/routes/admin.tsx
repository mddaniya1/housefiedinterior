import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORY_OPTIONS,
  IMAGE_PROXY_PREFIX,
  categoryLabel,
  compressImage,
  slugify,
  type ProjectRow,
} from "@/lib/projects";
import { useQueryClient } from "@tanstack/react-query";

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

const inputCls =
  "w-full min-h-11 rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:border-primary";

function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setIsAdmin(null);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  return (
    <main className="min-h-screen px-4 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {session === undefined ? (
          <Loader2 className="mx-auto size-6 animate-spin" />
        ) : !session ? (
          <Login />
        ) : isAdmin === null ? (
          <Loader2 className="mx-auto size-6 animate-spin" />
        ) : !isAdmin ? (
          <div className="text-center">
            <p>This account does not have admin access.</p>
            <SignOut />
          </div>
        ) : (
          <Dashboard email={session.user.email ?? ""} />
        )}
      </div>
    </main>
  );
}

function SignOut() {
  return (
    <button
      type="button"
      onClick={() => supabase.auth.signOut()}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm hover:bg-secondary"
    >
      <LogOut className="size-4" /> Logout
    </button>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  }

  async function forgot() {
    if (!email) { toast.error("Enter your email first."); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent. Check your email.");
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-[2rem] bg-card p-8 shadow-soft">
      <h1 className="font-display text-2xl">Admin login</h1>
      <input className={inputCls} type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={inputCls} type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={busy} className="min-h-11 w-full rounded-full bg-primary text-sm text-primary-foreground disabled:opacity-60">
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <button type="button" onClick={forgot} className="w-full text-xs text-muted-foreground underline">
        Forgot / set password
      </button>
    </form>
  );
}

function Dashboard({ email }: { email: string }) {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProjectRow | "new" | null>(null);
  const qc = useQueryClient();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setProjects(data ?? []);
    setLoading(false);
    qc.invalidateQueries({ queryKey: ["projects"] });
  }
  useEffect(() => {
    load();
  }, []);

  async function remove(p: ProjectRow) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return undefined;
    const { error } = await supabase.from("projects").delete().eq("id", p.id);
    if (error) { toast.error(error.message); return; }
    const paths = [p.cover_image_url, ...p.gallery_urls]
      .filter((u) => u.startsWith(IMAGE_PROXY_PREFIX))
      .map((u) => u.slice(IMAGE_PROXY_PREFIX.length));
    if (paths.length) await supabase.storage.from("project-images").remove(paths);
    toast.success("Project deleted");
    load();
  }

  if (editing)
    return (
      <ProjectForm
        project={editing === "new" ? null : editing}
        onDone={() => {
          setEditing(null);
          load();
        }}
      />
    );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Projects</h1>
          <p className="mt-1 text-xs text-muted-foreground">{email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setEditing("new")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm text-primary-foreground">
            <Plus className="size-4" /> Add Project
          </button>
          <SignOut />
        </div>
      </div>
      {loading ? (
        <Loader2 className="mx-auto mt-10 size-6 animate-spin" />
      ) : (
        <ul className="mt-8 space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="flex items-center gap-4 rounded-2xl bg-card p-3 shadow-soft">
              {p.cover_image_url ? (
                <img src={p.cover_image_url} alt="" className="size-16 shrink-0 rounded-xl object-cover" />
              ) : (
                <div className="size-16 shrink-0 rounded-xl bg-secondary" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {categoryLabel(p.category)} · {p.location} · {p.year}
                </p>
              </div>
              <button aria-label="Edit" onClick={() => setEditing(p)} className="grid size-11 place-items-center rounded-full hover:bg-secondary">
                <Pencil className="size-4" />
              </button>
              <button aria-label="Delete" onClick={() => remove(p)} className="grid size-11 place-items-center rounded-full text-destructive hover:bg-secondary">
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
          {!projects.length && <p className="text-sm text-muted-foreground">No projects yet.</p>}
        </ul>
      )}
    </div>
  );
}

async function upload(file: File): Promise<string> {
  const blob = await compressImage(file);
  const path = `${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage.from("project-images").upload(path, blob, { contentType: "image/jpeg" });
  if (error) throw error;
  return IMAGE_PROXY_PREFIX + path;
}

function ProjectForm({ project, onDone }: { project: ProjectRow | null; onDone: () => void }) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState(project?.category ?? "kitchens");
  const [location, setLocation] = useState(project?.location ?? "");
  const [year, setYear] = useState(project?.year ?? String(new Date().getFullYear()));
  const [description, setDescription] = useState(project?.description ?? "");
  const [cover, setCover] = useState(project?.cover_image_url ?? "");
  const [gallery, setGallery] = useState<string[]>(project?.gallery_urls ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onCover(files: FileList | null) {
    if (!files?.[0]) return;
    setUploading(true);
    try {
      setCover(await upload(files[0]));
    } catch (e) {
      toast.error((e as Error).message);
    }
    setUploading(false);
  }

  async function onGallery(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).map(upload));
      setGallery((g) => [...g, ...urls]);
    } catch (e) {
      toast.error((e as Error).message);
    }
    setUploading(false);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!cover) { toast.error("Please add a cover image."); return; }
    setSaving(true);
    const values = { title, category, location, year, description, cover_image_url: cover, gallery_urls: gallery };
    const { error } = project
      ? await supabase.from("projects").update(values).eq("id", project.id)
      : await supabase.from("projects").insert({ ...values, slug: `${slugify(title)}-${Date.now().toString(36).slice(-4)}` });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(project ? "Project updated" : "Project added");
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-[2rem] bg-card p-5 shadow-soft sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">{project ? "Edit project" : "Add project"}</h1>
        <button type="button" aria-label="Cancel" onClick={onDone} className="grid size-11 place-items-center rounded-full hover:bg-secondary">
          <X className="size-5" />
        </button>
      </div>
      <Field label="Title"><input className={inputCls} required value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Category">
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </Field>
        <Field label="Location"><input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} /></Field>
        <Field label="Year"><input className={inputCls} value={year} onChange={(e) => setYear(e.target.value)} /></Field>
      </div>
      <Field label="Description">
        <textarea className={`${inputCls} min-h-32`} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <Field label="Cover image">
        {cover && (
          <div className="relative mb-3 w-full max-w-xs">
            <img src={cover} alt="Cover preview" className="aspect-[4/3] w-full rounded-xl object-cover" />
            <RemoveBtn onClick={() => setCover("")} />
          </div>
        )}
        <input type="file" accept="image/*" onChange={(e) => onCover(e.target.files)} className="text-sm" />
      </Field>
      <Field label="Gallery images">
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((g, i) => (
            <div key={g + i} className="relative">
              <img src={g} alt={`Gallery ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" />
              <RemoveBtn onClick={() => setGallery((arr) => arr.filter((_, j) => j !== i))} />
            </div>
          ))}
        </div>
        <input type="file" accept="image/*" multiple onChange={(e) => onGallery(e.target.files)} className="text-sm" />
      </Field>
      {uploading && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Uploading images…</p>}
      <div className="flex flex-wrap gap-2">
        <button disabled={saving || uploading} className="min-h-11 rounded-full bg-primary px-6 text-sm text-primary-foreground disabled:opacity-60">
          {saving ? "Saving…" : "Save project"}
        </button>
        <button type="button" onClick={onDone} className="min-h-11 rounded-full border border-border px-6 text-sm">Cancel</button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Remove image"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/90 shadow-soft"
    >
      <X className="size-4" />
    </button>
  );
}
