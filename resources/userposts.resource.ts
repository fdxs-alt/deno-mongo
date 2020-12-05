import Post from "../mongo/post.ts";
import { Drash } from "./deps.ts";
import { createHttpError } from "./helpers/errors.helpers.ts";

export default class UserPostsResource extends Drash.Http.Resource {
  static paths = ["/posts/:id/:skip"];

  public async GET() {
    const userID = this.request.getPathParam("id") as string;
    const numToSkip = parseInt(this.request.getPathParam("id") as string);

    try {
      const userPosts = await Post.getAllUsersPosts(numToSkip, userID);
      this.response.body = userPosts;

      return this.response;
    } catch (error) {
      throw createHttpError(500, "Something went wrong");
    }
  }
}
