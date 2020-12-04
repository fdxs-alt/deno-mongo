import { UserCollection } from "./mongo.ts";

interface IParams {
  _id?: { $oid: string };
  email: string;
}

export default class User {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static findOne(params: IParams) {
    return UserCollection.findOne(params);
  }

  create() {
    return UserCollection.insertOne(this);
  }
}
