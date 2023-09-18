import { Db } from "mongodb";

export * as BootUtils from "./boot-utils";
export * as Autoloaders from "./autoloaders";
import { EmailService } from "../nodemailer";

import fpMongo from "./plugins/fp-mongo";
import fpConfig from "./plugins/fp-config";
import fpEmail from "./plugins/fp-email";
import fpEncrypt from "./plugins/fp-encrypt";
import { EncryptService } from "../encrypt";

export { logger } from "../logger";

export const Plugins = {
  Mongo: fpMongo,
  Config: fpConfig,
  Email: fpEmail,
  Encrypt: fpEncrypt,
};

declare module "fastify" {
  export interface FastifyInstance {
    Mongo: Db;
    Config: Record<string, string | undefined>;
    Email: EmailService;
    Encrypt: EncryptService;
  }
}
