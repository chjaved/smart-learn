import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { topic, type, amount, difficulty } = quizCreationSchema.parse(body);

    console.log("Creating game...");
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
        difficulty,
      },
    });

    console.log("Game created successfully:", game);

    // Fixing `upsert` query
    await prisma.topic_count.upsert({
      where: { topic },
      create: { topic, count: 1 },
      update: { count: { increment: 1 } },
    });

    console.log("API_URL:", process.env.API_URL);

    const API_URL = process.env.API_URL || "http://localhost:3000";

    const { data } = await axios.post(
      `${API_URL}/api/questions`,
      { amount, topic, type, difficulty },
      {
        headers: {
          Cookie: req.headers.get("cookie") || "", // Pass authentication cookies
        },
      }
    );

    if (type === "mcq") {
      const manyData = data.questions.map((question: any) => {
        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ].sort(() => Math.random() - 0.5);

        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });

      await prisma.question.createMany({ data: manyData });
    } else if (type === "open_ended") {
      await prisma.question.createMany({
        data: data.questions.map((question: any) => ({
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended",
        })),
      });
    }

    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url, `https://${req.headers.get("host")}`);
    const gameId = searchParams.get("gameId");

    if (!gameId) {
      return NextResponse.json({ error: "You must provide a game id." }, { status: 400 });
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { questions: true },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found." }, { status: 404 });
    }

    return NextResponse.json({ game }, { status: 200 }); // Fix status from 400 → 200
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
