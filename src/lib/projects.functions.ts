import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { PROJECTS } from "@/constants/site";

/** Returns the hardcoded projects placeholder array. */
export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  return PROJECTS;
});

export const projectsQuery = () =>
  queryOptions({ queryKey: ["projects"], queryFn: () => listProjects(), staleTime: Infinity });
