import mongoose from "mongoose";
import config from "config";
import { log } from "./logger";

export function connect() {
  const dbUrl = config.get<string>("dbUri");
  return mongoose
    .connect(dbUrl)
    .then(() => {
      log.info("Connected to db at " + dbUrl);
    })
    .catch((e: Error) => {
      log.error("Error connect to db  " + e.message);
      process.exit(1);
    });
}
