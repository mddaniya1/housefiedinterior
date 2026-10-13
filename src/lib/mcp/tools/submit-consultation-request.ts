import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

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
  handler: async (_input, _ctx) => {
    return {
      content: [{ type: "text" as const, text: "Consultation submission is not yet available — database not configured." }],
      isError: true,
    };
  },
});
