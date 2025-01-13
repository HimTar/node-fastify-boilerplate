import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import { makeDatabaseConnection } from "../../db";

const plugin: FastifyPluginCallback<FastifyPluginOptions> = async (
  fastify,
  _options
) => {
  const conn = await makeDatabaseConnection();

  fastify.decorate("DB", conn);
};

export default fp(plugin, { name: "fp-db", dependencies: ["fp-config"] });
