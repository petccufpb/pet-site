import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";

import { PrismaService } from "@database/prisma.service";

import { MembersModule } from "./members.module";
import MembersRepository from "./repositories/MembersRepository";
import { FakeMembersRepository } from "./repositories/fakes/FakeMembersRepository";

describe("Members", () => {
  let app: NestExpressApplication;
  let baseUrl: string;

  const request = async (method: string, url: string, payload?: unknown) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: payload === undefined ? undefined : { "Content-Type": "application/json" },
      body: payload === undefined ? undefined : JSON.stringify(payload),
    });

    const responseBody = await response.json();
    return { statusCode: response.status, json: () => responseBody };
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MembersModule],
    })
      .overrideProvider(MembersRepository)
      .useValue(new FakeMembersRepository())
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication<NestExpressApplication>(new ExpressAdapter());

    await app.init();
    await app.listen(0, "127.0.0.1");
    const address = app.getHttpServer().address();
    if (!address || typeof address === "string") throw new Error("Unable to bind test server");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  it("GET /team/members", async () => {
    const httpResult = await request("GET", "/team/members");

    expect(httpResult.statusCode).toEqual(200);
    expect(httpResult.json()).toEqual([]);
  });

  it("POST /team/members", async () => {
    const name = "John Doe";

    const httpResult = await request("POST", "/team/members", { name });

    expect(httpResult.statusCode).toEqual(201);
    expect(httpResult.json()).toHaveProperty("id");
    expect(httpResult.json()).toHaveProperty("name", name);
  });

  it("PATCH /team/members/:id/status", async () => {
    const created = await request("POST", "/team/members", { name: "Active Member" });
    const { id } = created.json();

    const updated = await request("PATCH", `/team/members/${id}/status`, { isActive: false });

    expect(updated.statusCode).toEqual(200);
    expect(updated.json()).toHaveProperty("isActive", false);
  });

  it("DELETE /team/members/:id soft deletes the member", async () => {
    const created = await request("POST", "/team/members", { name: "Deleted Member" });
    const { id } = created.json();

    const deleted = await request("DELETE", `/team/members/${id}`);
    const listed = await request("GET", "/team/members");

    expect(deleted.statusCode).toEqual(200);
    expect(deleted.json().deletedAt).not.toBeNull();
    expect(listed.json()).not.toContainEqual(expect.objectContaining({ id }));
  });

  it("GET /team/tutors", async () => {
    const httpResult = await request("GET", "/team/tutors");

    expect(httpResult.statusCode).toEqual(200);
    expect(httpResult.json()).toEqual([]);
  });

  afterAll(async () => app.close());
});
