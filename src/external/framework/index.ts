export * as BootUtils from "./boot-utils";
export * as Autoloaders from "./autoloaders";
import { EmailService } from "../nodemailer";

import fpDB from "./plugins/fp-db";
import fpConfig from "./plugins/fp-config";
import fpEmail from "./plugins/fp-email";
import fpEncrypt from "./plugins/fp-encrypt";
import { EncryptService } from "../encrypt";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

export { logger } from "../logger";

export const Plugins = {
  DB: fpDB,
  Config: fpConfig,
  Email: fpEmail,
  Encrypt: fpEncrypt,
};

declare module "fastify" {
  export interface FastifyInstance {
    DB: DynamoDB;
    Config: Record<string, string | undefined>;
    Email: EmailService;
    Encrypt: EncryptService;
  }
}
