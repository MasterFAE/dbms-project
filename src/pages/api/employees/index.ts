import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const data = await query({
        query:
          "SELECT firstName,lastName,employee_id FROM employee WHERE department_id = 0 AND role = ? ORDER BY employee_id DESC ",
        values: ["WORKER"],
      });
      return res.status(200).json(data);
  }
}
