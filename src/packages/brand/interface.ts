import { Item } from "dynamoose/dist/Item";

export interface BrandRow extends Item {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date | null;
  deactivatedBy: string | null;
}
