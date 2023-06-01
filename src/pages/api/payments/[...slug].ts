import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "PUT":
      const { amount } = req.body;
      if (req.query.slug[1] == "deposit") {
        await query({
          query:
            "INSERT INTO payment (createdAt, cost, type, status,card_id) VALUES (CURDATE(), ?, 'DEPOSIT', 'COMPLETED', ?)",
          values: [+amount, +req.query.slug[0]],
        });

        data = await query({
          query: "UPDATE card SET balance = balance + ? WHERE card_id = ?",
          values: [+amount, +req.query.slug[0]],
        });
      }
      return res.status(200).json(data);
  }
}
