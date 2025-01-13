import BrandModel from "./repository";
import { BadRequest } from "http-errors";

export const queryBrandById = async (id: string) => {
  // validate credentials
  const [brand] = await BrandModel.query("id").eq(id).exec();

  if (!brand) {
    throw new BadRequest("Invalid brand id");
  }

  return brand;
};
