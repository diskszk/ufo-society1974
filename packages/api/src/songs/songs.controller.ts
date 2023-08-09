import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { role } from "../constants";
import { Role } from "../decorators/role.decorator";
import { RoleGuard } from "../role/role.guard";
import { CreateSongDTO, UpdateSongDTO } from "./songs.dto";
import { SongsService } from "./songs.service";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Song } from "./song.entity";

@ApiTags("/albums/:albumId/songs")
@Controller("albums/:albumId/songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  private async checkIsExistAlbum(albumId: string) {
    const result = await this.songsService.findIsAlbumExists(albumId);

    if (!result) {
      throw new NotFoundException("IDと一致するアルバムは存在しません。");
    }
    return;
  }

  @Post()
  @UseGuards(AuthGuard)
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({ description: "楽曲を新規作成する。" })
  async createSong(
    @Param("albumId") albumId: string,
    @Body() song: CreateSongDTO
  ) {
    await this.checkIsExistAlbum(albumId);

    return this.songsService.create(albumId, song);
  }

  // 認証・認可が不要
  @Get(":songId")
  @ApiOkResponse({
    type: Song,
    description: "IDと一致する楽曲を1件取得する",
  })
  @ApiNotFoundResponse({
    description: "IDと一致する楽曲は存在しません。",
  })
  async getSongById(
    @Param("albumId") albumId: string,
    @Param("songId") songId: string
  ): Promise<Song> {
    await this.checkIsExistAlbum(albumId);

    const song = await this.songsService.findSongById(albumId, songId);

    if (!song) {
      throw new NotFoundException("IDと一致する楽曲は存在しません。");
    }

    return song;
  }

  @Delete(":songId")
  @UseGuards(AuthGuard)
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({
    description: "IDと一致する楽曲は存在しません。",
  })
  async deleteSong(
    @Param("albumId") albumId: string,
    @Param("songId") songId: string
  ) {
    await this.checkIsExistAlbum(albumId);

    const song = await this.songsService.findSongById(albumId, songId);

    if (!song) {
      throw new NotFoundException("IDと一致する楽曲は存在しません。");
    }

    return await this.deleteSong(albumId, songId);
  }

  @Put(":songId")
  @UseGuards(AuthGuard)
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({
    description: "IDと一致する楽曲は存在しません。",
  })
  async updateSong(
    @Param("albumId") albumId: string,
    @Param("songId") songId: string,
    @Body() song: UpdateSongDTO
  ) {
    return;
  }
}
