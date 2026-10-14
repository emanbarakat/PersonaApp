const OpenAI = require("openai");
const { openAIApiKey } = require("../config/env");

function getClient() {
  if (!openAIApiKey) {
    const error = new Error(
      "OPENAI_API_KEY is missing. Add it to your .env file before generating content."
    );
    error.status = 500;
    throw error;
  }

  return new OpenAI({ apiKey: openAIApiKey });
}

async function generateContent({
  inputText,
  persona,
  model,
  audience,
  length,
  context
}) {
  const openai = getClient();
  const startTime = Date.now();

  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `You are a ${persona} writing for ${audience}. Context: ${context.join(", ")}`
      },
      {
        role: "user",
        content: inputText
      }
    ],
    max_tokens: length
  });

  return {
    title: "Generated Content",
    body: response.choices[0].message.content,
    style: persona,
    citations: [],
    moderation_flags: "",
    tokens: {
      prompt: response.usage?.prompt_tokens ?? null,
      completion: response.usage?.completion_tokens ?? null
    },
    latency_ms: Date.now() - startTime,
    cost_est: 0.0031
  };
}

module.exports = {
  generateContent
};
