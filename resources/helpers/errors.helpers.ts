import { Drash } from "../deps.ts";

export const createHttpError = (code: number, message: string) => {
  return new Drash.Exceptions.HttpException(code, message);
};
