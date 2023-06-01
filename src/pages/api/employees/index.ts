import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";
import argon2 from "argon2";
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
      } else if (req.query.type == "driver_ranking") {
        data = await query({
          query: `SELECT e.employee_id, e.firstName, e.lastName, t.total_trips 
              FROM (
                  SELECT employee_id, COUNT(*) AS total_trips
                  FROM trip
                  WHERE status = 'completed'
                  GROUP BY employee_id
              ) AS t 
              JOIN employee e ON e.employee_id = t.employee_id
              ORDER BY total_trips DESC LIMIT 20`,
        });
      } else {
        data = await query({
          query:
            "SELECT * FROM employee JOIN department ON `department`.`department_id` = `employee`.`department_id` ORDER BY employee_id DESC ",
        });
      }

      return res.status(200).json(data);
    case "POST":
      let {
        firstName: fn,
        lastName: ln,
        ssn: _ssn,
        salary: _salary,
        role: _role,
        department_id: _dep_id,
        gender: _gender,
      } = JSON.parse(req.body);
      const hashedPassword = await argon2.hash("test123");
      data = await query({
        query:
          "INSERT INTO employee (department_id, firstName, lastName, ssn, salary, role, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
          _dep_id,
          fn,
          ln,
          _ssn,
          _salary,
          _role,
          _gender,
          hashedPassword,
        ],
      });
      return res.status(200).json(data);

    case "PUT":
      let {
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
