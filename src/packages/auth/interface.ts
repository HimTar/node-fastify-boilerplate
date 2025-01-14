import { Item } from "dynamoose/dist/Item";

export interface UserRow extends Item {
  id: string;
  name: string;
  email: string;
  password: string;
  brandId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date | null;
  deactivatedBy: string | null;
}
