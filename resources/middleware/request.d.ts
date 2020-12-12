import { Drash } from "../deps.ts";

export interface RequestWithID extends Drash.Http.Request {
  _id: { $oid: string };
}
