"use client";

import { useEffect, useState } from "react";
import AiTutor_Sidebar from "@/components/AiTutor_Sidebar";
import AiTutor_MainContent from "@/components/AiTutor_MainContent";
import Footer from "@/components/Footer";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState("Middle School");
  const [chatHistory, setChatHistory] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [previousChats, setPreviousChats] = useState<any[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch("/api/tutor");
      const data = await res.json();
      setPreviousChats(data);
    };
    fetchChats();
  }, []);

  const handleSubmit = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, level }),
      });
      const data = await response.json();
      setChatHistory((prev) => [...prev, { question, answer: data.answer }]);
    } catch (error) {
      setChatHistory((prev) => [...prev, { question, answer: "Error fetching response." }]);
    }
    setLoading(false);
    setQuestion("");
  };

  const handlePreviousChatClick = (chat: any) => {
    setChatHistory((prev) => [...prev, { question: chat.question, answer: chat.answer }]);
    setShowSidebar(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow relative">
        {showSidebar && (
          <AiTutor_Sidebar chats={previousChats} onSelectChat={handlePreviousChatClick} />
        )}

        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute top-4 left-4 z-30 bg-gray-800 text-white px-4 py-2 rounded shadow-md hover:bg-gray-700"
        >
          {showSidebar ? "Hide" : "Show"} Previous Chats
        </button>

        <AiTutor_MainContent
          question={question}
          level={level}
          setQuestion={setQuestion}
          setLevel={setLevel}
          handleSubmit={handleSubmit}
          loading={loading}
          chatHistory={chatHistory}
        />
      </div>

      <Footer />
    </div>
  );
}
