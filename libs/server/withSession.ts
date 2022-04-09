import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { NextApiHandler } from "next";

// module typing
// https://github.com/vvo/iron-session#typing-session-data-with-typescript

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "maxSession",
  password: process.env.COOKIE_PASSWORD!,
  secure: process.env.NODE_ENV === "production",
};

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}
