import { runAgent } from "@/lib/agent/orchestrator";

export async function POST(req: Request) {
  try {
    const { message, visitorType, history } = await req.json();

    const reply = await runAgent(message, visitorType, history);

    return Response.json({ reply });
  } catch (error) {
    console.error("Agent error:", error);

    return Response.json(
      { reply: "Something went wrong running the AI agent." },
      { status: 500 }
    );
  }
}