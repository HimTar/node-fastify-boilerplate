import { FastifyInstance, RawServerBase } from "fastify";
import { Autoloaders, Plugins } from "./external/framework";

export default async function (
  f: FastifyInstance<RawServerBase>
): Promise<void> {
  // Register plugins required for the application
  f.register(Plugins.Config);
  f.register(Plugins.Mongo);
  f.register(Plugins.Email);
  f.register(Plugins.Encrypt);

  // Register routes
  await Promise.all([Autoloaders.loadAndRegisterRoutes(f, __dirname)]);
}
