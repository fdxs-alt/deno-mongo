import { PostCollection } from "./mongo.ts";
export default class Post {
  title: string;
  content: string;
  date: Date;

  constructor(title: string, content: string, date: Date) {
    this.content = content;
    this.title = title;
    this.date = date;
  }

  create() {
    return PostCollection.insertOne(this);
  }
}
