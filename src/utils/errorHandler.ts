import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { isHttpError } from "http-errors";

import { logger } from "../external/framework";

export const defaultErrorHandler = (
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
) => {
  if (isHttpError(err)) {
    // Handle 500 Error
    if (err.status >= 500) {
      logger.error(`Unexpected Error : ${err}`);

      reply.status(err.status).send({
        message: "Unexpected error! We are looking into it.",
        error: "UnexpectedError",
        statusCode: err.status,
      });
    } else {
      // Handle Rest Error
      logger.error(`HTTP Error : ${err}`);

      reply.status(err.status).send(err);
    }
  } else if (err.validation) {
    logger.error(`SchemaValidationError : ${err}`);

    reply.status(400).send({
      message: err.message,
      error: "Validation Error",
      statusCode: 400,
    });
  } else {
    logger.error(`UnexpectedError : ${err}`);
    reply.status(500).send("Unexpected error! We are looking into it.");
  }
};
