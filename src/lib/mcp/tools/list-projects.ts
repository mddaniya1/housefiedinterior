import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { PROJECTS, PROJECT_CATEGORIES } from "@/constants/site";

const categories = PROJECT_CATEGORIES.filter((c) => c !== "All") as unknown as [string, ...string[]];

export default defineTool({
  name: "list_projects",
  title: "List studio projects",
  description:
    "List Lumen & Oak interior design projects, optionally filtered by category (Residential, Retail, Hospitality).",
  inputSchema: {
    category: z
      .enum(categories)
      .optional()
      .describe("Optional project category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const rows = PROJECTS.filter((p) => !category || p.category === category).map((p) => ({
      name: p.name,
      category: p.category,
      year: p.year,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { projects: rows },
    };
  },
});
