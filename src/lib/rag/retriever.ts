import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

import fs from "fs/promises";
import path from "path";

let documents: Document[] = [];
let docVectors: number[][] = []; // ✅ cache embeddings

// -----------------------------
// Load raw markdown files
// -----------------------------
async function loadDocs() {
  const files = ["resume.md", "projects.md", "stories.md"];

  const docs: Document[] = [];

  for (const file of files) {
    const fullPath = path.join(process.cwd(), "src", "data", file);
    const content = await fs.readFile(fullPath, "utf-8");

    docs.push(
      new Document({
        pageContent: normalizeText(content), // ✅ normalize early
        metadata: { source: file },
      })
    );
  }

  return docs;
}

// -----------------------------
// Normalize content (fix for your error)
// -----------------------------
function normalizeText(input: unknown): string {
  if (typeof input === "string") {
    return input.replace(/\n/g, " ").trim();
  }

  return JSON.stringify(input ?? "");
}

// -----------------------------
// Prepare + chunk + embed (ONLY once)
// -----------------------------
async function prepareDocs() {
  if (documents.length && docVectors.length) {
    return { documents, docVectors };
  }

  console.log("🔄 Preparing documents...");

  const rawDocs = await loadDocs();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  documents = await splitter.splitDocuments(rawDocs);

  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // ✅ Precompute embeddings ONCE
  docVectors = await Promise.all(
    documents.map(async (doc, i) => {
      const text = normalizeText(doc.pageContent);

      if (!text) {
        console.warn(`⚠️ Empty doc at index ${i}`);
      }

      return embeddings.embedQuery(text);
    })
  );

  console.log(`✅ Prepared ${documents.length} chunks`);

  return { documents, docVectors };
}

// -----------------------------
// Cosine similarity
// -----------------------------
function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
}

// -----------------------------
// Main retrieval function
// -----------------------------
export async function retrievePortfolioKnowledge(query: string) {
  const { documents, docVectors } = await prepareDocs();

  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log("🔍 Query:", query);

  const queryVector = await embeddings.embedQuery(query);

  const scored = documents.map((doc, i) => {
    const score = cosineSimilarity(queryVector, docVectors[i]);

    return {
      doc,
      score,
    };
  });

  const top = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  console.log(
    "📊 Top matches:",
    top.map((t) => ({
      score: t.score.toFixed(3),
      preview: t.doc.pageContent.slice(0, 80),
      source: t.doc.metadata?.source,
    }))
  );

  return top.map((r) => r.doc.pageContent);
}