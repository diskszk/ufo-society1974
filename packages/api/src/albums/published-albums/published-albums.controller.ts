import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Album } from "../album.entity";
import { PublishedAlbumsService } from "./published-albums.service";
import { UpdateAlbumDTO } from "../albums.dto";
import { AuthGuard } from "../../auth/auth.guard";
import { Role } from "../../decorators/role.decorator";
import { role } from "../../constants";
import { RoleGuard } from "../../role/role.guard";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

/* TODO: webpageからアクセスできるようCORSを設定する */
@ApiTags("/albums")
@Controller("albums")
export class PublishedAlbumsController {
  constructor(
    private readonly publishedAlbumsService: PublishedAlbumsService
  ) {}

  private async checkIsExistAlbum(albumId: string): Promise<void> {
    const isExist = await this.publishedAlbumsService.isExist(albumId);

    if (!isExist) {
      throw new NotFoundException("IDと一致するアルバムは存在しません。");
    }
    return;
  }

  @Get()
  @ApiOkResponse({
    type: [Album],
    description: "公開中のアルバムを全件取得する。",
  })
  async findAllPublishedAlbums(): Promise<Album[]> {
    const albums = await this.publishedAlbumsService.findAll();

    return albums;
  }

  @Get(":albumId")
  @ApiOkResponse({
    type: Album,
    description: "IDと一致する公開中のアルバムを1件取得する。",
  })
  @ApiNotFoundResponse({
    description: "IDと一致するアルバムは存在しません。",
  })
  async findPublishedAlbumById(
    @Param("albumId") albumId: string
  ): Promise<Album> {
    await this.checkIsExistAlbum(albumId);

    const album = await this.publishedAlbumsService.findById(albumId);

    return album;
  }

  // adminアプリからのみ使用する
  @Put(":albumId")
  @UseGuards(AuthGuard)
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiNoContentResponse({
    description: "IDと一致する公開中のアルバムを変更する。",
  })
  @ApiNotFoundResponse({
    description: "IDと一致するアルバムは存在しません。",
  })
  async updatePublishedAlbum(
    @Body() album: UpdateAlbumDTO,
    @Param("albumId") albumId: string
  ) {
    await this.checkIsExistAlbum(albumId);

    return await this.publishedAlbumsService.update(album);
  }

  // adminアプリからのみ使用する
  /*
    対象のデータをdraft-albumsに作成し、published-albumsから削除する
  */
  @Post(":albumId/unpublish")
  @UseGuards(AuthGuard)
  @Role(role.EDITOR)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({
    description: "IDと一致する公開中のアルバムを下書き中に変更する。",
  })
  @ApiNotFoundResponse({
    description: "IDと一致するアルバムは存在しません。",
  })
  async unpublishAlbum(@Param("albumId") albumId: string) {
    await this.checkIsExistAlbum(albumId);

    const targetPublishedAlbum = await this.publishedAlbumsService.findById(
      albumId
    );

    try {
      return this.publishedAlbumsService.unpublish(
        { ...targetPublishedAlbum },
        albumId
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
