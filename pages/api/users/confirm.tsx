import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!exists) return res.status(404).end();
  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  res.status(200).end();
};

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "maxSession",
  password: process.env.SESSION_PASSWORD!,
});
