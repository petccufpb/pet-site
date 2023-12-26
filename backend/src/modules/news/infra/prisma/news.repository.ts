import { News } from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
import CreateNewsDTO from "@modules/news/dtos/CreateNews.dto";
import NewsRepository from "@modules/news/repositories/news.repository";

export default class PrismaNewsRepository implements NewsRepository {
  constructor(private prisma: PrismaService) {}

  public async createNews(data: CreateNewsDTO): Promise<News> {
    const news = await this.prisma.news.create({
      data,
    });

    return news;
  }

  public async findAllNews(): Promise<News[]> {
    const news = await this.prisma.news.findMany();

    return news;
  }

  public async findById(id: string): Promise<News | null> {
    const news = await this.prisma.news.findUnique({
      where: {
        id,
      },
    });

    return news;
  }
}
