import { MongoClient } from "mongodb";

import { logger } from "../external/framework";

export const makeDatabaseConnection = async () => {
  logger.info("Connecting to database");

  const databaseURL =
    process.env.NODE_ENV! === "development"
      ? process.env.DEV_MONGO_URI!
      : process.env.PROD_MONGO_URI!;

  const connection = await MongoClient.connect(databaseURL);

  return connection;
};
