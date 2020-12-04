import { Drash } from "./deps.ts";

export default class LoginResource extends Drash.Http.Resource {
  static paths = ["/login"];
}
