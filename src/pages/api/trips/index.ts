import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";
import { Trip } from "~/types/trips";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      if (req.query.type == "MAINPAGE") {
        data = await query({
          query:
            "SELECT * FROM trip JOIN `vehicle` ON `vehicle`.`vehicle_id` = `trip`.`vehicle_id` JOIN `route` ON `route`.`route_id` = `trip`.`route_id` WHERE status = ? ORDER BY `trip_id` DESC LIMIT 8",
          values: [`STARTED`],
        });
      } else
        data = await query({
          query:
            "SELECT * FROM trip JOIN `vehicle` ON `vehicle`.`vehicle_id` = `trip`.`vehicle_id` JOIN `route` ON `route`.`route_id` = `trip`.`route_id` ORDER BY `trip_id` DESC",
          values: [],
        });
      if (!data) return res.status(404).json({ message: "No trips found" });
      return res.status(200).json(data);
    case "POST":
      const {
        vehicle_id,
        employee_id,
        route_id,
        status,
        trip_details,
        startedAt,
        completedAt,
      } = JSON.parse(req.body);
      data = await query({
        query:
          "INSERT INTO trip (vehicle_id, employee_id, route_id, status, trip_details, startedAt, completedAt) VALUES (?,?,?,?,?,?,?)",
        values: [
          vehicle_id,
          employee_id,
          route_id,
          status,
          trip_details,
          null,
          null,
        ],
      });
      res.status(200).json({ message: "OK." });
      break;
  }
}
