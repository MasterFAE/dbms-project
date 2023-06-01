import { RowDataPacket } from "mysql2";
export interface Vehicle extends RowDataPacket {
  vehicle_id: number;
  plate: string;
  model: string;
  year: number;
  color: string;
  type: "SERVICE" | "TRANSPORT" | "PRIVATE";
  mileage: number;
  manufacturer: string;
}
