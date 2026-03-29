import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { ChatOpenAI } from "@langchain/openai";

async function test() {
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const res = await model.invoke("What is the capital of France?");
  console.log("AI:", res.content);
}

test();