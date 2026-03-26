export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { session_id } = req.body;

  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "session_id required" });
  }
  if (!/^[0-9a-f-]{36}$/.test(session_id)) {
    return res.status(400).json({ error: "Invalid session_id format" });
  }

  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/chat_sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "apikey":         process.env.SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Prefer":         "return=minimal",
        },
        body: JSON.stringify({
          id:         session_id,
          started_at: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Supabase log-start error:", err);
      return res.status(500).json({ error: "DB insert failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("log-start exception:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
