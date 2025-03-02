import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/forms/QuizCreation";
import Footer from "@/components/Footer"; // Import Footer Component

export const metadata = {
  title: "Quiz | Smart Learn",
  description: "Quiz yourself on anything!",
};

interface Props {
  searchParams: { topic?: string };
}

const Quiz = async ({ searchParams }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

    const topic = searchParams?.topic ?? ""; 

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <QuizCreation topic={topic} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Quiz;
