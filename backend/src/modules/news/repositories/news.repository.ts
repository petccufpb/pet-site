import { News } from "@prisma/client";

import CreateNewsDTO from "@modules/news/dtos/CreateNews.dto";

export default abstract class NewsRepository {
  abstract createNews(data: CreateNewsDTO): Promise<News>;
}
