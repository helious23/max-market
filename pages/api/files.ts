import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,

      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_IMAGE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )
  ).json();

  res.json({
    ok: true,
    ...response.result,
  });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
