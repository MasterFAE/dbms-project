import { RowDataPacket } from "mysql2"
export interface Employee extends RowDataPacket {
  employee_id: number;
  firstName: string;
  lastName: string;
  ssn: string;
  department_id: number;
  gender: string;
  dateOfBirth: Date;
  phoneNumber: string;
  salary: number;
  signedAt: Date;
  role: "ADMINISTRATOR" | "WORKER" | "SUPPORT";
}