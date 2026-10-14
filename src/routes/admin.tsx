import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, FolderKanban } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | HOUSEFIED" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const sanityUrl = "https://sanity.io/manage/project/104vuts5";

  return (
    <div className="min-h-screen bg-black text-stone-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-stone-800 bg-stone-950/80 p-8 rounded-xl shadow-2xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="inline-flex p-3 rounded-full bg-stone-900 border border-stone-800 text-amber-500 mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-wider font-display">HOUSEFIED</h1>
          <p className="text-xs uppercase tracking-widest text-stone-400">Content Management Portal</p>
        </div>

        <div className="border border-stone-800/80 bg-stone-900/40 rounded-lg p-4 space-y-3 text-xs text-stone-300">
          <div className="flex items-center gap-2 text-stone-100 font-medium">
            <FolderKanban className="w-4 h-4 text-amber-500" />
            <span>How to manage your projects:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-stone-400">
            <li>Click below to open the Sanity Studio portal</li>
            <li>Log in with your authorized Google account</li>
            <li>Add new projects, upload photos, and click <strong className="text-stone-200">Publish</strong></li>
          </ol>
        </div>

        <a
          href={sanityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-stone-100 hover:bg-white text-black font-medium text-sm rounded-lg transition"
        >
          <span>Open Sanity Dashboard</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        <p className="text-center text-[11px] text-stone-500">
          Changes published in Sanity sync automatically with the live site.
        </p>
      </div>
    </div>
  );
}
