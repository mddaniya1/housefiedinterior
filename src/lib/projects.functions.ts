import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { PROJECTS as STATIC_PROJECTS, type Project } from "@/constants/site";
import { sanityClient, urlFor } from "@/lib/sanity";

const PROJECTS_GROQ = `*[_type == "project"] | order(year desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  location,
  year,
  description,
  coverImage,
  gallery
}`;

export const listProjects = createServerFn({ method: "GET" }).handler(async (): Promise<Project[]> => {
  try {
    const raw = await sanityClient.fetch<any[]>(PROJECTS_GROQ);
    if (!raw || raw.length === 0) {
      return STATIC_PROJECTS;
    }

    return raw.map((item) => {
      const catLower = (item.category || "interiors").toLowerCase();
      const categoryMap: Record<string, Project["category"]> = {
        "kitchen": "Kitchens",
        "kitchens": "Kitchens",
        "interior": "Interiors",
        "interiors": "Interiors",
        "wardrobe": "Wardrobes",
        "wardrobes": "Wardrobes",
        "bathroom": "Bathrooms",
        "bathrooms": "Bathrooms",
      };
      const category = categoryMap[catLower] || "Interiors";
      const categorySlug = catLower;
      
      return {
        slug: item.slug || item.title?.toLowerCase().replace(/\s+/g, "-") || "project",
        name: item.title || "Untitled Project",
        category,
        categorySlug,
        location: item.location || "Karachi",
        year: item.year || new Date().getFullYear().toString(),
        description: item.description || "",
        image: item.coverImage ? urlFor(item.coverImage).width(1600).url() : STATIC_PROJECTS[0].image,
        gallery: Array.isArray(item.gallery) && item.gallery.length > 0
          ? item.gallery.map((img: any) => urlFor(img).width(1600).url())
          : [],
      };
    });
  } catch (error) {
    console.error("Sanity fetch error (falling back to static):", error);
    return STATIC_PROJECTS;
  }
});

export const projectsQuery = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: () => listProjects(),
    staleTime: 60_000,
  });
