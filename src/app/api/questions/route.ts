import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { amount, topic, type, difficulty } = getQuestionsSchema.parse(body);

    const mcqPromptMap = {
      basic: `Generate a simple and beginner-friendly multiple choice question about ${topic}. Use common terms. Answers should be short (max 15 words).`,
      intermediate: `Generate a moderately challenging multiple choice question about ${topic}. Test conceptual understanding. Answers should be concise (max 15 words).`,
      expert: `Generate a complex, expert-level multiple choice question about ${topic}. Encourage deep thinking. Keep each answer max 15 words.`,
    };

    const openEndedPromptMap = {
      basic: `Generate a beginner-friendly open-ended question about ${topic}. Keep it clear and short. Answer in max 15 words.`,
      intermediate: `Generate a moderately challenging open-ended question about ${topic}. Keep the answer under 15 words.`,
      expert: `Generate an expert-level open-ended question about ${topic}. It should be analytical. Answer in max 15 words.`,
    };

    let questions: any;

    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that generates open-ended questions and answers. Store in a JSON array.",
        new Array(amount).fill(openEndedPromptMap[difficulty]),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that generates MCQ questions with short answers and options. Store in a JSON array.",
        new Array(amount).fill(mcqPromptMap[difficulty]),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }

    return NextResponse.json(
      { questions },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
