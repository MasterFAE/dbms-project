import { RowDataPacket } from "mysql2"

export interface Payment extends RowDataPacket {
  payment_id: number;
  cost: number;
  createdAt: Date;
  status: "WAITING", "PROCESSING", "COMPLETED";
  type: "DEPOSIT", "USAGE",
  card_id: number;
  trip_id: number;
}