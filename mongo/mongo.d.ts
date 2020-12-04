export interface UserSchema {
  _id: { $oid: string };
  email: string;
  password: string;
}
export interface PostSchema {
  _id: { $oid: string };
  title: string;
  content: string;
  date: Date;
}
