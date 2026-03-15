type StarInput = {
  topic: string;
};

export async function generateStarStory({ topic }: StarInput) {

  const topicLower = topic.toLowerCase();

  if (topicLower.includes("incident") || topicLower.includes("outage")) {
    return {
      topic: "Production Incident Management",
      situation:
        "A critical payment processing service experienced intermittent failures during peak transaction hours.",
      task:
        "As the lead engineer, I needed to quickly diagnose the issue, stabilize the system, and prevent financial transaction disruptions.",
      action: [
        "Analyzed logs and distributed traces to isolate the failing service.",
        "Identified a database connection pool exhaustion issue.",
        "Implemented a temporary mitigation by increasing pool size and throttling traffic.",
        "Worked with the team to implement a long-term fix using circuit breakers and improved connection management."
      ],
      result:
        "The system stabilized within minutes, preventing customer impact. The permanent fix improved system resilience and reduced similar incidents by over 90%."
    };
  }

  if (topicLower.includes("lead") || topicLower.includes("mentoring")) {
    return {
      topic: "Technical Leadership and Mentoring",
      situation:
        "Our team needed to modernize legacy APIs while onboarding several new engineers unfamiliar with the system.",
      task:
        "I was responsible for guiding the architecture modernization while helping new engineers ramp up quickly.",
      action: [
        "Designed a migration strategy using microservices and API gateway patterns.",
        "Held weekly technical mentoring sessions to explain architecture decisions.",
        "Created documentation and diagrams for distributed system components."
      ],
      result:
        "The team successfully migrated several APIs with minimal disruption, and new engineers became productive much faster."
    };
  }

  if (topicLower.includes("system") || topicLower.includes("architecture")) {
    return {
      topic: "System Architecture Decision",
      situation:
        "A legacy monolithic service was struggling to scale with increasing transaction volume.",
      task:
        "I needed to redesign the system to improve scalability and resilience.",
      action: [
        "Identified service boundaries and separated the monolith into microservices.",
        "Introduced asynchronous messaging using event-driven architecture.",
        "Added observability using distributed tracing and metrics."
      ],
      result:
        "The new architecture improved scalability and allowed independent service deployments."
    };
  }

  return {
    topic: "General Engineering Challenge",
    situation:
      "Sachin has led multiple backend and distributed system initiatives across financial platforms.",
    task:
      "He is responsible for designing reliable systems and mentoring engineering teams.",
    action: [
      "Architects scalable microservices systems.",
      "Leads technical design discussions.",
      "Mentors engineers on system design and backend architecture."
    ],
    result:
      "These efforts consistently improve system reliability and team productivity."
  };
}