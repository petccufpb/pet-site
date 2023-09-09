import { Injectable } from "@nestjs/common";
import { News } from "@prisma/client";

import CreateNewsDTO from "../dtos/CreateNews.dto";
import NewsRepository from "../repositories/news.repository";

@Injectable()
export default class CreateNews {
  constructor(private newsRepository: NewsRepository) {}

  public async execute(data: CreateNewsDTO): Promise<News> {
    const news = await this.newsRepository.createNews(data);

    return news;
  }
}
