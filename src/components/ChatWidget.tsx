"use client";

import { useState } from "react";

type ChatWidgetProps = {
  visitorType: "recruiter" | "hiring-manager" | "engineer" | "curious";
};

export default function ChatWidget({ visitorType }: ChatWidgetProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        visitorType,
      }),
    });

    const data = await response.json();

    const aiMessage = {
      role: "assistant",
      content: data.reply || "Something went wrong",
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div>
      <h2>AI Chat</h2>

      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}