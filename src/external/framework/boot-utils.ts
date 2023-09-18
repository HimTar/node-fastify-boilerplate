import fastify, {
  FastifyRegister,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import { logger } from "../logger";
import { defaultErrorHandler } from "../../utils/errorHandler";
import { loadConfigs } from "./config-utils";

const BuildFastifyApplication = (app: Parameters<FastifyRegister>[0]) => {
  const fastifyApplication = fastify();

  // Logging requests
  fastifyApplication.addHook("onResponse", logRequest);

  fastifyApplication.register(fastifyCors);
  fastifyApplication.register(fastifyHelmet);
  fastifyApplication.register(app);

  // Attach default Error handler
  fastifyApplication.setErrorHandler(defaultErrorHandler);

  return fastifyApplication;
};

export async function start(app: Parameters<FastifyRegister>[0]) {
  // Loading Config Variables
  loadConfigs();

  // Building Minimal Fastify Server
  const server = BuildFastifyApplication(app);

  const port = parseInt(process.env.PORT ?? "3000");
  const host = process.env.HOST ?? "0.0.0.0";

  // Starting and Listening
  server.listen({ port, host }, function (err, address) {
    if (err) {
      logger.error(JSON.stringify(err));
      process.exit(1);
    }

    logger.info(`Server Listening on PORT : ${address}`);
  });
}

const logRequest = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const payload = {
    httpRequest: {
      requestMethod: req.method,
      requestUrl: req.url,
      status: reply.statusCode,
      userAgent: req.headers["user-agent"],
      referer: req.headers.referer ?? "",
      latency: reply.getResponseTime() / 1000 + "s",
      protocol: req.protocol,
    },
  };
  if (reply.statusCode < 400) {
    logger.info(JSON.stringify(payload));
  } else {
    logger.error(JSON.stringify(payload));
  }

  done();
};
