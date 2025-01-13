import { FastifyInstance, RawServerBase } from "fastify";
import { Autoloaders, Plugins } from "./external/framework";

export default async function (
  f: FastifyInstance<RawServerBase>
): Promise<void> {
  // Register plugins required for the application
  f.register(Plugins.Config);
  f.register(Plugins.DB);
  // f.register(Plugins.Email);
  f.register(Plugins.Encrypt);

  // Register routes
  await Autoloaders.loadAndRegisterRoutes(f, __dirname);
}
