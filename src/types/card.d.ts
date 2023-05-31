import { RowDataPacket } from "mysql2"

export interface Card extends RowDataPacket  {
  card_id: number;
  user_id: number;
  renewalAt: Date;
  createdAt: Date;
  renewedAt: Date;
  type: "PRIVILEGED", "NORMAL"
  balance: number;
}