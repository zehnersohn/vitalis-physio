const VALID_STATES = ["answered", "forwarded", "abandoned"];
const VALID_TOPICS = ["physiotherapie", "termin", "naturheilkunde", "sonstig", null, undefined];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { session_id, end_state, error_flag, topic } = req.body;

  if (!session_id || !/^[0-9a-f-]{36}$/.test(session_id)) {
    return res.status(400).json({ error: "Invalid session_id" });
  }
  if (!VALID_STATES.includes(end_state)) {
    return res.status(400).json({ error: "Invalid end_state" });
  }
  if (topic !== undefined && topic !== null && !VALID_TOPICS.includes(topic)) {
    return res.status(400).json({ error: "Invalid topic" });
  }

  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/chat_sessions?id=eq.${session_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":  "application/json",
          "apikey":         process.env.SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Prefer":         "return=minimal",
        },
        body: JSON.stringify({
          ended_at:   new Date().toISOString(),
          end_state:  end_state,
          error_flag: error_flag === true,
          topic:      topic || null,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Supabase log-end error:", err);
      return res.status(500).json({ error: "DB update failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("log-end exception:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
