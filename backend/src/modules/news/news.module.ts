import { MailProvider, MailProviderKeys, mailProviders } from "@hyoretsu/providers";
import { Module } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";

import NewsController from "./infra/http/news.controller";
import PrismaNewsRepository from "./infra/prisma/news.repository";
import NewsRepository from "./repositories/news.repository";
import CreateNews from "./services/CreateNews.service";
import ListNews from "./services/ListNews.service";

@Module({
  controllers: [NewsController],
  providers: [
    PrismaService,
    {
      provide: NewsRepository,
      useClass: PrismaNewsRepository,
    },
    ...[CreateNews, ListNews],
  ],
})
export default class NewsModule {}
