import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      if (req.query.department_id) {
        data = await query({
          query:
            "SELECT firstName,lastName,employee_id FROM employee WHERE department_id = ? AND role = ? ORDER BY employee_id DESC ",
          values: [+req.query.department_id, "WORKER"],
        });
      } else {
        data = await query({
          query:
            "SELECT * FROM employee JOIN department ON `department`.`department_id` = `employee`.`department_id` ORDER BY employee_id DESC ",
        });
      }

      return res.status(200).json(data);

    case "PUT":
      const {
        firstName,
        lastName,
        ssn,
        salary,
        role,
        department_id,
        employee_id,
      } = JSON.parse(req.body);

      data = await query({
        query:
          "UPDATE employee SET department_id = ?, firstName = ?, lastName = ?, ssn = ?, salary = ?, role = ? WHERE employee_id = ?",
        values: [
          department_id,
          firstName,
          lastName,
          ssn,
          salary,
          role,
          employee_id,
        ],
      });
      return res.status(200).json(data);
  }
}
