import { PostCollection } from "./mongo.ts";
export default class Post {
  title: string;
  content: string;
  date: string;
  author: string;

  constructor(title: string, content: string, date: string, author: string) {
    this.content = content;
    this.title = title;
    this.date = date;
    this.author = author;
  }

  async create() {
    const _id = await PostCollection.insertOne(this);
    return _id;
  }

  static async getPaginatedPosts(numToSkip: number) {
    const posts = await PostCollection.find().skip(numToSkip).limit(15);

    return posts;
  }

  static async getAllUsersPosts(numToSkip: number, id: string) {
    const posts = await PostCollection.find({ author: id })
      .skip(numToSkip)
      .limit(10);

    return posts;
  }

  static async removePost(id: string) {
    await PostCollection.deleteOne({ _id: { $oid: id } });

    return true;
  }

  static async removeAllUserPosts(userID: string) {
    await PostCollection.deleteMany({ author: userID });

    return true;
  }

  static getSinglePost(id: string) {
    return PostCollection.findOne({ _id: { $oid: id } });
  }
}
