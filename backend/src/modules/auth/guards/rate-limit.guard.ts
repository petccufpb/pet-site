import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Request } from "express";

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

@Injectable()
export default class AdminLoginRateLimitGuard implements CanActivate {
  private readonly logger = new Logger(AdminLoginRateLimitGuard.name);
  private readonly store = new Map<string, RateLimitEntry>();

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request>();
    const ip = (req.ip ?? req.socket?.remoteAddress ?? "unknown").replace(/^::ffff:/, "");

    const now = Date.now();
    const entry = this.store.get(ip);

    if (!entry || now - entry.windowStart >= WINDOW_MS) {
      // New window
      this.store.set(ip, { count: 1, windowStart: now });
      return true;
    }

    entry.count += 1;

    if (entry.count > MAX_ATTEMPTS) {
      const retryAfterSec = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
      this.logger.warn(`Rate limit reached | ip=${ip} | count=${entry.count}`);
      throw new HttpException(
        { message: "Muitas tentativas de login. Tente novamente mais tarde.", retryAfter: retryAfterSec },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
