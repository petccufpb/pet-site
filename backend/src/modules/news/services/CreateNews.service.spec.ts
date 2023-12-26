import FakeNewsRepository from "../repositories/fakes/news.repository";
import CreateNews from "./CreateNews.service";

describe("CreateNews", () => {
  let service: CreateNews;

  beforeEach(async () => {
    const fakeNewsRepository = new FakeNewsRepository();
    service = new CreateNews(fakeNewsRepository);
  });

  it("should create news", async () => {
    const news = await service.execute({
      backgroundUrl: "https://fake-site.com/background.png",
      body: "This is just a test.",
      category: "Category",
      title: "Test News",
    });

    expect(news).toHaveProperty("id");
  });
});
