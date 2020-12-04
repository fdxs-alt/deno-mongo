import { Drash, hash } from "./deps.ts";
import User from "../mongo/user.ts";
export default class RegisterResource extends Drash.Http.Resource {
  static paths = ["/register"];

  public async POST() {
    const email = (this.request.getBodyParam("email") as string) || "";
    const password = (this.request.getBodyParam("password") as string) || "";

    if (!email) {
      throw new Drash.Exceptions.HttpException(
        400,
        "You need to provide email"
      );
    }

    if (!password) {
      throw new Drash.Exceptions.HttpException(
        400,
        "You need to provide password"
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Drash.Exceptions.HttpException(400, "User already exists");
    }

    const hashedPassword = await hash(password);

    const newUser = new User(email, hashedPassword);

    const id = await newUser.create();

    this.response.body = { ...newUser, ...id };

    return this.response;
  }
}
