import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      data = await query({
        query: "SELECT * FROM card",
      });

      return res.status(200).json(data);
  }
}
