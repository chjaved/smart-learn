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
  temperature: number = 0.7, // Lowered for accuracy
  num_tries: number = 2, // Reduced to optimize API calls
  verbose: boolean = false
): Promise<{ question: string; answer: string }[]> {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let output_format_prompt: string = `
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

      let res = response.choices[0]?.message?.content?.trim() ?? "";

      if (verbose) {
        console.log("System prompt:", system_prompt + output_format_prompt);
        console.log("User prompt:", user_prompt);
        console.log("GPT response:", res);
      }

      // Ensure response is valid JSON
      if (!res.startsWith("{") && !res.startsWith("[")) throw new Error("Invalid JSON response");

      let output = JSON.parse(res);

      if (list_input && !Array.isArray(output)) throw new Error("Output must be a list of JSON objects.");
      if (!list_input) output = [output];

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue; // Skip dynamic keys

          if (!(key in output[index])) throw new Error(`${key} missing in JSON output`);

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) output[index][key] = output[index][key][0];
            if (!choices.includes(output[index][key]) && default_category) output[index][key] = default_category;
            if (output[index][key].includes(":")) output[index][key] = output[index][key].split(":")[0];
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]).length === 1 ? output[index][Object.keys(output[index])[0]] : Object.values(output[index]);
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      console.log("Exception occurred:", e);
    }
  }

  return [];
}
