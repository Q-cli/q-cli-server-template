import { Db, MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let DB: Db | null = null;

client
  .connect()
  .then((connect) => {
    DB = connect.db("server_template");
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("DB failed: ", err);
  });

export function getDb(dbName: string = "server_template") {
  return client.db(dbName);
}

export default client;
