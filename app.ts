import { Drash } from "./deps.ts";
import PostResource from "./resources/post.resource.ts";
import RegisterResource from "./resources/register.resource.ts";

const server = new Drash.Http.Server({
  resources: [RegisterResource, PostResource],
});

const PORT = 5000;

server.run({ hostname: "localhost", port: PORT });

console.log(`App running on port: ${PORT}`);
