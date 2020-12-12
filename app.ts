import { Dexter, Drash, Paladin } from "./deps.ts";
import LoginResource from "./resources/login.resource.ts";
import PostResource from "./resources/post.resource.ts";
import PostsResource from "./resources/posts.resource.ts";
import RegisterResource from "./resources/register.resource.ts";
import UserPostsResource from "./resources/userposts.resource.ts";

const paladin = Paladin();
const dexter = Dexter();
const server = new Drash.Http.Server({
  resources: [
    RegisterResource,
    PostsResource,
    LoginResource,
    UserPostsResource,
    PostResource,
  ],
  middleware: {
    before_request: [dexter],
    after_request: [paladin, dexter],
  },
});

const PORT = 5000;

server.run({ hostname: "localhost", port: PORT });

console.log(`App running on port: ${PORT}`);
