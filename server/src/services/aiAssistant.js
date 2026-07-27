const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY_ASSISTANT
});

async function askAssistant(prompt) {
  const res = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt + "\nONLY return JSON. No explanation."
      }
    ],
    temperature: 0.7
  });

  return res.choices[0].message.content;
};

module.exports = { askAssistant }
