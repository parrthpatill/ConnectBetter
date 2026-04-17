const db = require("../db");
const { extractEvent } = require("../services/aiService");

async function processEvent(req, res) {
    const { text } = req.body;
    const user_id = req.user.id;

    if (!text) {
        return res.status(400).json({ msg: "Text required" });
    }

    const aiData = await extractEvent(text);

    if (!aiData) {
        return res.status(500).json({ msg: "AI failed" });
    }

    try {
        await db.query(
            "INSERT INTO ai_logs (user_id, input_text, ai_response) VALUES ($1, $2, $3)",
            [user_id, text, aiData]
        );

        res.json(aiData);

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "DB error" });
    }
}

module.exports = { processEvent };