"use client"; // Mark this as a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const AiTutor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New: Track auth status
  const router = useRouter();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // New: Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.isAuthenticated); // Expect API to return { isAuthenticated: true/false }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Function to handle button click and navigate accordingly
  const handleTryTutorNowClick = () => {
    if (isAuthenticated) {
      router.push("/TutorHome"); // If authenticated, go to TutorHome
    } else {
      router.push("/SignIn"); // Otherwise, redirect to Signin page
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8">AI Tutor</h1>

        {/* AI Tutor Introduction */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Real-Time AI Assistance</h2>
          <p className="text-lg text-gray-700 mt-4">
            Our AI Tutor module provides personalized, on-demand support to students. Whether you're learning a new topic, need help with a difficult problem, or want to understand a concept better, our AI Tutor is here to assist you.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            With advanced algorithms and real-time feedback, the AI Tutor adapts to your learning pace and needs, offering tailored explanations and guidance.
          </p>
        </section>

        {/* Benefits of AI Tutor */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">24/7 Availability</h3>
            <p className="text-gray-600 text-center mt-2">
              Get help anytime, anywhere, without any delays. The AI Tutor is available 24/7 to assist with your learning needs.
            </p>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">Personalized Learning</h3>
            <p className="text-gray-600 text-center mt-2">
              The AI Tutor adapts to your learning style and pace, ensuring a customized learning experience that fits your needs.
            </p>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">Instant Feedback</h3>
            <p className="text-gray-600 text-center mt-2">
              Receive real-time feedback on your answers, helping you understand your mistakes and improve quickly.
            </p>
          </div>
        </section>

        {/* Technologies Behind AI Tutor */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-4">Technologies Used</h2>
          <div className="text-center text-gray-700">
            <p>
              Our AI Tutor uses a blend of advanced technologies to deliver efficient, accurate, and personalized learning experiences:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-center">Natural Language Processing (NLP)</h3>
              <p className="text-gray-600 text-center mt-2">
                The AI Tutor uses NLP algorithms to understand and process student queries, enabling meaningful interactions.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-center">Machine Learning</h3>
              <p className="text-gray-600 text-center mt-2">
                Machine learning algorithms allow the AI Tutor to improve over time, personalizing responses based on student data.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-center">Data Analytics</h3>
              <p className="text-gray-600 text-center mt-2">
                AI Tutor analyzes student data to offer targeted advice, tips, and learning materials based on performance.
              </p>
            </div>
          </div>
        </section>

        {/* AI Tutor Demo Button */}
        <section className="text-center">
          <button
            onClick={handleTryTutorNowClick}
            className="px-6 py-2 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Try the AI Tutor Now
          </button>
        </section>

        {/* Modal for AI Tutor Demo */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">AI Tutor Demo</h3>
              <p className="text-lg text-gray-700">
                Here, you can interact with the AI Tutor. Ask any question, and the tutor will respond with real-time feedback and guidance. 
              </p>
              <div className="mt-4">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700"
                >
                  Close Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AiTutor;
