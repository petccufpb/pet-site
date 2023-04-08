import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";

import { MembersModule } from "./members.module";
import MembersRepository from "./repositories/MembersRepository";
import { FakeMembersRepository } from "./repositories/fakes/FakeMembersRepository";

describe("Members", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MembersModule],
    })
      .overrideProvider(MembersRepository)
      .useValue(new FakeMembersRepository())
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it("GET /team/members", async () => {
    const httpResult = await app.inject({
      method: "GET",
      url: "/team/members",
    });

    expect(httpResult.statusCode).toEqual(200);
    expect(httpResult.json()).toEqual([]);
  });

  it("POST /team/members", async () => {
    const name = "John Doe";

    const httpResult = await app.inject({
      method: "POST",
      url: "/team/members",
      payload: {
        name,
      },
    });

    expect(httpResult.statusCode).toEqual(201);
    expect(httpResult.json()).toHaveProperty("id");
    expect(httpResult.json()).toHaveProperty("name", name);
  });

  it("GET /team/tutors", async () => {
    const httpResult = await app.inject({
      method: "GET",
      url: "/team/tutors",
    });

    expect(httpResult.statusCode).toEqual(200);
    expect(httpResult.json()).toEqual([]);
  });

  afterAll(async () => app.close());
});
