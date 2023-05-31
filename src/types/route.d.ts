import { RowDataPacket } from "mysql2"

export interface Route extends RowDataPacket {
  route_id: number;
  label: string;
  length: number;
  
}