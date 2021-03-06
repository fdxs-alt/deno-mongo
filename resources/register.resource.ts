import { createHttpError } from "./helpers/errors.helpers.ts";
import { Drash, hash } from "./deps.ts";
import User from "../mongo/user.ts";
import { generateToken } from "./helpers/jwt.helpers.ts";
import JwtMiddleware from "./middleware/jwt.middleware.ts";
import { RequestWithID } from "./middleware/request.d.ts";
import Post from "../mongo/post.ts";
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

  @Drash.Http.Middleware({
    before_request: [JwtMiddleware],
  })
  public async DELETE() {
    const { _id } = this.request as RequestWithID;

    try {
      await Post.removeAllUserPosts(_id.$oid);
      await User.remove({ _id });

      this.response.body = { success: true };

      return this.response;
    } catch (error) {
      throw createHttpError(500, "Error occured");
    }
  }
}
