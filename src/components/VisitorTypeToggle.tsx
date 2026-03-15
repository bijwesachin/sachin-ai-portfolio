"use client";

import { useEffect, useState } from "react";

type VisitorType = "recruiter" | "hiring-manager" | "engineer" | "curious";

type Props = {
  visitorType: VisitorType;
  onChange: (type: VisitorType) => void;
};

const VISITORS: VisitorType[] = [
  "recruiter",
  "hiring-manager",
  "engineer",
  "curious",
];

export default function VisitorTypeToggle({ visitorType, onChange }: Props) {
  const [selected, setSelected] = useState<VisitorType>(visitorType);

  useEffect(() => {
    const stored = localStorage.getItem("visitorType") as VisitorType | null;

    if (stored && VISITORS.includes(stored)) {
      setSelected(stored);
      onChange(stored);
    }
  }, [onChange]);

  const handleSelect = (type: VisitorType) => {
    setSelected(type);
    localStorage.setItem("visitorType", type);
    onChange(type);
  };

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {VISITORS.map((type) => (
        <button
          key={type}
          onClick={() => handleSelect(type)}
          className={`px-3 py-1 rounded border text-sm capitalize transition ${
            selected === type
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {type.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}