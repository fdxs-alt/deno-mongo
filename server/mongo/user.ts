import { UserCollection } from "./mongo.ts";

interface IParams {
  _id?: { $oid: string };
  email?: string;
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

  static find(params: IParams) {
    return UserCollection.find(params);
  }

  create() {
    return UserCollection.insertOne(this);
  }

  static remove(params: IParams) {
    return UserCollection.deleteOne(params);
  }

  static updatePassword({ _id }: IParams, password: string) {
    return UserCollection.updateOne({ $where: _id?.$oid }, { password });
  }

  static updateEmail({ _id }: IParams, email: string) {
    return UserCollection.updateOne({ $where: _id?.$oid }, { email });
  }
}
