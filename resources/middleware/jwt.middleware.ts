import { createHttpError } from "./../helpers/errors.helpers.ts";
import { IPayload, decodeToken } from "./../helpers/jwt.helpers.ts";
import { Drash } from "../deps.ts";

export default async function JwtMiddleware(
  request: Drash.Http.Request,
  response: Drash.Http.Response
) {
  
  const { authorization } = request.getAllHeaderParams();

  try {
    const decoded: IPayload = await decodeToken(authorization);
    response.body = decoded;
  } catch (error) {
    throw createHttpError(401, "Unauthorized");
  }
}
