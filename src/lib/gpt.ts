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
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
): Promise<
  {
    question: string;
    answer: string;
  }[]
> {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output the following in JSON format: ${JSON.stringify(
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it.`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate a list of JSON, one JSON for each input element.`;
    }

    try {
      const response = await openai.chat.completions.create({
        model,
        temperature,
        messages: [
          {
            role: "system",
            content: system_prompt + output_format_prompt + error_msg,
          },
          { role: "user", content: user_prompt.toString() },
        ],
      });

      if (!response.choices || response.choices.length === 0 || !response.choices[0].message) {
        throw new Error("Invalid response from OpenAI");
      }

      const messageContent = response.choices[0]?.message?.content ?? "";
      let res: string = messageContent.replace(/'/g, '"');

      res = res.replace(/(\w)"(\w)/g, "$1'$2");

      if (verbose) {
        console.log("System prompt:", system_prompt + output_format_prompt + error_msg);
        console.log("\nUser prompt:", user_prompt);
        console.log("\nGPT response:", res);
      }

      let output: any = JSON.parse(res);
      if (list_input && !Array.isArray(output)) {
        throw new Error("Output format not in a list of JSON");
      }

      output = list_input ? output : [output];

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;
          if (!(key in output[index])) throw new Error(`${key} not in JSON output`);

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) output[index][key] = output[index][key][0];
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) output[index] = output[index][0];
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
    }
  }

  return [];
}
