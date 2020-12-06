import { Drash } from "./deps.ts";
import HomeResource from "./resources/home.resource.ts";
import LoginResource from "./resources/login.resource.ts";
import PostResource from "./resources/post.resource.ts";
import PostsResource from "./resources/posts.resource.ts";
import RegisterResource from "./resources/register.resource.ts";
import UserPostsResource from "./resources/userposts.resource.ts";

const server = new Drash.Http.Server({
  resources: [
    RegisterResource,
    PostsResource,
    LoginResource,
    UserPostsResource,
    PostResource,
    HomeResource,
  ],
});

const PORT = 5000;

server.run({ hostname: "localhost", port: PORT });

console.log(`App running on port: ${PORT}`);
