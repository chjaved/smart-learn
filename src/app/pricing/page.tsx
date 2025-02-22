"use client"; // Add this to mark this page as a client component

import { useState } from "react";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>

      {/* Introduction to Pricing Page */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold">Choose the Best Plan for You</h2>
        <p className="text-lg text-gray-700 mt-4">
          We offer flexible pricing plans to fit your needs, whether you're an individual learner or part of a larger organization. Choose a plan that suits you best.
        </p>
      </section>

      {/* Pricing Table */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-center">Basic Plan</h3>
          <p className="text-lg text-center mt-2 text-gray-600">Free</p>
          <ul className="text-gray-700 mt-4">
            <li>Access to core features</li>
            <li>Limited content per month</li>
            <li>No AI Tutor access</li>
          </ul>
          <div className="mt-6 text-center">
            <button
              onClick={() => handlePlanSelection("Basic")}
              className="px-6 py-2 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Select Plan
            </button>
          </div>
        </div>

        <div className="p-6 bg-blue-200 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-center">Standard Plan</h3>
          <p className="text-lg text-center mt-2 text-gray-600">$19.99/month</p>
          <ul className="text-gray-700 mt-4">
            <li>Access to all features</li>
            <li>AI Tutor with limited queries</li>
            <li>Customizable quizzes</li>
          </ul>
          <div className="mt-6 text-center">
            <button
              onClick={() => handlePlanSelection("Standard")}
              className="px-6 py-2 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Select Plan
            </button>
          </div>
        </div>

        <div className="p-6 bg-blue-300 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-center">Premium Plan</h3>
          <p className="text-lg text-center mt-2 text-gray-600">$39.99/month</p>
          <ul className="text-gray-700 mt-4">
            <li>Unlimited access to all features</li>
            <li>Unlimited AI Tutor usage</li>
            <li>Priority support</li>
            <li>Advanced analytics</li>
          </ul>
          <div className="mt-6 text-center">
            <button
              onClick={() => handlePlanSelection("Premium")}
              className="px-6 py-2 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Select Plan
            </button>
          </div>
        </div>
      </section>

      {/* Selected Plan Details */}
      <section className="mt-12">
        {selectedPlan && (
          <div className="p-8 bg-gray-100 rounded-lg shadow-lg text-center">
            <h3 className="text-3xl font-semibold">You selected the {selectedPlan} Plan</h3>
            <p className="text-lg text-gray-600 mt-4">
              Thank you for choosing the {selectedPlan} Plan! You can now start enjoying the benefits of your selected subscription.
            </p>
            <button
              onClick={() => setSelectedPlan("")}
              className="mt-6 px-6 py-2 text-lg text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition"
            >
              Reset Selection
            </button>
          </div>
        )}
      </section>

      {/* Subscription FAQ */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold">What is the difference between the Standard and Premium Plans?</h4>
            <p className="text-gray-600 mt-2">
              The Standard Plan provides access to all features with limited AI Tutor usage, while the Premium Plan gives you unlimited access to all features, including the AI Tutor, and priority support.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Can I switch plans later?</h4>
            <p className="text-gray-600 mt-2">
              Yes! You can switch between plans at any time from your account settings.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Is there a free trial?</h4>
            <p className="text-gray-600 mt-2">
              We currently do not offer a free trial, but you can start with the Basic Plan at no cost to explore the core features.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;
