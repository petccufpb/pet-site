import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import AdminGuard from "./admin.guard";
import AdminAuthService from "../services/admin-auth.service";

describe("AdminGuard", () => {
  let guard: AdminGuard;
  let adminAuthService: AdminAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminGuard,
        {
          provide: AdminAuthService,
          useValue: {
            getCookieName: jest.fn().mockReturnValue("pet_admin_token"),
            verifyToken: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AdminGuard>(AdminGuard);
    adminAuthService = module.get<AdminAuthService>(AdminAuthService);
  });

  const createMockContext = (cookies: Record<string, string> = {}): ExecutionContext => {
    const req = {
      cookies,
      admin: undefined,
    };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as unknown as ExecutionContext;
  };

  it("should allow request and attach admin payload when valid cookie is provided", () => {
    const mockPayload = { sub: "admin", role: "admin" as const };
    (adminAuthService.verifyToken as jest.Mock).mockReturnValue(mockPayload);

    const ctx = createMockContext({ pet_admin_token: "valid-token" });
    const result = guard.canActivate(ctx);

    expect(result).toBe(true);
    const req = ctx.switchToHttp().getRequest() as { admin?: unknown };
    expect(req.admin).toEqual(mockPayload);
  });

  it("should throw UnauthorizedException when no cookie is present", () => {
    const ctx = createMockContext({});
    expect(() => guard.canActivate(ctx)).toThrow(new UnauthorizedException("Autenticação necessária"));
  });

  it("should throw UnauthorizedException when role is not admin", () => {
    (adminAuthService.verifyToken as jest.Mock).mockReturnValue({ sub: "user", role: "user" });

    const ctx = createMockContext({ pet_admin_token: "user-token" });
    expect(() => guard.canActivate(ctx)).toThrow(new UnauthorizedException("Acesso negado"));
  });

  it("should throw UnauthorizedException when token verification fails", () => {
    (adminAuthService.verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const ctx = createMockContext({ pet_admin_token: "invalid-token" });
    expect(() => guard.canActivate(ctx)).toThrow(new UnauthorizedException("Token inválido ou expirado"));
  });
});
