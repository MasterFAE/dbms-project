import { RowDataPacket } from "mysql2";

export interface Trip extends RowDataPacket {
  trip_id: number;
  vehicle_id: number;
  employee_id: number;
  route_id: number;
  status: "STARTED" | "NOT_STARTED" | "COMPLETED";
  trip_details: string?;
  startedAt: Date;
  completedAt: Date;
}
