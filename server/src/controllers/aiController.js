const db = require("../db");
const { extractEvent } = require("../services/aiService");
const { askAssistant } = require("../services/aiAssistant");


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

async function suggestFriends(req, res) {
  try {
    const { eventId } = req.params;

    // 1. Get event
    const eventRes = await db.query(
      "SELECT * FROM events WHERE id = $1",
      [eventId]
    );

    const event = eventRes.rows[0];

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // 2. Get friends
    const friendsRes = await db.query(`
      SELECT u.id, u.name
      FROM users u
      JOIN friend_requests f
      ON (f.sender_id = u.id OR f.receiver_id = u.id)
      WHERE (f.sender_id = $1 OR f.receiver_id = $1)
      AND f.status = 'accepted'
      AND u.id != $1
    `, [req.user.id]);

    const friends = friendsRes.rows;

    // 3. AI prompt
    const prompt = `
Event: ${event.description}
Type: ${event.event_type}

Friends:
${JSON.stringify(friends)}

Suggest top 3 friends to notify.
Return JSON array with user_id and reason.
`;

    const aiRes = await askAssistant(prompt);

    const parsed = JSON.parse(aiRes);

    // 4. Save log
    await db.query(
      `INSERT INTO ai_logs (user_id, feature_type, response)
       VALUES ($1, 'assistant_friends', $2)`,
      [req.user.id, parsed]
    );

    res.json(parsed);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "AI error" });
  }
};

async function prepTips(req, res) {
  try {
    const { eventId } = req.params;

    const eventRes = await db.query(
      "SELECT * FROM events WHERE id=$1",
      [eventId]
    );

    const event = eventRes.rows[0];

    const prompt = `
Event Type: ${event.event_type}
Description: ${event.description}

Give preparation tips.

Return JSON:
{
  "tips": [],
  "resources": []
}
`;

    const aiRes = await askAssistant(prompt);
    const parsed = JSON.parse(aiRes);

    await db.query(
      `INSERT INTO ai_logs (user_id, feature_type, response)
       VALUES ($1, 'assistant_tips', $2)`,
      [req.user.id, parsed]
    );

    res.json(parsed);

  } catch (err) {
    res.status(500).json({ msg: "AI error" });
  }
};


async function schedulePlan(req, res) {
  try {
    const { eventId } = req.params;

    const eventRes = await db.query(
      "SELECT * FROM events WHERE id=$1",
      [eventId]
    );

    const event = eventRes.rows[0];

    const prompt = `
Event Date: ${event.date}
Today: ${new Date()}

Create preparation schedule.

Return JSON:
{
  "schedule": [
    { "day": "", "task": "" }
  ]
}
`;

    const aiRes = await askAssistant(prompt);
    const parsed = JSON.parse(aiRes);

    await db.query(
      `INSERT INTO ai_logs (user_id, feature_type, response)
       VALUES ($1, 'assistant_schedule', $2)`,
      [req.user.id, parsed]
    );

    res.json(parsed);

  } catch (err) {
    res.status(500).json({ msg: "AI error" });
  }
};

module.exports = {
  processEvent,
  suggestFriends,
  prepTips,
  schedulePlan
};