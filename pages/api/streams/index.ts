import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "GET") {
    const {
      query: { page },
    } = req;
    const streams = await client.stream.findMany({
      take: 10,
      skip: (+page - 1) * 10,
    });
    const streamCount = await client.stream.count();
    res.json({
      ok: true,
      streams,
      pages: Math.ceil(streamCount / 10),
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;

    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      stream,
    });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
