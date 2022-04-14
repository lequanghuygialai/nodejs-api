import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

function connect() {
  const dbUrl = config.get<string>("dbUri");
  return mongoose
    .connect(dbUrl)
    .then(() => {
      logger.info("Connected to db at " + dbUrl);
    })
    .catch((e: Error) => {
      logger.error("Error connect to db  " + e.message);
      process.exit(1);
    });
}

export default connect;
