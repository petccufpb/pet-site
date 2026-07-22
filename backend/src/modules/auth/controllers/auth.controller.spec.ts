import { Test, TestingModule } from "@nestjs/testing";
import { Request, Response } from "express";

import AuthController from "./auth.controller";
import AdminGuard from "../guards/admin.guard";
import AdminLoginRateLimitGuard from "../guards/rate-limit.guard";
import AdminAuthService from "../services/admin-auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  let adminAuthService: AdminAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AdminAuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({
              token: "mocked.jwt.token",
              cookieName: "pet_admin_token",
              maxAge: 28800,
            }),
            getCookieName: jest.fn().mockReturnValue("pet_admin_token"),
          },
        },
      ],
    })
      .overrideGuard(AdminLoginRateLimitGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    adminAuthService = module.get<AdminAuthService>(AdminAuthService);
  });

  describe("login", () => {
    it("should set HttpOnly cookie and return success message", async () => {
      const mockReq = { ip: "127.0.0.1" } as Request;
      const mockRes = { cookie: jest.fn() } as unknown as Response;

      const result = await controller.login({ username: "admin", password: "password" }, mockReq, mockRes);

      expect(result).toEqual({ message: "Login realizado com sucesso" });
      expect(adminAuthService.login).toHaveBeenCalledWith("admin", "password", "127.0.0.1");
      expect(mockRes.cookie).toHaveBeenCalledWith("pet_admin_token", "mocked.jwt.token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 28800000,
      });
    });
  });

  describe("logout", () => {
    it("should clear cookie and return success message", () => {
      const mockRes = { clearCookie: jest.fn() } as unknown as Response;

      const result = controller.logout(mockRes);

      expect(result).toEqual({ message: "Logout realizado com sucesso" });
      expect(mockRes.clearCookie).toHaveBeenCalledWith("pet_admin_token", { path: "/" });
    });
  });

  describe("me", () => {
    it("should return username from authenticated request", () => {
      const mockReq = { admin: { sub: "admin", role: "admin" as const } } as Request & {
        admin?: { sub: string; role: "admin" };
      };

      const result = controller.me(mockReq);

      expect(result).toEqual({ username: "admin" });
    });
  });
});
