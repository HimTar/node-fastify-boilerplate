import { FastifyPluginAsync } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { BadRequest } from "http-errors";

import BrandModel from "./repository";
import { CreateBrand, QueryBrand } from "./schema";
import { queryBrandById } from "./utils";
import { randomUUID } from "../../external/uuid";

const routes: FastifyPluginAsync = async function (app) {
  app.get<{ Querystring: FromSchema<typeof QueryBrand> }>(
    "/brand/query",
    {
      schema: {
        querystring: QueryBrand,
      },
    },
    async function (req, reply) {
      const q = req.query;

      const brandInfo = await BrandModel.query("id").eq(q.id).exec();

      return reply.send({
        brandInfo,
      });
    }
  );

  app.post<{ Body: FromSchema<typeof CreateBrand> }>(
    "/brand/create",
    {
      schema: {
        body: CreateBrand,
      },
    },
    async function (req, reply) {
      const { name, emailDomains } = req.body;

      const [existingBrand] = await BrandModel.query("name").eq(name).exec();

      if (existingBrand) {
        throw new BadRequest(`Brand(${name}) already exists`);
      }

      // Create brand
      const brand = new BrandModel({
        id: randomUUID(),
        name,
        emailDomains,
      });
      await brand.save();

      return "OK";
    }
  );
};

export default routes;
