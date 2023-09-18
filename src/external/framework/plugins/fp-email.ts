import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { generateEmailService } from "../../nodemailer";

const plugin: FastifyPluginCallback<never> = async (fastify, _options) => {
  const user = process.env.EMAIL_USER!;
  const pass = process.env.EMAIL_PASSWORD!;

  const emailService = generateEmailService(user, pass);

  fastify.decorate("Email", emailService);
};

export default fp(plugin, { name: "fp-email", dependencies: ["fp-config"] });
