"use client"; // Add this to mark this page as a client component

import { useState } from "react";

const Competitors = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

  const competitors = [
    {
      name: "Duolingo",
      contribution: "Gamified adaptive learning for language",
      tools: "AI, gamification",
      limitations: "Limited to simple language tasks",
      applications: "Language learning",
    },
    {
      name: "Khan Academy",
      contribution: "Adaptive quizzes and content recommendations",
      tools: "Machine learning, web platform",
      limitations: "No real-time personalized feedback",
      applications: "General education, K-12",
    },
    {
      name: "ALEKS",
      contribution: "Knowledge space-based learning paths",
      tools: "Knowledge space theory, assessment algorithms",
      limitations: "No real-time feedback or interactive support",
      applications: "K-12 education, math and science support",
    },
    {
      name: "Coursera",
      contribution: "Course recommendations based on user preferences",
      tools: "Machine learning, recommendation algorithms",
      limitations: "Limited content personalization within courses",
      applications: "Higher education, professional development",
    },
    {
      name: "Smart Sparrow",
      contribution: "Adaptive learning paths for higher education",
      tools: "Data-driven algorithms, adaptive learning",
      limitations: "Lacks real-time AI tutoring",
      applications: "Higher education, professional training",
    },
  ];

  const handleSelectCompetitor = (competitorName: string) => {
    setSelectedCompetitor(competitorName);
  };

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8">Our Competitors</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-4">How We Compare</h2>
        <div className="text-center text-gray-700 mb-8">
          <p>
            Here is a comparison of the top competitors in the education technology space. Each offers unique
            features and functionalities, but we believe our platform excels in areas that others don't yet address.
          </p>
        </div>

        {/* Competitor List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitors.map((competitor) => (
            <div
              key={competitor.name}
              className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectCompetitor(competitor.name)}
            >
              {/* Competitor Icon */}
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <i className="fas fa-cogs text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">{competitor.name}</h3>
              <p className="text-gray-600 text-center">Click to see more details</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Competitor Details */}
      {selectedCompetitor && (
        <section>
          <h2 className="text-3xl font-semibold text-center mb-4">
            Features of {selectedCompetitor}
          </h2>

          {/* Find the selected competitor's data */}
          {competitors
            .filter((competitor) => competitor.name === selectedCompetitor)
            .map((competitor) => (
              <div key={competitor.name} className="space-y-4">
                <div className="text-lg text-gray-700">
                  <strong>Contribution:</strong> {competitor.contribution}
                </div>
                <div className="text-lg text-gray-700">
                  <strong>Tools/Technologies:</strong> {competitor.tools}
                </div>
                <div className="text-lg text-gray-700">
                  <strong>Limitations:</strong> {competitor.limitations}
                </div>
                <div className="text-lg text-gray-700">
                  <strong>Applications:</strong> {competitor.applications}
                </div>
              </div>
            ))}
        </section>
      )}
    </main>
  );
};

export default Competitors;
