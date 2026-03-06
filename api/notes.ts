import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

function json(res: VercelResponse, status: number, data: any) {
  res.status(status).setHeader("Content-Type", "application/json").send(data);
}

function normalizeName(name: unknown) {
  const s = (typeof name === "string" ? name : "").trim();
  if (!s) return "익명";
  return s.slice(0, 20);
}

function normalizeContent(content: unknown) {
  const s = (typeof content === "string" ? content : "").trim();
  return s.slice(0, 500); // 길이 제한(원하면 조절)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      // 페이지네이션: ?cursor=created_at(ms)&limit=30
      const limit = Math.min(
        parseInt(String(req.query.limit ?? "30"), 10) || 30,
        50
      );
      const cursor = req.query.cursor ? Number(req.query.cursor) : null;

      const sql = cursor
        ? "SELECT id, name, content, color, created_at FROM notes WHERE created_at < ? ORDER BY created_at DESC LIMIT ?"
        : "SELECT id, name, content, color, created_at FROM notes ORDER BY created_at DESC LIMIT ?";

      const args = cursor ? [cursor, limit] : [limit];
      const rs = await client.execute({ sql, args });

      const rows = rs.rows.map((r: any) => ({
        id: String(r.id),
        name: String(r.name),
        content: String(r.content),
        color: r.color == null ? null : String(r.color),
        created_at: Number(r.created_at),
      }));

      const nextCursor = rows.length ? rows[rows.length - 1].created_at : null;

      return json(res, 200, { ok: true, rows, nextCursor });
    }

    if (req.method === "POST") {
      const name = normalizeName(req.body?.name);
      const content = normalizeContent(req.body?.content);

      if (!content)
        return json(res, 400, { ok: false, error: "내용을 입력해줘!" });

      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

      const createdAt = Date.now();

      await client.execute({
        sql: "INSERT INTO notes (id, name, content, created_at) VALUES (?, ?, ?, ?)",
        args: [id, name, content, createdAt],
      });

      return json(res, 200, {
        ok: true,
        note: { id, name, content, created_at: createdAt },
      });
    }

    return json(res, 405, { ok: false, error: "Method Not Allowed" });
  } catch (err: any) {
    console.error(err);
    return json(res, 500, { ok: false, error: "Server error" });
  }
}
