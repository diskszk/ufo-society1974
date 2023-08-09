import { Controller, Get, Put } from "@nestjs/common";
import { AccessCountService } from "./access-count.service";
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from "@nestjs/swagger";

class AccessCountResponse {
  @ApiProperty()
  accessCount: number;
}

@ApiTags("/access/count")
@Controller("access/count")
export class AccessCountController {
  constructor(private readonly accessCountService: AccessCountService) {}

  @Get()
  @ApiOkResponse({
    type: AccessCountResponse,
    description: "現在のアクセス数を取得する。",
  })
  async fetchAccessCount(): Promise<AccessCountResponse> {
    const accessCount = await this.accessCountService.getAccessCount();
    return {
      accessCount,
    };
  }

  @Put("increment")
  @ApiNoContentResponse({
    description: "現在のアクセス数をインクリメントする。",
  })
  async incrementAccessCount(): Promise<void> {
    const currentAccessCount = await this.accessCountService.getAccessCount();

    this.accessCountService.increment(currentAccessCount);
  }
}
