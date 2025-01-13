import { FastifyPluginAsync } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { BadRequest } from "http-errors";

import BrandModel from "./repository";
import { QueryBrand } from "./schema";
import { queryBrandById } from "./utils";

const routes: FastifyPluginAsync = async function (app) {
  app.post<{ Body: FromSchema<typeof QueryBrand> }>(
    "/brand/query",
    {
      schema: {
        body: QueryBrand,
      },
    },
    async function (req, reply) {
      const q = req.body;

      const brandInfo = await queryBrandById(q.id);

      return reply.send({
        brandInfo,
      });
    }
  );
};

export default routes;
