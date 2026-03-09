import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

function ok(res: VercelResponse, data: any) {
  res.status(200).setHeader("Content-Type", "application/json").send(data);
}
function bad(res: VercelResponse, status: number, msg: string) {
  res
    .status(status)
    .setHeader("Content-Type", "application/json")
    .send({ ok: false, error: msg });
}

function normRoom(x: unknown) {
  const s = (typeof x === "string" ? x : "").trim();
  return (s || "YUMMYCHU").slice(0, 32);
}
function normName(x: unknown) {
  const s = (typeof x === "string" ? x : "").trim();
  return (s || "익명").slice(0, 20);
}
function normContent(x: unknown) {
  const s = (typeof x === "string" ? x : "").trim();
  return s.slice(0, 800);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const room = normRoom(req.query.room);
      const limit = Math.min(
        parseInt(String(req.query.limit ?? "20"), 10) || 20,
        50
      );
      const cursor = req.query.cursor ? Number(req.query.cursor) : null;

      const sql = cursor
        ? `SELECT id, room, name, content, created_at
           FROM rolling_notes
           WHERE room = ? AND created_at < ?
           ORDER BY created_at DESC
           LIMIT ?`
        : `SELECT id, room, name, content, created_at
           FROM rolling_notes
           WHERE room = ?
           ORDER BY created_at DESC
           LIMIT ?`;

      const args = cursor ? [room, cursor, limit] : [room, limit];
      const rs = await client.execute({ sql, args });

      const items = rs.rows.map((r: any) => ({
        id: String(r.id),
        room: String(r.room),
        name: String(r.name),
        content: String(r.content),
        created_at: Number(r.created_at),
      }));

      const nextCursor = items.length
        ? items[items.length - 1].created_at
        : null;
      const hasMore = items.length === limit;

      return ok(res, { ok: true, items, nextCursor, hasMore });
    }

    if (req.method === "POST") {
      const room = normRoom(req.body?.room);
      const name = normName(req.body?.name);
      const content = normContent(req.body?.content);

      if (!content) return bad(res, 400, "내용을 입력해줘!");

      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

      const created_at = Date.now();

      await client.execute({
        sql: `INSERT INTO rolling_notes (id, room, name, content, created_at)
              VALUES (?, ?, ?, ?, ?)`,
        args: [id, room, name, content, created_at],
      });

      return ok(res, {
        ok: true,
        item: { id, room, name, content, created_at },
      });
    }

    return bad(res, 405, "Method Not Allowed");
  } catch (e) {
    console.error(e);
    return bad(res, 500, "Server error");
  }
}
