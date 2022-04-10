import nodemailer from "nodemailer";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

// nodemailer 코드 참고
// https://itnomad.tistory.com/7
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PWD,
  },
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
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
  } else if (email) {
    const sendMail = await transporter
      .sendMail({
        from: `Admin <${process.env.GMAIL_ID}>`,
        to: email,
        subject: "Max Market 로그인 링크 입니다",
        text: `로그인을 위한 일회용 비밀번호는 ${payload} 입니다`,
        html: `
          <div style="text-align: center;">
            <h3 style="color: #FA5882">Max Market</h3>
            <br />
            <strong>로그인을 위한 일회용 비밀번호는 ${payload} 입니다</strong>
          </div>
      `,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  return res.json({
    ok: true,
  });
};

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
