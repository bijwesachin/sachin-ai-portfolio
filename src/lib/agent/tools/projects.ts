export async function getProjectDetails({ projectName }: any) {
  if (projectName.toLowerCase().includes("portfolio")) {
    return "AI-enabled portfolio using Next.js, OpenAI, custom agent loop, tool registry, and future RAG integration.";
  }

  return "Project details not found.";
}