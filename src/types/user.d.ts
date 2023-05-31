import { RowDataPacket } from "mysql2"
export interface User extends RowDataPacket {
  user_id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
  password: string;
  ssn: string;
}