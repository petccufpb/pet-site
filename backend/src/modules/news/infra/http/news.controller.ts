import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { News } from "@prisma/client";

import AdminGuard from "@modules/auth/guards/admin.guard";
import CreateNewsDTO from "@modules/news/dtos/CreateNews.dto";
import CreateNews from "@modules/news/services/CreateNews.service";
import ListNews from "@modules/news/services/ListNews.service";

@Controller("news")
export default class NewsController {
  constructor(private createNews: CreateNews, private listNews: ListNews) {}

  @Get()
  async getNews(@Query() id?: string): Promise<News[]> {
    const news = await this.listNews.execute(id);

    return news;
  }

  @Post()
  @UseGuards(AdminGuard)
  async postNews(@Body() body: CreateNewsDTO): Promise<News> {
    const news = await this.createNews.execute(body);

    return news;
  }
}
