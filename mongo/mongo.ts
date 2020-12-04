import { PostSchema, UserSchema } from "./mongo.d.ts";
import { config, MongoClient } from "./deps.ts";

const client = new MongoClient();

client.connectWithUri(config()["MONGODB_URI"] as string);

const db = client.database("deno");
export const UserCollection = db.collection<UserSchema>("users");
export const PostCollection = db.collection<PostSchema>("posts");
