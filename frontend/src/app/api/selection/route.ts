import { FormData, Blob } from "formdata-node";
import nodemailer from "nodemailer";

import { buildEmail } from "./emailTemplate";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NEXT_EMAIL_USER,
        pass: process.env.NEXT_EMAIL_PASSWORD,
      },
    });

    const name = formData.get("name");
    const cv = formData.get("cv");
    const matricula = formData.get("matricula");
    const historico = formData.get("historico");

    if (!(name && cv && matricula && historico)) {
      return new Response(null, { status: 400 });
    }

    // convert cv from File to Buffer
    const cvBuffer = Buffer.from(await (cv as File).arrayBuffer());
    const matriculaBuffer = Buffer.from(await (matricula as File).arrayBuffer());
    const historicoBuffer = Buffer.from(await (historico as File).arrayBuffer());

    await transporter.sendMail({
      from: process.env.NEXT_EMAIL_USER,
      to: process.env.NEXT_EMAIL_USER,
      subject: `Formulário de Seleção - ${name}`,
      html: buildEmail({ name: name as string, cpf: formData.get("cpf") as string }),
      attachments: [
        {
          filename: `Currículo - ${name}.pdf`,
          content: cvBuffer,
          contentType: "application/pdf",
        },
        {
          filename: `Matrícula - ${name}.pdf`,
          content: matriculaBuffer,
          contentType: "application/pdf",
        },
        {
          filename: `Histórico - ${name}.pdf`,
          content: historicoBuffer,
          contentType: "application/pdf",
        },
      ],
    });
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(null, { status: 500 });
  }
}
