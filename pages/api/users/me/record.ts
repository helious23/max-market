import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { Kind } from "@prisma/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    session: { user },
    query: { kind },
  } = req;

  const findItem = async (kind: Kind) => {
    const item = await client.record.findMany({
      where: {
        userId: user?.id,
        kind,
      },
      include: {
        product: {
          include: {
            _count: {
              select: {
                favs: true,
              },
            },
          },
        },
      },
    });
    return item;
  };

  const items = await findItem(kind as unknown as Kind);
  if (items.length === 0)
    return res
      .status(404)
      .json({ ok: false, error: "상품을 찾을 수 없습니다" });
  res.json({
    ok: true,
    items,
  });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
