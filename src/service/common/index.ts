import { getDb } from "../../SQL/database";

const db = getDb();

export default class CommonService {
  static async setExpireToken(token: string) {
    return await db
      .collection<Common.TokenVO>("expire_token")
      .insertOne({ token });
  }
  static async getExpireToken(token: string) {
    return await db
      .collection<Common.TokenVO>("expire_token")
      .findOne({ token });
  }
}
