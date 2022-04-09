import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
  });
  if (!post)
    res.status(404).json({ ok: false, error: "질문이 존재하지 않습니다" });

  const alreadyExists = await client.wondering.findFirst({
    where: {
      postId: +id.toString(),
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  if (alreadyExists) {
    await client.wondering.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  try {
    await res.unstable_revalidate("/community");
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
