import { QueryRequired } from "@hyoretsu/decorators";
import { CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class MiscController {
  constructor() {}

  @Get("youtube")
  @CacheTTL(1 * 24 * 60 * 60 * 1000) // 1 day
  async getTutors(@QueryRequired() route: string): Promise<any> {
    const url = `https://youtube.googleapis.com/youtube/v3/${route}?channelId=UCiWvbXdPvthDcEVTKVpfqqQ&key=${process.env.GOOGLE_API_KEY}&order=date&part=snippet`;

    const res = await fetch(url);

    return res.json();
  }
}
