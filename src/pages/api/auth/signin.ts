import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";
import * as argon2 from "argon2";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "POST":
      const { ssn, password } = JSON.parse(req.body);
      data = await query({
        query: "SELECT ssn,password, user_id FROM user WHERE ssn = ?",
        values: [ssn],
      });

      if (data.length == 0) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!(await argon2.verify(data[0].password, password))) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.status(200).json(data);
  }
}
