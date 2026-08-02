import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getStudioInfoTool from "./tools/get-studio-info";
import listMyConsultationRequestsTool from "./tools/list-my-consultation-requests";
import listProjectsTool from "./tools/list-projects";
import listServicesTool from "./tools/list-services";
import submitConsultationRequestTool from "./tools/submit-consultation-request";

// The OAuth issuer must be the direct Supabase host; the project ref is the only
// value that survives publish unchanged, and Vite inlines it at build time.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "ethereal-spaces",
  title: "Ethereal Spaces",
  version: "0.1.0",
  instructions:
    "Tools for the Lumen & Oak interior design atelier. Use `get_studio_info`, `list_services` and `list_projects` to answer questions about the studio and its work. Use `submit_consultation_request` to send a project enquiry as the signed-in user, and `list_my_consultation_requests` to review their previous enquiries.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  // Cast: defineTool leaves `outputSchema` absent, which the SDK's tool-list type
  // rejects only under exactOptionalPropertyTypes.
  tools: [
    getStudioInfoTool,
    listServicesTool,
    listProjectsTool,
    submitConsultationRequestTool,
    listMyConsultationRequestsTool,
  ] as unknown as Parameters<typeof defineMcp>[0]["tools"],
});
