"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaChalkboardTeacher,
  FaBrain,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleQuizClick = () => {
    if (session?.user) {
      router.push("/quiz");
    } else {
      router.push("SignIn");
    }
  };

  const handleTutorClick = () => {
    if (session?.user) {
      router.push("/TutorHome");
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* HERO SECTION */}
      <section className="text-center py-28 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Smart Learn 🚀
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your personal AI tutor and quiz creator. Learn smarter, faster, and better with real-time support.
        </motion.p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            onClick={handleQuizClick}
            className="bg-white text-blue-700 hover:bg-gray-100 font-medium px-6 py-2 rounded-xl shadow-sm"
          >
            Create a Quiz
          </Button>
          <Button
            onClick={handleTutorClick}
            className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2 rounded-xl"
          >
            Try AI Tutor Now!
          </Button>
        </div>
      </section>

      {/* FEATURES / ABOUT SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-14">Why Smart Learn?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[{
            Icon: FaChalkboardTeacher,
            title: "AI-Powered Quizzes",
            description: "Generate personalized quizzes instantly from any topic or subject."
          }, {
            Icon: FaRobot,
            title: "Real-Time AI Tutor",
            description: "Ask anything and get instant answers, explanations, and feedback."
          }, {
            Icon: FaBrain,
            title: "Smart Learning",
            description: "Track your growth, receive tailored guidance, and study effectively."
          }].map(({ Icon, title, description }, index) => (
            <motion.div
              key={title}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl text-center transition-transform transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Icon size={40} className="mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Thousands of Smart Learners</h2>
          <p className="text-lg mb-8">Start your journey with Smart Learn and unlock a better way to study today!</p>
          <Button
            onClick={handleTutorClick}
            className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-6 py-2 rounded-xl"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Meet the Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {["Alex", "Jordan", "Taylor"].map((name, idx) => (
            <motion.div
              key={name}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4" />
              <h3 className="font-semibold text-xl">{name}</h3>
              <p className="text-gray-500">Full Stack Developer</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Smart Learn</h2>
            <p className="text-gray-400">© 2025 Smart Learn. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-2xl mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400"><FaInstagram /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
