import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.query.count) {
        const result = await query({ query: "SELECT COUNT(*) FROM vehicle" });
        if (!result)
          return res.status(404).json({ message: "No vehicle found" });
        return res.status(200).json(result[0]["COUNT(*)"]);
      }

      if (req.query.type) {
        const data = await query({
          query: "SELECT * FROM vehicle WHERE type = ? ORDER BY vehicle_id ",
          values: [req.query.type],
        });
        return res.status(200).json(data);
      } else {
        const data = await query({
          query: "SELECT * FROM vehicle ORDER BY vehicle_id",
        });
        return res.status(200).json(data);
      }
  }
}
