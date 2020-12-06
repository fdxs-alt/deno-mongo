import { createHttpError } from "./helpers/errors.helpers.ts";
import { Drash } from "./deps.ts";

const decoder = new TextDecoder();

export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    try {
      const fileContentsRaw = Deno.readFileSync("../client/index.html");
      const template = decoder.decode(fileContentsRaw);
      this.response.body = template;
      return this.response;
    } catch (error) {
      throw createHttpError(400, "Error reading HTML template");
    }
  }
}
