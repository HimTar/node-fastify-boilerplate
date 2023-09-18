import dotenv from "dotenv";
import { logger } from "../framework";

export const loadConfigs = () => {
  logger.info("Loading Env Variables");

  // Set the NODE_ENV to 'development' by default
  process.env.NODE_ENV = process.env.NODE_ENV ?? "development";

  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }

  logger.info("Env Variables loaded successfully");
};
