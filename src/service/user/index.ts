import { ObjectId } from "mongodb";
import { getDb } from "../../SQL/database";
import { formatQueryParams, generateTimeForNow } from "../../utils";

const db = getDb();

export class UserService {
  async create(user: User.User) {
    const time = generateTimeForNow();
    const result = await db?.collection<User.User>("users").insertOne({
      ...user,
      createTime: time,
      updateTime: time,
    });
    return result;
  }

  async getUserById(_id: string) {
    const result = await db?.collection<User.User>("users").findOne({ _id });
    return result;
  }

  async getUserByName(username: string) {
    const result = await db
      ?.collection<User.User>("users")
      .findOne({ username });
    return result;
  }

  async getUserList(params: User.Params) {
    const query = formatQueryParams(params);

    const result = await db
      .collection<User.User>("users")
      .find(query)
      .toArray();
    return result;
  }

  async deleteUserById(params: User.Params) {
    const query = formatQueryParams(params);
    const result = await db?.collection<User.User>("users").deleteOne(query);
    return result;
  }

  async updateUser(params: User.User) {
    const _id = params._id;
    const updateData = Object.assign({}, params, {
      updateTime: generateTimeForNow(),
    });
    // @ts-ignore
    updateData._id && delete updateData._id;

    const result = await db
      ?.collection<User.User>("users")
      .updateOne(formatQueryParams({ _id }), { $set: updateData });

    return result;
  }
}

const userService = new UserService();

export default userService;
