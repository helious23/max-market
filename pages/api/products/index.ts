import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "GET") {
    const products = await client.product.findMany({});
    res.json({
      ok: true,
      products,
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      product,
    });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);