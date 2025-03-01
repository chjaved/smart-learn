"use client";

import { useState } from "react";
import Footer from "@/components/Footer"; // Importing Footer Component

export default function Home() {
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState("Middle School");
  const [chatHistory, setChatHistory] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);

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

      // Append new message to chat history
      setChatHistory((prev) => [
        ...prev,
        { question, answer: data.answer }
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { question, answer: "Error fetching response. Please try again." }
      ]);
    }

    setLoading(false);
    setQuestion(""); // Clear input field after submission
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-3xl w-full p-6">
          {/* Logo and Header */}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-gray-900">
              Your Personal <span className="text-blue-600">Tutor</span>
            </h1>
            <p className="mt-4 text-gray-600">
              Enter a topic you want to learn about along with the education level, and get a personalized tutor experience!
            </p>
          </div>

          {/* Input Section */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Teach me about..."
              className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Middle School</option>
              <option>High School</option>
              <option>Undergraduate</option>
              <option>Graduate</option>
            </select>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              →
            </button>
          </div>

          {/* AI Chat History Section */}
          <div className="mt-6 max-h-[500px] overflow-y-auto bg-white p-4 rounded-lg shadow-md text-left">
            {chatHistory.map((chat, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-gray-800">You:</p>
                <p className="p-2 bg-gray-200 rounded-md">{chat.question}</p>
                <p className="font-semibold text-blue-600 mt-2">Tutor:</p>
                <p className="p-2 bg-gray-100 rounded-md">{chat.answer}</p>
              </div>
            ))}
            {loading && <p className="text-blue-600">Generating response...</p>}
          </div>

          {/* Quick Topics */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Basketball", "Machine Learning", "Personal Finance", "U.S. History"].map((topic) => (
              <button
                key={topic}
                onClick={() => setQuestion(topic)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow-md hover:bg-gray-300"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
