"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";
import VisitorTypeToggle from "@/components/VisitorTypeToggle";

type VisitorType = "recruiter" | "hiring-manager" | "engineer" | "curious";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Sachin Bijwe</h1>
      <p className="text-lg text-gray-500">
        Principal Software Engineer
      </p>

      <div className="flex gap-4">
        <a href="https://linkedin.com" className="underline">LinkedIn</a>
        <a href="https://github.com/bijwesachin" className="underline">GitHub</a>
        <a href="/Sachin_Bijwe.pdf" className="underline">Resume</a>
      </div>

      <div className="mt-10">
        <p>Ask me anything about my experience ↓</p>
      </div>
    </main>
  );
}