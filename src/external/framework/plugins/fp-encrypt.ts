import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { generateEncryptService } from "../../encrypt";

const plugin: FastifyPluginCallback<never> = async (fastify, _options) => {
  const salt = process.env.ENCRYPTION_SALT!;

  const encryptService = generateEncryptService(salt);

  fastify.decorate("Encrypt", encryptService);
};

export default fp(plugin, { name: "fp-encrypt", dependencies: ["fp-config"] });
