import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import type { StringValue } from "ms";

const COOKIE_NAME = process.env.COOKIE_NAME ?? "pet_admin_token";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";

export interface AdminJwtPayload {
  sub: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

@Injectable()
export default class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  async login(
    username: string,
    password: string,
    ip: string,
  ): Promise<{ token: string; cookieName: string; maxAge: number }> {
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? "8h") as StringValue;

    // Constant-time check: always run bcrypt even on wrong username to avoid timing attacks
    const dummyHash = "$2b$12$invalidhashpadding000000000000000000000000000000000000";
    const hashToCompare = passwordHash ?? dummyHash;

    const passwordMatch = passwordHash ? await bcrypt.compare(password, hashToCompare) : false;
    const usernameMatch = username === ADMIN_USERNAME;

    if (!usernameMatch || !passwordMatch) {
      this.logger.warn(`Failed admin login attempt | username="${username}" | ip=${ip}`);
      throw new HttpException("Credenciais inválidas", HttpStatus.UNAUTHORIZED);
    }

    const payload: AdminJwtPayload = { sub: username, role: "admin" };
    const token = this.jwtService.sign(payload, { expiresIn: jwtExpiresIn });

    // Parse expiresIn to seconds for Max-Age cookie
    const maxAge = parseExpiresIn(jwtExpiresIn);

    this.logger.log(`Admin login success | username="${username}" | ip=${ip}`);

    return { token, cookieName: COOKIE_NAME, maxAge };
  }

  getCookieName(): string {
    return COOKIE_NAME;
  }

  verifyToken(token: string): AdminJwtPayload {
    return this.jwtService.verify<AdminJwtPayload>(token);
  }
}

function parseExpiresIn(expiresIn: string): number {
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return 8 * 60 * 60; // default 8h
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return 8 * 60 * 60;
  }
}
