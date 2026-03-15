import OpenAI from "openai";
import { tools, toolHandlers } from "./tools";
import { systemPrompt } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function runAgent(message: string, visitorType: string) {

  const messages: any[] = [
    {
      role: "system",
      content: `${systemPrompt}\n\nVisitor type: ${visitorType}`,
    },
    {
      role: "user",
      content: message,
    },
  ];

  let iterations = 0;
  const MAX_ITERATIONS = 5;

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      tools,
      tool_choice: "auto",
    });

    const msg = response.choices[0].message;

    if (msg.tool_calls) {
      messages.push(msg);

      for (const toolCall of msg.tool_calls) {
        const toolCallData = toolCall as any;

        const functionName =
          toolCallData.function?.name ??
          toolCallData.name ??
          toolCallData.tool;

        const argumentsText =
          toolCallData.function?.arguments ??
          toolCallData.arguments ??
          "{}";

        const args = JSON.parse(argumentsText);

        if (!toolHandlers[functionName as keyof typeof toolHandlers]) {
          throw new Error(`Unknown tool: ${functionName}`);
        }

        console.log("Tool called:", functionName);

        const result = await toolHandlers[
          functionName as keyof typeof toolHandlers
        ](args);

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }

      continue;
    }

    return msg.content;
  }

  return "Agent stopped due to too many tool iterations.";
}