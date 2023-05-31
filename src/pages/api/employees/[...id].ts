import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";
import { Trip } from "~/types/trips";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      if (req.query.id == "avgSalary") {
        data = await query({
          query: "SELECT AVG(salary) AS avgSalary FROM employee",
        });
      } else if (req.query.id == "maxSalary") {
        data = await query({
          query:
            "SELECT salary, firstName, lastName FROM employee ORDER BY salary DESC LIMIT 1",
        });
      }
      return res.status(200).json(data);

    case "DELETE":
      const { id } = req.query;

      data = await query({
        query: "DELETE FROM employee WHERE employee_id = ?",
        values: [+id],
      });
      return res.status(200).json({ message: "OK." });
  }
}
