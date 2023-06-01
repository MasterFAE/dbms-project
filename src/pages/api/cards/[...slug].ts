import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      data = await query({
        query: "SELECT * FROM card WHERE user_id = ?",
        values: [+req.query.slug[0]],
      });
      return res.status(200).json(data);
    case "POST":
      if (req.query.slug[1] == "renew") {
        await query({
          query:
            "UPDATE card SET renewedAt = CURDATE(), renewalAt = DATE_ADD(CURDATE(), INTERVAL 1 YEAR) WHERE card_id = ?",
          values: [+req.query.slug[0]],
        });
        data = await query({
          query: "SELECT * FROM card WHERE card_id = ?",
          values: [+req.query.slug[0]],
        });
      } else if (req.query.slug[1] == "new") {
        data = await query({
          query:
            "INSERT INTO card (createdAt, renewedAt, renewalAt, user_id, balance, type) VALUES (CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR), ?, 0, 'NORMAL')",
          values: [+req.query.slug[0]],
        });
      }
      return res.status(200).json(data);
  }
}
