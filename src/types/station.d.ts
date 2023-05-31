import { RowDataPacket } from "mysql2"

export interface Station extends RowDataPacket {
  station_id: number;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  zipcode: string;
}