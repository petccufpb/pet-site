import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

import AdminLoginDTO from "../dtos/AdminLogin.dto";
import AdminGuard from "../guards/admin.guard";
import AdminLoginRateLimitGuard from "../guards/rate-limit.guard";
import AdminAuthService, { AdminJwtPayload } from "../services/admin-auth.service";

@Controller("auth/admin")
export default class AuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminLoginRateLimitGuard)
  async login(
    @Body() body: AdminLoginDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const ip = (req.ip ?? req.socket?.remoteAddress ?? "unknown").replace(/^::ffff:/, "");
    const { token, cookieName, maxAge } = await this.adminAuthService.login(body.username, body.password, ip);

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAge * 1000, // cookie maxAge is in ms
    });

    return { message: "Login realizado com sucesso" };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    const cookieName = this.adminAuthService.getCookieName();
    res.clearCookie(cookieName, { path: "/" });
    return { message: "Logout realizado com sucesso" };
  }

  @Get("me")
  @UseGuards(AdminGuard)
  me(@Req() req: Request & { admin?: AdminJwtPayload }): { username: string } {
    return { username: req.admin!.sub };
  }
}
