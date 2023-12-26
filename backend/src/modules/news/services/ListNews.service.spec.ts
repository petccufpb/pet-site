import { HttpException } from "@nestjs/common";
import { News } from "@prisma/client";

import FakeNewsRepository from "../repositories/fakes/news.repository";
import ListNews from "./ListNews.service";

describe("ListNews", () => {
  let news: News;
  let service: ListNews;

  beforeEach(async () => {
    const fakeNewsRepository = new FakeNewsRepository();
    service = new ListNews(fakeNewsRepository);

    news = await fakeNewsRepository.createNews({
      backgroundUrl: "https://fake-site.com/background.png",
      body: "This is just a test.",
      category: "Category",
      title: "Test News 1",
    });
    await fakeNewsRepository.createNews({
      backgroundUrl: "https://fake-site.com/background.png",
      body: "This is another test.",
      category: "Category",
      title: "Test News 2",
    });
  });

  it("should list all news", () => {
    const news = service.execute();

    expect(news).toHaveLength(2);
  });

  it("should show a specific news", () => {
    const foundNews = service.execute(news.id);

    expect(foundNews).toHaveLength(1);
  });

  it("should not show a non-existent news", async () => {
    await expect(service.execute("fake-id")).rejects.toBeInstanceOf(HttpException);
  });
});
