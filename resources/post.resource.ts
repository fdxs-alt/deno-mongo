import { RequestWithID } from "./middleware/request.d.ts";
import { Drash, format } from "./deps.ts";
import JwtMiddleware from "./middleware/jwt.middleware.ts";
import Post from "../mongo/post.ts";

@Drash.Http.Middleware({
  before_request: [JwtMiddleware],
  after_request: [],
})
export default class PostResource extends Drash.Http.Resource {
  static paths = ["/posts"];

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
}
