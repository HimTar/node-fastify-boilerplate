import BrandModel from "./repository";

export const queryBrandById = async (id: string) => {
  const [brand] = await BrandModel.query("id").eq(id).exec();

  return brand;
};

export const queryBrandByEmailDomain = async (emailDomain: string) => {
  const brands = await BrandModel.scan().exec();

  const brand = brands.find((brand) =>
    brand.emailDomains.includes(emailDomain)
  );

  return brand ?? null;
};
