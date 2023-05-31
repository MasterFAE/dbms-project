import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.query.count) {
        const result = await query({ query: "SELECT COUNT(*) FROM user" });
        if (!result) return res.status(404).json({ message: "No users found" });
        return res.status(200).json(result[0]["COUNT(*)"]);
      } else {
        const result = await query({ query: "SELECT * FROM user" });
        if (!result) return res.status(404).json({ message: "No users found" });
        return res.status(200).json(result);
      }
  }
}
