import OpenAI from "openai";
import "dotenv/config";
import tools from "./tools.js";

export default async function assistant(userPrompt) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: userPrompt }],
    tools: tools,
    tool_choice: "auto",
  });

  const args = completion.choices[0].message.content
    ? completion.choices[0].message.content
    : JSON.parse(
        completion.choices[0].message.tool_calls[0].function.arguments
      );
  //   console.log(args);
  return args;
}
