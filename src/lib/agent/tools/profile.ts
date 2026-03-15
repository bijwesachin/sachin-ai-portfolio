type ProfileInput = {
  visitorType?: string;
};

export async function getProfileSummary({ visitorType }: ProfileInput) {
  const baseProfile = {
    name: "Sachin Bijwe",
    title: "Principal Software Engineer",
    experience: "15+ years",
    location: "Chicago, USA",
    specialties: [
      "Java",
      "Spring Boot",
      "Distributed Systems",
      "Microservices",
      "System Design",
      "AI Agent Architecture",
      "RAG Systems",
      "Observability",
    ],
  };

  if (visitorType === "recruiter") {
    return {
      ...baseProfile,
      summary:
        "Sachin is a Principal Engineer with 15+ years of experience building and leading large-scale distributed systems in the financial services domain.",
    };
  }

  if (visitorType === "engineer") {
    return {
      ...baseProfile,
      summary:
        "Sachin focuses on backend architecture, distributed systems design, and AI-enabled systems such as RAG pipelines, agent orchestration, and observability platforms.",
    };
  }

  return {
    ...baseProfile,
    summary:
      "Sachin is an experienced backend and platform engineer specializing in scalable systems and modern AI-driven architectures.",
  };
}