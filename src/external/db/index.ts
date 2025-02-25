import * as dynamoose from "dynamoose";

import { logger } from "../framework";

export const makeDatabaseConnection = async () => {
  logger.info("Connecting to database");

  // Create new DynamoDB instance
  const dbConnection = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
    region: process.env.AWS_REGION ?? "",
  });

  // Set DynamoDB instance to the Dynamoose DDB instance
  dynamoose.aws.ddb.set(dbConnection);

  return dbConnection;
};
