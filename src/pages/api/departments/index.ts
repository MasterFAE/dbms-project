import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      data = await query({
        query: `SELECT d.department_id, d.name, COUNT(e.employee_id) AS employee_count
        FROM department d
        LEFT JOIN employee e ON d.department_id = e.department_id
        GROUP BY d.department_id, d.name`,
      });

      return res.status(200).json(data);
  }
}
