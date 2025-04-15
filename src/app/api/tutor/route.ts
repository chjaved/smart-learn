// In your route.ts file
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { prisma } from "@/lib/db";

// This POST handler stores the chat, which you already have
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { question, level } = await req.json();

    if (!question || !level) {
      return NextResponse.json({ error: "Question and level are required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key is missing." }, { status: 500 });
    }

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a tutor. Explain this topic for a ${level} student in a clear and engaging way.`,
          },
          {
            role: "user",
            content: question,
          },
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices?.[0]?.message?.content) {
      throw new Error(data?.error?.message || "Failed to get valid response from OpenAI.");
    }

    const answer = data.choices[0].message.content.trim();

    // Store chat in DB if user is logged in
    let chat = null;
    if (session?.user?.email) {
      chat = await prisma.chat.create({
        data: {
          question,
          answer,
          user: { connect: { email: session.user.email } },
        },
      });
    }

    return NextResponse.json({ answer, chat });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("OpenAI API error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// This GET handler fetches the user's chats
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const chats = await prisma.chat.findMany({
      where: {
        user: { email: session.user.email }, // Fetch chats specific to the logged-in user
      },
      orderBy: {
        createdAt: 'desc', // Sort chats by most recent first
      },
    });

    return NextResponse.json(chats);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error fetching chats:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
