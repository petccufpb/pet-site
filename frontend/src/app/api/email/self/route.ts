import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const client = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { content, subject } = await req.json();

    if (!content && !subject) {
      return new Response(null, { status: 400 });
    }

    client.sendMail({
			html: content,
			subject,
      to: process.env.MAIL_USER!,
		});

    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(null, { status: 500 });
  }
}
