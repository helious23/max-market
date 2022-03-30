import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            ...user,
            name: "익명",
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.MSG_SERVICE_SID,
      to: `+82${phone}`,
      body: `로그인을 위한 일회용 비밀번호는 ${payload} 입니다.`,
    });
    console.log(message);
  }

  return res.json({
    ok: true,
  });
};

export default withHandler("POST", handler);
