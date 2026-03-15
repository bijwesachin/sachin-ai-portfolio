"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";
import VisitorTypeToggle from "@/components/VisitorTypeToggle";

type VisitorType = "recruiter" | "hiring-manager" | "engineer" | "curious";

export default function Home() {
  const [visitorType, setVisitorType] = useState<VisitorType>("curious");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">
        Sachin Bijwe
      </h1>

      <p className="text-gray-600 mb-4">
        Lead Software Engineer | Distributed Systems | AI-enabled Architectures
      </p>

      <div className="flex gap-4 mb-6">
        <a
          href="https://linkedin.com/in/sachinbijwe"
          target="_blank"
          className="underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/bijwesachin"
          target="_blank"
          className="underline"
        >
          GitHub
        </a>
      </div>

      <VisitorTypeToggle onChange={setVisitorType} />

      <ChatWidget visitorType={visitorType} />
    </main>
  );
}