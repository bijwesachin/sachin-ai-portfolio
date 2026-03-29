import { retrievePortfolioKnowledge } from "@/lib/rag/retriever";

type RetrievalInput = {
  query: string;
};

export async function retrievePortfolioContext({ query }: RetrievalInput) {
  const results = await retrievePortfolioKnowledge(query);

  return {
    query,
    results,
  };
}

