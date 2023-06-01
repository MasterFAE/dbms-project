import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";
import argon2 from "argon2";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "POST":
      const { ssn, password, firstName, lastName } = JSON.parse(req.body);
      data = await query({
        query: "SELECT ssn FROM user WHERE ssn = ?",
        values: [ssn],
      });

      if (data.length != 0) {
        return res.status(401).json({ message: "User already exists" });
      }

      const hashedPassword = await argon2.hash(password);
      await query({
        query:
          "INSERT INTO user (ssn, password, firstName, lastName) VALUES (?, ?, ?, ?)",
        values: [ssn, hashedPassword, firstName, lastName],
      });

      data = await query({
        query:
          "SELECT user_id, ssn, firstName, lastName FROM user WHERE ssn = ?",
        values: [ssn],
      });

      return res.status(200).json(data);
  }
}
