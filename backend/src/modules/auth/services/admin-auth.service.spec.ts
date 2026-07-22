import { HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

import AdminAuthService from "./admin-auth.service";

describe("AdminAuthService", () => {
  let service: AdminAuthService;
  let jwtService: JwtService;

  const VALID_PASSWORD = "my-secret-password";
  let passwordHash: string;

  beforeAll(async () => {
    passwordHash = await bcrypt.hash(VALID_PASSWORD, 12);
  });

  beforeEach(async () => {
    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD_HASH = passwordHash;
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "8h";

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminAuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue("mocked.jwt.token"),
            verify: jest.fn().mockReturnValue({ sub: "admin", role: "admin" }),
          },
        },
      ],
    }).compile();

    service = module.get<AdminAuthService>(AdminAuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.ADMIN_PASSWORD_HASH;
  });

  describe("login", () => {
    it("should return a token when credentials are correct", async () => {
      const result = await service.login("admin", VALID_PASSWORD, "127.0.0.1");

      expect(result.token).toBe("mocked.jwt.token");
      expect(result.cookieName).toBe("pet_admin_token");
      expect(result.maxAge).toBeGreaterThan(0);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: "admin", role: "admin" }, { expiresIn: "8h" });
    });

    it("should throw 401 when password is wrong", async () => {
      await expect(service.login("admin", "wrong-password", "127.0.0.1")).rejects.toThrow(
        new HttpException("Credenciais inválidas", 401),
      );
    });

    it("should throw 401 when username is wrong", async () => {
      await expect(service.login("wrong-user", VALID_PASSWORD, "127.0.0.1")).rejects.toThrow(
        new HttpException("Credenciais inválidas", 401),
      );
    });

    it("should throw 401 when ADMIN_PASSWORD_HASH is not set", async () => {
      delete process.env.ADMIN_PASSWORD_HASH;
      await expect(service.login("admin", VALID_PASSWORD, "127.0.0.1")).rejects.toThrow(
        new HttpException("Credenciais inválidas", 401),
      );
    });
  });

  describe("verifyToken", () => {
    it("should return payload when token is valid", () => {
      const payload = service.verifyToken("valid.token");
      expect(payload).toEqual({ sub: "admin", role: "admin" });
    });

    it("should throw when token is invalid", () => {
      (jwtService.verify as jest.Mock).mockImplementation(() => {
        throw new Error("invalid signature");
      });
      expect(() => service.verifyToken("bad.token")).toThrow();
    });
  });

  describe("getCookieName", () => {
    it("should return the cookie name from env or default", () => {
      expect(service.getCookieName()).toBe("pet_admin_token");
    });
  });
});
