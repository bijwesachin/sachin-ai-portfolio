type ProjectInput = {
  projectName: string;
};

const projects = {
  portfolio: {
    name: "AI Agentic Portfolio",
    description:
      "Personal portfolio website featuring an AI assistant powered by a custom agent loop.",
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI API",
      "Agent Tool Calling",
      "LangChain (planned)",
      "Supabase pgvector (planned)",
    ],
    architecture: [
      "Next.js frontend with chat UI",
      "API route running custom agent orchestrator",
      "Tool registry for profile/projects/STAR stories",
      "Future RAG layer using vector search",
      "Session memory using Redis",
    ],
  },
};

export async function getProjectDetails({ projectName }: ProjectInput) {
  const key = projectName.toLowerCase();

  if (key.includes("portfolio")) {
    return projects.portfolio;
  }

  return {
    error: "Project not found",
    message: `No project matched "${projectName}"`,
  };
}