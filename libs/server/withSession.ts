import { withIronSessionApiRoute } from "iron-session/next";

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
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
