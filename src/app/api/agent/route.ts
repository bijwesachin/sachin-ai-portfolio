import { runAgent } from "@/lib/agent/orchestrator";

export async function POST(req: Request) {
  try {
    const { message, visitorType } = await req.json();

    const reply = await runAgent(message, visitorType);

    return Response.json({ reply });
  } catch (error) {
    console.error("Agent error:", error);

    return Response.json(
      { reply: "Something went wrong running the AI agent." },
      { status: 500 }
    );
  }
}