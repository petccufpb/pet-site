import { Body, Controller, Post } from "@nestjs/common";
import { News } from "@prisma/client";

import CreateNewsDTO from "@modules/news/dtos/CreateNews.dto";
import CreateNews from "@modules/news/services/CreateNews.service";

@Controller("projects")
export default class NewsController {
  constructor(private createNews: CreateNews) {}

  @Post()
  async postProjects(@Body() body: CreateNewsDTO): Promise<News> {
    const project = await this.createNews.execute(body);

    return project;
  }
}
