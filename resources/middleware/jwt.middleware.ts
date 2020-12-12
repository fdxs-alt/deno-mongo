import { RequestWithID } from "./request.d.ts";
import { createHttpError } from "./../helpers/errors.helpers.ts";
import { IPayload, decodeToken } from "./../helpers/jwt.helpers.ts";
import { Drash } from "../deps.ts";

export default async function JwtMiddleware(
  request: Drash.Http.Request,
  response: Drash.Http.Response
) {
  const { authorization } = request.getAllHeaderParams();

  try {
    const { _id }: IPayload = await decodeToken(authorization);
    (request as RequestWithID)._id = _id;
  } catch (error) {
    throw createHttpError(401, "Unauthorized");
  }
}
