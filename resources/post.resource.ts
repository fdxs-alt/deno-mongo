import { Drash } from "../deps.ts";
import Post from "../mongo/post.ts";
import { createHttpError } from "./helpers/errors.helpers.ts";
import JwtMiddleware from "./middleware/jwt.middleware.ts";

@Drash.Http.Middleware({
  before_request: [JwtMiddleware],
})
export default class PostResource extends Drash.Http.Resource {
  static paths = ["/post/:id"];

  public async GET() {
    const id = this.request.getPathParam("id") as string;

    try {
      const singlePost = await Post.getSinglePost(id);

      this.response.body = singlePost;

      return this.response;
    } catch (error) {
      throw createHttpError(500, "Error occured");
    }
  }

  public async DELETE() {
    const id = this.request.getPathParam("id") as string;

    try {
      await Post.removePost(id);

      this.response.body = { success: true };

      return this.response;
    } catch (error) {
      throw createHttpError(500, "Error occured");
    }
  }
}
