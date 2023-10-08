import { QueryRequired } from "@hyoretsu/decorators";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query } from "@nestjs/common";

@Controller()
export class MiscController {
  constructor() {}

  @Get("youtube")
  @CacheTTL(1 * 24 * 60 * 60 * 1000) // 1 day
  async getTutors(
    @QueryRequired("route") route: string,
    @Query() params: Record<string, string>,
  ): Promise<any> {
    const paramsArr = Object.entries(params).filter(([key]) => key !== "route");

    const url = `https://youtube.googleapis.com/youtube/v3/${route}?key=${
      process.env.GOOGLE_API_KEY
    }&maxResults=${route === "commentThreads" ? 100 : 50}&order=date&part=snippet${paramsArr.reduce(
      (str, [param, value]) => `${str}&${param}=${value}`,
      "",
    )}`;

    const res = await fetch(url);

    return res.json();
  }
}
