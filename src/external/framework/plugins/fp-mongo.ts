import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { makeDatabaseConnection } from "../../../db";

const plugin: FastifyPluginCallback<never> = async (fastify, _options) => {
  const conn = await makeDatabaseConnection();

  const db = conn.db(process.env.DATABASE ?? "");

  fastify.decorate("Mongo", db);
};

export default fp(plugin, { name: "fp-mongo", dependencies: ["fp-config"] });
