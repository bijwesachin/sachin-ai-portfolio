import { getProfileSummary } from "./profile";
import { getProjectDetails } from "./projects";

export const tools: any[] = [
  {
    type: "function",
    function: {
      name: "get_profile_summary",
      description: "Get professional summary based on visitor type",
      parameters: {
        type: "object",
        properties: {
          visitorType: {
            type: "string",
            enum: ["recruiter", "hiring_manager", "engineer", "curious"],
          },
        },
        required: ["visitorType"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_project_details",
      description: "Get detailed information about a project",
      parameters: {
        type: "object",
        properties: {
          projectName: { type: "string" },
        },
        required: ["projectName"],
      },
    },
  },
];

export const toolHandlers = {
  get_profile_summary: getProfileSummary,
  get_project_details: getProjectDetails,
};