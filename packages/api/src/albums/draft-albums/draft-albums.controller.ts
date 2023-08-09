import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Album } from "../album.entity";
import { AuthGuard } from "../../auth/auth.guard";
import { role } from "../../constants";
import { Role } from "../../decorators/role.decorator";
import { RoleGuard } from "../../role/role.guard";
import { CreateAlbumDTO, UpdateAlbumDTO } from "../albums.dto";
import { DraftAlbumsService } from "./draft-albums.service";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

// CMSアプリから使う想定
@ApiTags("/draft-albums")
@Controller("draft-albums")
@UseGuards(AuthGuard)
export class DraftAlbumsController {
  constructor(private readonly draftAlbumsService: DraftAlbumsService) {}

  private async checkIsExistAlbum(albumId: string): Promise<void> {
    const isExist = await this.draftAlbumsService.isExist(albumId);
    if (!isExist) {
      throw new NotFoundException("IDと一致するアルバムは存在しません。");
    }
    return;
  }

  @Get()
  @ApiOkResponse({
    type: [Album],
    description: "下書き中のアルバムを全件取得する。",
  })
  async findAllDraftAlbums(): Promise<Album[]> {
    const draftedAlbums = await this.draftAlbumsService.findAll();

    return draftedAlbums;
  }

  @Post()
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({ description: "下書き中のアルバムを新規作成する。" })
  async createDraftAlbum(@Body() album: CreateAlbumDTO) {
    return await this.draftAlbumsService.create(album);
  }

  @Get(":albumId")
  @ApiOkResponse({
    type: Album,
    description: "IDと一致する下書き中のアルバムを1件取得する。",
  })
  @ApiNotFoundResponse({ description: "IDと一致するアルバムは存在しません。" })
  async findDraftAlbumById(@Param("albumId") albumId: string): Promise<Album> {
    const draftAlbum = await this.draftAlbumsService.findById(albumId);

    return draftAlbum;
  }

  @Put(":albumId")
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiNoContentResponse({
    description: "IDと一致する下書き中のアルバムを更新する。",
  })
  @ApiNotFoundResponse({ description: "IDと一致するアルバムは存在しません。" })
  async updateDraftAlbum(
    @Body() album: UpdateAlbumDTO,
    @Param("albumId") albumId: string
  ) {
    await this.checkIsExistAlbum(albumId);
    return await this.draftAlbumsService.update(album);
  }

  @Delete(":albumId")
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiNoContentResponse({
    description: "IDと一致する下書き中のアルバムを削除する。",
  })
  @ApiNotFoundResponse({
    description: "IDと一致するアルバムは存在しません。",
  })
  async deleteDraftAlbum(@Param("albumId") albumId: string) {
    await this.checkIsExistAlbum(albumId);

    return await this.draftAlbumsService.delete(albumId);
  }

  /*
    対象のデータをpublished-albumsに作成し、draft-albumsから削除する
  */
  @Post(":albumId/publish")
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiNoContentResponse({
    description: "IDと一致する下書き中のアルバムを公開中に変更する。",
  })
  @ApiNotFoundResponse({
    description: "IDと一致するアルバムは存在しません。",
  })
  async publishDraftAlbum(@Param("albumId") albumId: string) {
    await this.checkIsExistAlbum(albumId);

    const targetDraftAlbum = await this.draftAlbumsService.findById(albumId);

    try {
      return this.draftAlbumsService.publish({ ...targetDraftAlbum }, albumId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
