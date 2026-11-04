import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import AdminLoginRateLimitGuard from "./rate-limit.guard";

describe("AdminLoginRateLimitGuard", () => {
  let guard: AdminLoginRateLimitGuard;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminLoginRateLimitGuard],
    }).compile();

    guard = module.get<AdminLoginRateLimitGuard>(AdminLoginRateLimitGuard);

    // O rate limit só é aplicado em produção; os testes precisam simular esse ambiente
    process.env.NODE_ENV = "production";
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
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

  it("should allow login attempts under the limit", () => {
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

    expect(() => guard.canActivate(ctx)).toThrow(HttpException);
    try {
      guard.canActivate(ctx);
    } catch (err) {
      const httpException = err as HttpException;
      expect(httpException.getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS);
    }
  });

  it("should not limit requests outside production", () => {
    process.env.NODE_ENV = "test";

    const ctx = createMockContext("192.168.1.3");
    for (let i = 0; i < 30; i++) {
      expect(guard.canActivate(ctx)).toBe(true);
    }
  });
});
