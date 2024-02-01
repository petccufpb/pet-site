import { MailProviderKeys, mailProviders } from "@hyoretsu/providers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, subject } = await req.json();

    if (!content && !subject) {
      return new Response(null, { status: 400 });
    }

    new mailProviders[process.env.MAIL_DRIVER as MailProviderKeys]().sendMail({
      body: content,
      subject,
      to: process.env.MAIL_USER!,
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(null, { status: 500 });
  }
}
