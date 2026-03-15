"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";
import VisitorTypeToggle from "@/components/VisitorTypeToggle";

type VisitorType = "recruiter" | "hiring-manager" | "engineer" | "curious";

export default function Home() {

  const [visitorType, setVisitorType] = useState<VisitorType>("curious");

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-6 bg-gray-50">

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900">
        Sachin Bijwe
      </h1>

      <p className="text-lg text-gray-600 mt-2">
        Principal Software Engineer
      </p>

      {/* Links */}
      <div className="flex gap-6 mt-4 text-blue-600">
        <a href="https://www.linkedin.com/in/sachinbijwe/" target="_blank" className="hover:underline">
          LinkedIn
        </a>

        <a href="https://github.com/bijwesachin" target="_blank" className="hover:underline">
          GitHub
        </a>

        <a href="/Sachin_Bijwe.pdf" target="_blank" className="hover:underline">
          Resume
        </a>
      </div>

      {/* Visitor selector */}
      <div className="mt-6">
        <VisitorTypeToggle
          visitorType={visitorType}
          onChange={setVisitorType}
        />
      </div>

      {/* AI Section */}
      <div className="mt-8 text-center max-w-xl">
        <p className="text-gray-700">
          Ask my <span className="font-semibold">AI assistant</span> about:
        </p>

        <p className="text-sm text-gray-500 mt-2">
          system design • distributed systems • my projects • leadership experience
        </p>
      </div>

      {/* Chat Widget */}
      <div className="mt-8 w-full flex justify-center">
        <ChatWidget visitorType={visitorType} />
      </div>

    </main>
  );
}