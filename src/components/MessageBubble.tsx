import TypingMessage from "./TypingMessage";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[75%] text-sm leading-relaxed ${
          isUser
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-800 border"
        }`}
      >
        {isUser ? content : <TypingMessage text={content} />}
      </div>
    </div>
  );
}