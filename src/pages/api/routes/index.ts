import { NextApiRequest, NextApiResponse } from "next";
import { query } from "~/shared/server/query";

export default async function handler(req, res) {
  let data;
  switch (req.method) {
    case "GET":
      if (req.query.stations == "true") {
        data = await query({
          query: `SELECT r.route_id, r.label, r.length, COUNT(sr.station_id) AS station_count
          FROM route r
          LEFT JOIN stationToRoute sr ON r.route_id = sr.route_id
          GROUP BY r.route_id, r.label, r.length`,
        });
      } else if (req.query.type == "most-passenger") {
        data = await query({
          query: `SELECT r.route_id, r.label, COUNT(p.payment_id) AS payment_count
          FROM route r
          JOIN trip t ON r.route_id = t.route_id
          JOIN payment p ON t.trip_id = p.trip_id
          GROUP BY r.route_id, r.label
          ORDER BY payment_count DESC
          LIMIT 1;`,
        });
      } else if (req.query.type == "least-passenger") {
        data = await query({
          query: `SELECT r.route_id, r.label, COUNT(p.payment_id) AS payment_count
          FROM route r
          JOIN trip t ON r.route_id = t.route_id
          JOIN payment p ON t.trip_id = p.trip_id
          GROUP BY r.route_id, r.label
          ORDER BY payment_count ASC
          LIMIT 1;`,
        });
      } else if (req.query.type == "count") {
        data = await query({
          query: `SELECT COUNT(route_id) AS route_count FROM route`,
        });
      } else {
        data = await query({
          query: "SELECT * FROM route ORDER BY route_id DESC ",
        });
      }
      return res.status(200).json(data);
  }
}
