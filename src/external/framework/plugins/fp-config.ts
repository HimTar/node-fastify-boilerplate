import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback<never> = async (fastify, _options) => {
  fastify.decorate("Config", process.env);
};

export default fp(plugin, { name: "fp-config" });
