import OpenEnded from "@/components/OpenEnded";
import Footer from "@/components/Footer"; // Import Footer Component
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });

  if (!game || game.gameType === "mcq") {
    return redirect("/quiz");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <OpenEnded game={game} />
      </main>
      <Footer />
    </div>
  );
};

export default OpenEndedPage;
