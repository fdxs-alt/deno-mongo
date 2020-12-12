import { createHttpError } from "./helpers/errors.helpers.ts";
import { RequestWithID } from "./middleware/request.d.ts";
import { Drash, format } from "./deps.ts";
import JwtMiddleware from "./middleware/jwt.middleware.ts";
import Post from "../mongo/post.ts";

@Drash.Http.Middleware({
  before_request: [JwtMiddleware],
  after_request: [],
})
export default class PostsResource extends Drash.Http.Resource {
  static paths = ["/posts", "/posts/:skip"];

  public async POST() {
    const title = (this.request.getBodyParam("title") as string) || "";
    const content = (this.request.getBodyParam("content") as string) || "";

    const {
      _id: { $oid },
    } = this.request as RequestWithID;

    const date = format(new Date(), "do MMMM u HH:mm", {});

    const post = new Post(title, content, date, $oid);

    const _id = await post.create();

    this.response.body = { _id, ...post };

    return this.response;
  }

  public async GET() {
    const skipParam = parseInt(this.request.getPathParam("skip") as string);

    try {
      const posts = await Post.getPaginatedPosts(skipParam);
      this.response.body = posts;
      return this.response;
    } catch (error) {
      throw createHttpError(500, "Error occured");
    }
  }
}
