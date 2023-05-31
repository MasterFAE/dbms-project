import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const data = await query({
        query:
          "SELECT * FROM route ORDER BY route_id DESC ",
      });
      return res.status(200).json(data);
  }
}
