import { Item } from "dynamoose/dist/Item";

export interface BrandRow extends Item {
  id: string;
  name: string;
  emailDomains: string[];
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date | null;
  deactivatedBy: string | null;
}
