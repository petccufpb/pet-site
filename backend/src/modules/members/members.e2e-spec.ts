import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as cookieParser from "cookie-parser";
import { AddressInfo } from "net";

import { PrismaService } from "@database/prisma.service";
import AdminAuthService from "@modules/auth/services/admin-auth.service";

import { MembersModule } from "./members.module";
import MembersRepository from "./repositories/MembersRepository";
import { FakeMembersRepository } from "./repositories/fakes/FakeMembersRepository";

describe("Members", () => {
  let app: INestApplication;
  let baseUrl: string;
  let adminCookie: string;

  const request = async (method: string, url: string, payload?: unknown, authenticated = false) => {
    const headers: Record<string, string> = {};
    if (payload !== undefined) headers["Content-Type"] = "application/json";
    if (authenticated && adminCookie) headers.cookie = adminCookie;

    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
      body: payload === undefined ? undefined : JSON.stringify(payload),
    });

    const responseBody = await response.json();
    return { statusCode: response.status, json: () => responseBody };
  };

  beforeAll(async () => {
    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "e2e-password";
    process.env.JWT_SECRET = "e2e-secret";

    const moduleRef = await Test.createTestingModule({
      imports: [MembersModule],
    })
      .overrideProvider(MembersRepository)
      .useValue(new FakeMembersRepository())
      // O banco de dados não é necessário: o repositório é substituído por uma implementação em memória
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.listen(0, "127.0.0.1");

    const { port } = app.getHttpServer().address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${port}`;

    const adminAuthService = app.get(AdminAuthService);
    const { token, cookieName } = await adminAuthService.login("admin", "e2e-password", "127.0.0.1");
    adminCookie = `${cookieName}=${token}`;
  });

  it("GET /team/members", async () => {
    const response = await fetch(`${baseUrl}/team/members`);

    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual([]);
  });

  it("POST /team/members should require admin authentication", async () => {
    const response = await fetch(`${baseUrl}/team/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "John Doe" }),
    });

    expect(response.status).toEqual(401);
  });

  it("POST /team/members", async () => {
    const name = "John Doe";

    const response = await fetch(`${baseUrl}/team/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: adminCookie,
      },
      body: JSON.stringify({ name }),
    });

    expect(response.status).toEqual(201);
    const createdMember = await response.json();
    expect(createdMember).toHaveProperty("id");
    expect(createdMember).toHaveProperty("name", name);
  });

  it("PATCH /team/members/:id should require admin authentication", async () => {
    const response = await fetch(`${baseUrl}/team/members/some-id`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Name" }),
    });

    expect(response.status).toEqual(401);
  });

  it("PATCH /team/members/:id", async () => {
    const createdResponse = await fetch(`${baseUrl}/team/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: adminCookie,
      },
      body: JSON.stringify({ name: "Mary Doe" }),
    });

    const { id: memberId } = (await createdResponse.json()) as { id: string };

    const response = await fetch(`${baseUrl}/team/members/${memberId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: adminCookie,
      },
      body: JSON.stringify({ name: "Mary Doe Updated", isActive: false }),
    });

    expect(response.status).toEqual(200);
    const updatedMember = await response.json();
    expect(updatedMember).toHaveProperty("id", memberId);
    expect(updatedMember).toHaveProperty("name", "Mary Doe Updated");
    expect(updatedMember).toHaveProperty("isActive", false);
  });

  it("PATCH /team/members/:id/status should require admin authentication", async () => {
    const response = await request("PATCH", "/team/members/some-id/status", { isActive: false }, false);
    expect(response.statusCode).toEqual(401);
  });

  it("PATCH /team/members/:id/status", async () => {
    const created = await request("POST", "/team/members", { name: "Active Member" }, true);
    const { id } = created.json();

    const updated = await request("PATCH", `/team/members/${id}/status`, { isActive: false }, true);

    expect(updated.statusCode).toEqual(200);
    expect(updated.json()).toHaveProperty("isActive", false);
  });

  it("DELETE /team/members/:id should require admin authentication", async () => {
    const response = await request("DELETE", "/team/members/some-id", undefined, false);
    expect(response.statusCode).toEqual(401);
  });

  it("DELETE /team/members/:id soft deletes the member", async () => {
    const created = await request("POST", "/team/members", { name: "Deleted Member" }, true);
    const { id } = created.json();

    const deleted = await request("DELETE", `/team/members/${id}`, undefined, true);
    const listed = await request("GET", "/team/members");

    expect(deleted.statusCode).toEqual(200);
    expect(deleted.json().deletedAt).not.toBeNull();
    expect(listed.json()).not.toContainEqual(expect.objectContaining({ id }));
  });

  it("GET /team/tutors", async () => {
    const response = await fetch(`${baseUrl}/team/tutors`);

    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual([]);
  });

  afterAll(async () => {
    delete process.env.ADMIN_USERNAME;
    delete process.env.ADMIN_PASSWORD;
    delete process.env.JWT_SECRET;

    await app.close();
  });
});
