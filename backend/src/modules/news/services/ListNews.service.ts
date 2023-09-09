import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { News } from "@prisma/client";

import NewsRepository from "../repositories/news.repository";

@Injectable()
export default class ListNews {
  constructor(private newsRepository: NewsRepository) {}

  public async execute(newsId?: string): Promise<News[]> {
    let news: News[] = [];

    if (newsId) {
      const existingNews = await this.newsRepository.findById(newsId);
      if (!existingNews) {
        throw new HttpException("Essa notícia não foi encontrada.", HttpStatus.NOT_FOUND);
      }

      news.push(existingNews);
    } else {
      news = await this.newsRepository.findAllNews();
    }

    return news;
  }
}
