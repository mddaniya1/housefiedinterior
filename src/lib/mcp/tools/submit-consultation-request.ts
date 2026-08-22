import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_consultation_request",
  title: "Submit a consultation request",
  description:
    "Send a consultation enquiry to HOUSEFIED on behalf of the signed-in user, describing the project they want help with.",
  inputSchema: {
    project_type: z
      .string()
      .trim()
      .min(1)
      .describe("Kind of project, e.g. Apartment, Villa, Retail store, Hotel."),
    message: z.string().trim().min(1).describe("What the user would like the studio to do."),
    location: z.string().trim().optional().describe("City or region of the project."),
    budget_range: z.string().trim().optional().describe("Indicative budget range, free text."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ project_type, message, location, budget_range }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("consultation_requests")
      .insert({
        user_id: ctx.getUserId(),
        project_type,
        message,
        location: location ?? null,
        budget_range: budget_range ?? null,
      })
      .select("id, project_type, location, budget_range, message, status, created_at")
      .single();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { request: data },
    };
  },
});
