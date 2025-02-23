"use client"; // Mark this as a client component

import { useState } from "react";
import Footer from "@/components/Footer"; // Import Footer Component

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="p-8 mx-auto max-w-7xl flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>

        {/* Introduction to Pricing Page */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Choose the Best Plan for You</h2>
          <p className="text-lg text-gray-700 mt-4">
            We offer flexible pricing plans to fit your needs, whether you're an individual learner or part of a larger organization.
          </p>
        </section>

        {/* Pricing Table */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Basic", price: "Free", features: ["Access to core features", "Limited content per month", "No AI Tutor access"] },
            { name: "Standard", price: "$19.99/month", features: ["Access to all features", "AI Tutor with limited queries", "Customizable quizzes"] },
            { name: "Premium", price: "$39.99/month", features: ["Unlimited access to all features", "Unlimited AI Tutor usage", "Priority support", "Advanced analytics"] },
          ].map((plan) => (
            <div key={plan.name} className="p-6 bg-blue-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-center">{plan.name} Plan</h3>
              <p className="text-lg text-center mt-2 text-gray-600">{plan.price}</p>
              <ul className="text-gray-700 mt-4">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <button
                  onClick={() => handlePlanSelection(plan.name)}
                  className="px-6 py-2 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Selected Plan Details */}
        {selectedPlan && (
          <section className="mt-12 p-8 bg-gray-100 rounded-lg shadow-lg text-center">
            <h3 className="text-3xl font-semibold">You selected the {selectedPlan} Plan</h3>
            <p className="text-lg text-gray-600 mt-4">
              Thank you for choosing the {selectedPlan} Plan! You can now start enjoying the benefits.
            </p>
            <button
              onClick={() => setSelectedPlan("")}
              className="mt-6 px-6 py-2 text-lg text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition"
            >
              Reset Selection
            </button>
          </section>
        )}

        {/* Subscription FAQ */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: "What is the difference between Standard and Premium?", answer: "Standard provides limited AI Tutor usage, while Premium gives unlimited access and priority support." },
              { question: "Can I switch plans later?", answer: "Yes! You can switch between plans anytime from your account settings." },
              { question: "Is there a free trial?", answer: "We don't offer a free trial, but you can start with the Basic Plan at no cost." },
            ].map((faq) => (
              <div key={faq.question}>
                <h4 className="text-xl font-semibold">{faq.question}</h4>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PricingPage;
