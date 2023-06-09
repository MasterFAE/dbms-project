import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";
import { Trip } from "~/types/trips";

export default async function handler(req, res) {
  let data;
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      data = await query({
        query: "SELECT * FROM user WHERE user_id = ?",
        values: [+id],
      });
      return res.status(200).json(data);

    case "DELETE":
      data = await query({
        query: "DELETE FROM user WHERE user_id = ?",
        values: [+id],
      });
      return res.status(200).json({ message: "OK." });
  }
}
