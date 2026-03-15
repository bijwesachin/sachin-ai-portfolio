export async function getProfileSummary({ visitorType }: any) {
  if (visitorType === "recruiter") {
    return "Sachin is a Principal Engineer with 15+ years of experience leading distributed systems and financial platforms.";
  }

  if (visitorType === "engineer") {
    return "Sachin specializes in Java, Spring Boot, system design, and AI-enabled architecture (RAG, agents, observability).";
  }

  return "Sachin is a senior software engineer with deep backend and AI architecture expertise.";
}