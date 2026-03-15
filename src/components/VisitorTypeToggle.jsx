"use client";

import { useEffect, useState } from "react";

const VISITORS = ["recruiter", "hiring-manager", "engineer", "curious"];

export default function VisitorTypeToggle({ onChange }) {
  const [selected, setSelected] = useState("curious");

  useEffect(() => {
    const stored = localStorage.getItem("visitorType");
    if (stored) {
      setSelected(stored);
      onChange(stored);
    }
  }, [onChange]);

  const handleSelect = (type) => {
    setSelected(type);
    localStorage.setItem("visitorType", type);
    onChange(type);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {VISITORS.map((type) => (
        <button
          key={type}
          onClick={() => handleSelect(type)}
          className={`px-3 py-1 rounded border text-sm ${
            selected === type
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}