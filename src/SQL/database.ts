import { MongoClient, ServerApiVersion } from "mongodb";
import logger from '../utils/logger';

const client = new MongoClient("mongodb://localhost:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client
  .connect()
  .then(() => {
    logger.info("mongodb is connected.");
  })
  .catch((err) => {
    logger.error("mongodb connect failed: ", err);
  });

export function getDb(dbName: string = "server_template") {
  return client.db(dbName);
}

export default client;
