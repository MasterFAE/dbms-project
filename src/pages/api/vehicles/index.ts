import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.query.count) {
        const result = await query({ query: "SELECT COUNT(*) FROM vehicle" });
        if (!result)
          return res.status(404).json({ message: "No vehicle found" });
        return res.status(200).json(result[0]["COUNT(*)"]);
      }

      if (req.query.type == "TRANSPORT") {
        const data = await query({
          query: "SELECT * FROM vehicle WHERE type = ? ORDER BY vehicle_id ",
          values: [req.query.type],
        });
        return res.status(200).json(data);
      } else if (req.query.type == "vehicle_ranking") {
        const data = await query({
          query: `SELECT v.vehicle_id, v.manufacturer, v.model, v.year, total_trips
          FROM (
              SELECT vehicle_id, COUNT(*) AS total_trips, RANK() OVER (ORDER BY COUNT(*) DESC) AS trip_rank
              FROM trip
              WHERE status = 'completed'
              GROUP BY vehicle_id
          ) AS r
          JOIN vehicle v ON v.vehicle_id = r.vehicle_id
          ORDER BY trip_rank LIMIT 20;`,
        });
        return res.status(200).json(data);
      } else {
        const data = await query({
          query: "SELECT * FROM vehicle ORDER BY vehicle_id",
        });
        return res.status(200).json(data);
      }

    case "POST":
      const { plate, model, year, color, type, mileage, manufacturer } =
        JSON.parse(req.body);
      const result = await query({
        query:
          "INSERT INTO vehicle (plate, model, year, color, type, mileage, manufacturer) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values: [plate, model, year, color, type, mileage, manufacturer],
      });
      return res.status(200).json(result);
  }
}
