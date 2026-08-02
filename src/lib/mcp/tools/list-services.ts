import { defineTool } from "@lovable.dev/mcp-js";

import { SERVICES } from "@/constants/site";

export default defineTool({
  name: "list_services",
  title: "List studio services",
  description: "List the design services Lumen & Oak offers, with a short description of each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = SERVICES.map((s) => ({ title: s.title, description: s.description }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { services: rows },
    };
  },
});
