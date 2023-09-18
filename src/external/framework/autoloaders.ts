import { FastifyInstance, RawServerBase } from "fastify";
import glob from "tiny-glob";
import path from "path";
import { logger } from "../logger";

export async function loadAndRegisterRoutes(
  f: FastifyInstance<RawServerBase>,
  cwd: string,
  key = "route"
) {
  const start = Date.now();
  for (const file of await glob(`**/*.${key}.{ts,js}`, { cwd })) {
    const module = require(path.join(cwd, file));
    const plugin = module.default ?? module;
    if (plugin) {
      logger.info(`Loading... ${key} Routes from ${file}`);
      f.register(plugin);
    }
  }
  logger.info(`Registered routes in ${Date.now() - start} ms`);
}
