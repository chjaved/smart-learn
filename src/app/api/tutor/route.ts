import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { topic, level } = await req.json();

    if (!topic || !level) {
      return NextResponse.json({ error: "Missing topic or level" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: `Explain ${topic} for a ${level} student.` }],
    });

    return NextResponse.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
