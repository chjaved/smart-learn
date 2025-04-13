import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 0.7,
  num_tries: number = 2,
  verbose: boolean = false
): Promise<{ question: string; answer: string }[] | null> {
  const list_input = Array.isArray(user_prompt);
  const dynamic_elements = /<.*?>/.test(JSON.stringify(output_format));
  const list_output = /\[.*?\]/.test(JSON.stringify(output_format));

  let output_format_prompt = `
    You are to output the following in JSON format: ${JSON.stringify(output_format)}.
    Do not put extra quotation marks or escape characters.
  `;

  if (list_output) output_format_prompt += ` If a field is a list, classify it into the best element.`;
  if (dynamic_elements) output_format_prompt += ` Text enclosed by < and > indicates dynamic content.`;
  if (list_input) output_format_prompt += ` Generate a list of JSON objects, one for each input.`;

  for (let i = 0; i < num_tries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model,
        temperature,
        messages: [
          { role: "system", content: system_prompt + output_format_prompt },
          { role: "user", content: Array.isArray(user_prompt) ? user_prompt.join("\n") : user_prompt },
        ],
      });

      const raw = response.choices[0]?.message?.content?.trim();

      if (verbose) {
        console.log("System prompt:", system_prompt + output_format_prompt);
        console.log("User prompt:", user_prompt);
        console.log("GPT raw response:", raw);
      }

      if (!raw || (!raw.startsWith("{") && !raw.startsWith("["))) {
        throw new Error("GPT returned empty or invalid JSON format");
      }

      let output = JSON.parse(raw);

      if (list_input && !Array.isArray(output)) throw new Error("Expected array of JSON objects but got non-array.");
      if (!list_input) output = [output];

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;

          if (!(key in output[index])) {
            throw new Error(`Missing key "${key}" in GPT response`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) output[index][key] = output[index][key][0];
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (typeof output[index][key] === "string" && output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]).length === 1
            ? output[index][Object.keys(output[index])[0]]
            : Object.values(output[index]);
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      console.error("strict_output exception:", e);
    }
  }

  return null; // This tells your API handler it failed
}
