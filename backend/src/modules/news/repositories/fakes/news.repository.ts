import { News } from "@prisma/client";
import { randomUUID } from "crypto";

import CreateNewsDTO from "@modules/news/dtos/CreateNews.dto";

import NewsRepository from "../news.repository";

export default class FakeNewsRepository implements NewsRepository {
  private news: News[] = [];

  public async createNews({ backgroundUrl, category, ...data }: CreateNewsDTO) {
    const news = {
      ...data,
      backgroundUrl: backgroundUrl || null,
      category: category || null,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.news.push(news);

    return news;
  }
}
