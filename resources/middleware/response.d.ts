import { Drash } from "../deps.ts";

export interface ResponseWithID extends Drash.Http.Response {
  _id: { $oid: string };
}
