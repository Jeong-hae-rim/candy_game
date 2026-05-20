import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@libsql/client";

export const config = { runtime: "nodejs" };

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

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const result = await client.execute({
        sql: `
          SELECT name, score, created_at
          FROM candy_rankings_test
          ORDER BY score DESC, created_at ASC
          LIMIT 10
        `,
      });

      return ok(res, result.rows);
    } catch (error) {
      console.error(error);
      return bad(res, 500, "랭킹을 불러오지 못했습니다.");
    }
  }

  if (req.method === "POST") {
    try {
      const { name, score } = req.body;

      if (!name || typeof name !== "string" || name.length > 12) {
        return bad(res, 400, "닉네임은 1~12자로 입력해 주세요.");
      }

      if (!Number.isInteger(score) || score < 0) {
        return bad(res, 400, "잘못된 점수입니다.");
      }

      await client.execute({
        sql: `
          INSERT INTO candy_rankings_test (name, score)
          VALUES (?, ?)
        `,
        args: [name.trim(), score],
      });

      return ok(res, { ok: true });
    } catch (error) {
      console.error(error);
      return bad(res, 500, "점수를 저장하지 못했습니다.");
    }
  }

  return bad(res, 405, "허용되지 않은 요청입니다.");
}
