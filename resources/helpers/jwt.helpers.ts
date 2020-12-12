import {
  config,
  Header,
  Payload,
  create,
  getNumericDate,
  verify,
} from "../deps.ts";

const time = 60 * 60 * 24 * 7; // one week

const secret = config()["JWT_SECRET"] as string;

const header: Header = { alg: "HS512" };

export interface IPayload extends Payload {
  _id: { $oid: string };
}

export const generateToken = async (_id: { $oid: string }): Promise<string> => {
  const token = await create(
    header,
    { exp: getNumericDate(time), _id },
    secret
  );
  return "Bearer " + token;
};

export const decodeToken = (token: string): Promise<IPayload> => {
  const jwt = token.split(" ")[1];
  return verify(jwt, secret, "HS512") as Promise<IPayload>;
};
