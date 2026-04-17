const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function extractEvent(text) {
    try {
        const prompt = `
Extract structured JSON from the input.

Format:
{
  "event_type": "",
  "company": "",
  "date": "",
  "checklist": ["item1", "item2", "item3"]
}

Rules:
- checklist MUST have 3 to 5 items
- Items must be practical and relevant
- No empty arrays
- No explanation

Text:
"${text}"
`;

        const res = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.2
            },
            {
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const output = res.data.choices[0].message.content;

        return JSON.parse(output);

    } catch (err) {
        console.log("AI ERROR:", err.message);
        return null;
    }
}

module.exports = { extractEvent };