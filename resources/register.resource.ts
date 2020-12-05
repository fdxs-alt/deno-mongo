import { createHttpError } from "./helpers/errors.helpers.ts";
import { Drash, hash } from "./deps.ts";
import User from "../mongo/user.ts";
import { generateToken } from "./helpers/jwt.helpers.ts";
export default class RegisterResource extends Drash.Http.Resource {
  static paths = ["/register"];

  public async POST() {
    const email = (this.request.getBodyParam("email") as string) || "";
    const password = (this.request.getBodyParam("password") as string) || "";

    if (!email) {
      throw createHttpError(400, "You need to provide email");
    }

    if (!password) {
      throw createHttpError(400, "You need to provide password");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createHttpError(400, "User already exists");
    }

    const hashedPassword = await hash(password);

    const newUser = new User(email, hashedPassword);

    const id = await newUser.create();

    try {
      const jwtToken = await generateToken(id);

      this.response.body = { email, id, jwtToken };

      return this.response;
    } catch (error) {
      throw createHttpError(500, "Something went wrong");
    }
  }
}
