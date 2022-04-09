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

    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
      take: 10,
      skip: page ? (+page - 1) * 10 : 0,
    });
    const productCount = await client.product.count();

    res.json({
      ok: true,
      products,
      pages: Math.ceil(productCount / 10),
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    try {
      await res.unstable_revalidate("/");
      return res.json({ ok: true, product });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
