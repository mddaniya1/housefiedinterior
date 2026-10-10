import { PROJECT_GROUPS, type Project } from "@/constants/site";
import type { Tables } from "@/integrations/supabase/types";

export type ProjectRow = Tables<"projects">;

export const CATEGORY_OPTIONS = PROJECT_GROUPS;

export function categoryLabel(slug: string) {
  return PROJECT_GROUPS.find((g) => g.slug === slug)?.label ?? slug;
}

/** Map a database row to the shape the public components already use. */
export function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.title,
    category: categoryLabel(row.category) as Project["category"],
    categorySlug: row.category,
    location: row.location,
    year: row.year,
    image: row.cover_image_url,
    description: row.description,
    gallery: row.gallery_urls?.length ? row.gallery_urls : row.cover_image_url ? [row.cover_image_url] : [],
  };
}

export const IMAGE_PROXY_PREFIX = "/api/public/project-images/";

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Resize to max 1600px wide and re-encode as JPEG (~80%). */
export async function compressImage(file: File, maxWidth = 1600, quality = 0.8): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not process image"))), "image/jpeg", quality),
  );
}
