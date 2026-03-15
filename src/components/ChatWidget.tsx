"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

type VisitorType =
  | "recruiter"
  | "hiring_manager"
  | "engineer"
  | "curious";

type Props = {
  visitorType: VisitorType;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget({ visitorType }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);

  // auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const text = input;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          visitorType,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.reply || "Something went wrong.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error contacting AI backend.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="bg-white border rounded-xl shadow-md p-4 flex flex-col h-[420px]">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            role={m.role}
            content={m.content}
          />
        ))}

        {loading && (
          <div className="text-sm text-gray-400">
            AI is thinking...
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t pt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}