import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: any,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 0.7,
  num_tries: number = 3,
  verbose: boolean = false
): Promise<{ question: string; answer: string }[]> {
  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature,
          messages: [
            { role: "system", content: system_prompt },
            { role: "user", content: user_prompt.toString() },
          ],
          stream: true, // ✅ Streaming enabled
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      // ✅ FIX: Ensure 'reader' is defined before reading the response
      const reader = response.body ? response.body.getReader() : null;
      if (!reader) {
        throw new Error("Failed to read response stream from OpenAI API.");
      }

      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }

      if (verbose) {
        console.log("GPT response:", result);
      }

      const output = JSON.parse(result);
      return output;
    } catch (e) {
      error_msg = `\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
    }
  }

  return [];
}
