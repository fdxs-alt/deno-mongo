import { createHttpError } from "./helpers/errors.helpers.ts";
import { generateToken } from "./helpers/jwt.helpers.ts";
import User from "../mongo/user.ts";
import { Drash, compare } from "./deps.ts";

export default class LoginResource extends Drash.Http.Resource {
  static paths = ["/login"];

  public async POST() {
    const email = (this.request.getBodyParam("email") as string) || "";

    const givenPassword =
      (this.request.getBodyParam("password") as string) || "";

    const user = await User.findOne({ email });

    if (!user) {
      return createHttpError(400, "Cannot identify user");
    }

    const { password, ...rest } = user;

    const isValid = await compare(givenPassword, password);

    if (!isValid) {
      throw createHttpError(400, "Password is not valid");
    }

    try {
      const jwtToken = await generateToken(rest._id);

      this.response.body = { ...rest, jwtToken };

      return this.response;
    } catch (error) {
      throw createHttpError(500, "Something went wrong");
    }
  }
}
