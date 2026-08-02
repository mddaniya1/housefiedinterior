import { defineTool } from "@lovable.dev/mcp-js";

import { BRAND, FAQS, STATS } from "@/constants/site";

export default defineTool({
  name: "get_studio_info",
  title: "Get studio information",
  description:
    "Get Lumen & Oak studio details: description, contact information, opening hours, key figures and frequently asked questions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: BRAND.name,
      tagline: BRAND.tagline,
      description: BRAND.description,
      phone: BRAND.phone,
      email: BRAND.email,
      address: BRAND.address,
      hours: BRAND.hours,
      stats: STATS.map((s) => ({ label: s.label, value: `${s.value}${s.suffix}` })),
      faqs: FAQS.map((f) => ({ question: f.question, answer: f.answer })),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
