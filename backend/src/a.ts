import { mailProviders, type MailProviderKeys } from "@hyoretsu/providers";
import { PrismaClient } from "@prisma/client";

// 2d097379-e990-4cb2-8bb1-70140a5fec61

const execute = async () => {
  const prisma = new PrismaClient();

  const mailProvider = new mailProviders[process.env.MAIL_DRIVER as MailProviderKeys]();

  const emails = [
    "a.arthurggqueiroz@gmail.com",
    "araujoluisfernando25@gmail.com",
    "arthurmega603@gmail.com",
    "arturrnalmeida@gmail.com",
    "davidys.pontes@icloud.com",
    "edufigue4456@gmail.com",
    "eliadutrasena@gmail.com",
    "eternatus4563@gmail.com",
    "franciscoericles001@gmail.com",
    "gabriel.cavicchioli@academico.ufpb.br",
    "gabrieldemoraislacerda@gmail.com",
    "gmmangueira@gmail.com",
    "gui14052015@gmail.com",
    "ianformiga2@gmail.com",
    "igorvinicius010905@gmail.com",
    "ismael.araujo@academico.ufpb.br",
    "ivanaylarodrigues@outlook.com",
    "joao.cirilo@academico.ufpb.br",
    "joaoliveirarruda@gmail.com",
    "joaovictoroliveira13@hotmail.com",
    "joseuchoav@gmail.com",
    "kadurochasantos@gmail.com",
    "kaiolima1503@gmail.com",
    "kayoeoliveirasilva@gmail.com",
    "letyciabrenda21@gmail.com",
    "luanacsilva237@gmail.com",
    "malumquintela@gmail.com",
    "marcomellofilho@gmail.com",
    "mariaclaracaldasfernandes@gmail.com",
    "marianasantos151803@gmail.com",
    "maripferreira07@gmail.com",
    "nic.costa11@gmail.com",
    "pedrogomesipubi2006@hotmail.com",
    "pfnmoreira@gmail.com",
    "planob2024@gmail.com",
    "rickisonl91@gmail.com",
    "rosajuliarosa05@gmail.com",
    "samuelsidc06@outlook.com",
  ];

  const participants = await prisma.projectParticipant.findMany({
    select: {
      id: true,
      email: true,
    },
    where: {
      email: {
        in: emails,
      },
    },
  });

  const eventId = "82009933-f717-4194-ba89-717b90d993b4";
  const eventTitle = "Construção de placas PCB";

  for (const participant of participants) {
    await mailProvider.sendMail({
      to: participant.email,
      subject: `[Semana da Computação XXXIII] Certificado do minicurso "${eventTitle}"`,
      body: `Olá!<br/><br/>Estamos passando para informar que seu certificado do minicurso "${eventTitle}" já está disponível.<br/><br/>Você pode acessá-lo em: ${process.env.WEB_URL}/sdc/certificados/${eventId}?event=true&participantId=${participant.id}`,
    });
  }
};

execute();
