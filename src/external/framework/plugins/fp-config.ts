import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback<FastifyPluginOptions> = async (
  fastify,
  _options
) => {
  fastify.decorate("Config", process.env);
};

export default fp(plugin, { name: "fp-config" });
