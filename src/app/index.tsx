"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleAIButtonClick = () => {
    router.push("/aitutor"); // Navigate to the AI Tutor screen
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
      <div className="text-center max-w-3xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="LlamaTutor Logo"
            className="w-12 h-12 mb-2"
          />
          <h1 className="text-5xl font-bold text-gray-900">
            Your Personal <span className="text-blue-600">Tutor</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Enter a topic you want to learn about along with the education level
            you want to be taught at, and generate a personalized tutor tailored
            to you!
          </p>
        </div>

        {/* Input Section */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          <input
            type="text"
            placeholder="Teach me about..."
            className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Middle School</option>
            <option>High School</option>
            <option>Undergraduate</option>
            <option>Graduate</option>
          </select>
          <button
            onClick={handleAIButtonClick}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            →
          </button>
        </div>

        {/* Quick Topics */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="px-4 py-2 bg-red-100 text-red-600 rounded-full shadow-md hover:bg-red-200">
            🏀 Basketball
          </button>
          <button className="px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full shadow-md hover:bg-yellow-200">
            🤖 Machine Learning
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-600 rounded-full shadow-md hover:bg-green-200">
            💰 Personal Finance
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full shadow-md hover:bg-blue-200">
            🇺🇸 U.S. History
          </button>
        </div>
      </div>
    </main>
  );
}
