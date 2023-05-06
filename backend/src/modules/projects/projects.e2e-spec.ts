import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";

import { ProjectsModule } from "./projects.module";
import { FakeProjectsRepository } from "./repositories/fakes/projects.repository";
import { ProjectsRepository } from "./repositories/projects.repository";

describe("Projects", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProjectsModule],
    })
      .overrideProvider(ProjectsRepository)
      .useValue(new FakeProjectsRepository())
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it("POST /projects - 201", async () => {
    const title = "Test";

    const httpResult = await app.inject({
      method: "POST",
      url: "/projects",
      payload: {
        title,
      },
    });

    expect(httpResult.statusCode).toEqual(201);
    expect(httpResult.json()).toHaveProperty("id");
    expect(httpResult.json()).toHaveProperty("title", title);
  });

  afterAll(async () => app.close());
});
