import { defineMcp } from "@lovable.dev/mcp-js";

import getStudioInfoTool from "./tools/get-studio-info";
import listProjectsTool from "./tools/list-projects";
import listServicesTool from "./tools/list-services";

export default defineMcp({
  name: "ethereal-spaces",
  title: "Ethereal Spaces",
  version: "0.1.0",
  instructions:
    "Tools for HOUSEFIED, an interior design and turnkey execution studio in Karachi. Use `get_studio_info`, `list_services` and `list_projects` to answer questions about the studio and its work.",
  tools: [
    getStudioInfoTool,
    listServicesTool,
    listProjectsTool,
  ] as unknown as Parameters<typeof defineMcp>[0]["tools"],
});
