import { MailProvider, mailProviders, type MailProviderKeys } from "@hyoretsu/providers";
import { Module } from "@nestjs/common";

import { AuthModule } from "@modules/auth/auth.module";
import { PrismaService } from "@database/prisma.service";

import ProjectsController from "./infra/http/controllers/projects.controller";
import PrismaProjectsRepository from "./infra/prisma/repositories/projects.repository";
import ProjectsRepository from "./repositories/projects.repository";
import CreateAttendance from "./services/CreateAttendance.service";
import CreateCertificate from "./services/CreateCertificate.service";
import CreateEdition from "./services/CreateEdition.service";
import CreateEditionCertificates from "./services/CreateEditionCertificates.service";
import CreateEvent from "./services/CreateEvent.service";
import CreateEventCertificates from "./services/CreateEventCertificates.service";
import CreateParticipant from "./services/CreateParticipant.service";
import CreateParticipation from "./services/CreateParticipation.service";
import CreateProject from "./services/CreateProject.service";
import CreateSpeaker from "./services/CreateSpeaker.service";
import DeleteEdition from "./services/DeleteEdition.service";
import DeleteParticipation from "./services/DeleteParticipation.service";
import FindLatestEdition from "./services/FindLatestEdition.service";
import FindParticipant from "./services/FindParticipant.service";
import ListAttendees from "./services/ListAttendees.service";
import ListCertificates from "./services/ListCertificates.service";
import ListEditions from "./services/ListEditions.service";
import ListEvents from "./services/ListEvents.service";
import ListParticipants from "./services/ListParticipants.service";
import ListSpeakers from "./services/ListSpeakers.service";
import UpdateEdition from "./services/UpdateEdition.service";
import UpdateEvent from "./services/UpdateEvent.service";
import ValidateCertificate from "./services/ValidateCertificate.service";

const DEFAULT_MAIL_DRIVER: MailProviderKeys = "gmail";

const SUPPORTED_MAIL_DRIVERS: MailProviderKeys[] = ["ethereal", "gmail", "nodemailer", "sendgrid"];

/**
 * Resolve o driver de e-mail a partir de `MAIL_DRIVER`.
 *
 * O `NodemailerMailProvider` (`@hyoretsu/providers`) monta o transporte do
 * Nodemailer a partir de um mapa fixo (`gmail`, `nodemailer`, `sendgrid`)
 * indexado por `process.env.MAIL_DRIVER`. Quando o valor está ausente ou não
 * corresponde a nenhuma chave, o mapa devolve `undefined` e o
 * `nodemailer.createTransport(undefined)` quebra o boot com
 * "TypeError: Cannot set properties of undefined (setting 'mailer')".
 *
 * Por isso o valor é normalizado (trim/lowercase) e validado contra os drivers
 * suportados antes de ser usado.
 */
function resolveMailDriver(): MailProviderKeys {
  const driver = process.env.MAIL_DRIVER?.trim().toLowerCase() as MailProviderKeys | undefined;

  if (!driver) {
    return DEFAULT_MAIL_DRIVER;
  }

  if (!SUPPORTED_MAIL_DRIVERS.includes(driver)) {
    console.warn(
      `[mail] MAIL_DRIVER="${driver}" não é suportado (aceitos: ${SUPPORTED_MAIL_DRIVERS.join(
        ", ",
      )}). Usando "${DEFAULT_MAIL_DRIVER}".`,
    );

    return DEFAULT_MAIL_DRIVER;
  }

  return driver;
}

@Module({
  imports: [AuthModule],
  controllers: [ProjectsController],
  providers: [
    {
      provide: MailProvider,
      // A resolução acontece na factory (tempo de instanciação) e não no
      // carregamento do módulo: assim o `.env` carregado pelo `ConfigModule`
      // ainda tem precedência, já que o `ConfigModule` não sobrescreve
      // variáveis que já existem em `process.env`.
      useFactory: (): MailProvider => {
        const driver = resolveMailDriver();

        // O provider do `@hyoretsu/providers` lê `MAIL_DRIVER` de `process.env`
        // para montar o transporte; manter o valor resolvido em sincronia.
        process.env.MAIL_DRIVER = driver;

        const MailProviderImplementation = mailProviders[driver];

        return new MailProviderImplementation();
      },
    },
    PrismaService,
    {
      provide: ProjectsRepository,
      useClass: PrismaProjectsRepository,
    },
    ...[
      CreateAttendance,
      CreateCertificate,
      CreateEdition,
      CreateEditionCertificates,
      CreateEvent,
      CreateEventCertificates,
      CreateParticipant,
      CreateParticipation,
      CreateProject,
      CreateSpeaker,
      DeleteEdition,
      DeleteParticipation,
      FindLatestEdition,
      FindParticipant,
      ListAttendees,
      ListCertificates,
      ListEditions,
      ListEvents,
      ListParticipants,
      ListSpeakers,
      UpdateEdition,
      UpdateEvent,
      ValidateCertificate,
    ],
  ],
})
export default class ProjectsModule {}
