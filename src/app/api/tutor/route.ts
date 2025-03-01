import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, level } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY; // Use OpenAI API Key

    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Using OpenAI's GPT model
        messages: [
          { role: "system", content: `You are a tutor. Explain ${question} for a ${level} student in a clear and engaging way.` },
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch response from OpenAI");
    }

    return NextResponse.json({ answer: data.choices[0]?.message?.content.trim() });

  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "Error fetching response from OpenAI." }, { status: 500 });
  }
}
