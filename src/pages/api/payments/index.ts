import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      if (req.query.type == "income") {
        data = await query({
          query:
            "SELECT SUM(cost) as total FROM payment WHERE type = 'USAGE' AND status = 'COMPLETED' ",
        });
      } else {
        // data = await query({
        //   query:
        //     "SELECT * FROM employee JOIN department ON `department`.`department_id` = `employee`.`department_id` ORDER BY employee_id DESC ",
        // });
      }

      return res.status(200).json(data);
  }
}
