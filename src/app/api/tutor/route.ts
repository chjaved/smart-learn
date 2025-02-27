import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, level } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY; // Securely access API key

    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: `You are a tutor. Explain ${question} for a ${level} student in a clear and engaging way.` },
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch response from DeepSeek");
    }

    return NextResponse.json({ answer: data.choices[0]?.message?.content.trim() });

  } catch (error) {
    console.error("DeepSeek API error:", error);
    return NextResponse.json({ error: "Error fetching response from DeepSeek." }, { status: 500 });
  }
}
