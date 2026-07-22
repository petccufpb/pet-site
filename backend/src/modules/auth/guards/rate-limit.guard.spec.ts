import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import AdminLoginRateLimitGuard from "./rate-limit.guard";

describe("AdminLoginRateLimitGuard", () => {
  let guard: AdminLoginRateLimitGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminLoginRateLimitGuard],
    }).compile();

    guard = module.get<AdminLoginRateLimitGuard>(AdminLoginRateLimitGuard);
  });

  const createMockContext = (ip = "127.0.0.1"): ExecutionContext => {
    const req = {
      ip,
      socket: { remoteAddress: ip },
    };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as unknown as ExecutionContext;
  };

  it("should allow initial login attempts under limit", () => {
    const ctx = createMockContext("192.168.1.1");
    for (let i = 0; i < 10; i++) {
      expect(guard.canActivate(ctx)).toBe(true);
    }
  });

  it("should throw TOO_MANY_REQUESTS when limit of 10 attempts is exceeded", () => {
    const ctx = createMockContext("192.168.1.2");
    for (let i = 0; i < 10; i++) {
      guard.canActivate(ctx);
    }

    expect(() => guard.canActivate(ctx)).toThrow(
      new HttpException(
        { message: "Muitas tentativas de login. Tente novamente mais tarde.", retryAfter: expect.any(Number) },
        HttpStatus.TOO_MANY_REQUESTS,
      ),
    );
  });
});
