import { getProfileSummary } from "./profile";
import { getProjectDetails } from "./projects";
import { generateStarStory } from "./star";
import { retrievePortfolioContext } from "./retrieval";

type ToolHandler = (args: any) => Promise<any>;

export const tools: any[] = [
  {
    type: "function",
    function: {
      name: "get_profile_summary",
      description:
        "Get professional summary about Sachin Bijwe tailored for a specific visitor type.",
      parameters: {
        type: "object",
        properties: {
          visitorType: {
            type: "string",
            enum: ["recruiter", "hiring_manager", "engineer", "curious"],
          },
        },
        required: ["visitorType"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_project_details",
      description:
        "Get detailed information about a specific project built by Sachin Bijwe.",
      parameters: {
        type: "object",
        properties: {
          projectName: {
            type: "string",
            description: "Name of the project",
          },
        },
        required: ["projectName"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "generate_star_story",
      description:
        "Generate a STAR-format story about Sachin's engineering experience.",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description:
              "Topic such as incident management, leadership, mentoring, architecture",
          },
        },
        required: ["topic"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "retrieve_portfolio_context",
      description:
        "Search Sachin's portfolio knowledge base, including resume, projects, and stories, to answer detailed questions.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The user question or search query",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
    },
  },
];

export const toolHandlers: Record<string, ToolHandler> = {
  get_profile_summary: getProfileSummary,
  get_project_details: getProjectDetails,
  generate_star_story: generateStarStory,
  retrieve_portfolio_context: retrievePortfolioContext,
};