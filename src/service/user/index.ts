import { getDb } from "../../SQL/database";

const db = getDb();

export class UserService {
  async create(user: User.User) {
    console.log("create user", user);
    const time = Date.now();
    const result = await db?.collection<User.User>("users").insertOne({
      ...user,
      createTime: time,
      updateTime: time,
    });
    console.log("created user result: ", result);
    return result;
  }

  async getUserById(_id: string) {
    const result = await db?.collection<User.User>("users").findOne({ _id });
    return result;
  }

  async getUserByName(name: string) {
    const result = await db?.collection<User.User>("users").findOne({ name });
    return result;
  }
}

const userService = new UserService();

export default userService;
