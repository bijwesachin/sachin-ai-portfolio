"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
};

export default function TypingMessage({ text, speed = 20 }: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}