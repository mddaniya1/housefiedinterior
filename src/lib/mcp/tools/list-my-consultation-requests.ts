import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_my_consultation_requests",
  title: "List my consultation requests",
  description: "List the consultation enquiries the signed-in user has sent to HOUSEFIED.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, _ctx) => {
    return {
      content: [{ type: "text" as const, text: "Consultation history is not yet available — database not configured." }],
      structuredContent: { requests: [] },
    };
  },
});
