import { NextRequest, NextResponse } from "next/server";
import { runAgent } from "@lib/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const { message, visitorType } = await req.json();

    const reply = await runAgent(message, visitorType);

    console.log("Final Reply:", reply);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}