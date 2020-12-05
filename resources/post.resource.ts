import { Drash } from "./deps.ts";

export default class PostResource extends Drash.Http.Resource {
  static paths = ["/posts"];

  public async POST() {}
}
