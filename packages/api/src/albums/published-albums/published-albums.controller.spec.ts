import { Test, TestingModule } from "@nestjs/testing";
import { PublishedAlbumsService } from "./published-albums.service";
import { mockData } from "../../mock";
import { PublishedAlbumsController } from "./published-albums.controller";
import { SongSummary } from "../../types";
import { SongsService } from "../../songs/songs.service";
import { CreateAlbumDTO, UpdateAlbumDTO } from "../albums.dto";
import { PublishedAlbumsModule } from "./published-albums.module";

export class DummyPublishedAlbumsService {
  async isExist(id: string): Promise<boolean> {
    return Boolean(mockData.publishedAlbums.find((album) => album.id === id));
  }

  async findAll() {
    return mockData.publishedAlbums;
  }

  async findById(id: string) {
    const album =
      mockData.publishedAlbums.find((album) => album.id === id) || null;
    return album;
  }

  async create(
    _albumDTO: CreateAlbumDTO
  ): Promise<FirebaseFirestore.DocumentReference<CreateAlbumDTO>> {
    return null;
  }

  async update(
    _albumDTO: UpdateAlbumDTO
  ): Promise<FirebaseFirestore.WriteResult> {
    return null;
  }

  async delete(_albumId: string): Promise<FirebaseFirestore.WriteResult> {
    return null;
  }
}

export class DummySongsService {
  async findAllSongSummariesByAlbumId(_albumId: string) {
    const songSummaries: SongSummary[] = [...mockData.songs];
    return songSummaries;
  }
}

// TODO: 依存関係を整理する
describe.skip("PublishedAlbumsController", () => {
  let publishedAlbumsController: PublishedAlbumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PublishedAlbumsModule],
    })
      .overrideProvider(PublishedAlbumsService)
      .useClass(DummyPublishedAlbumsService)
      .overrideProvider(SongsService)
      .useClass(DummySongsService)
      .compile();

    publishedAlbumsController = module.get<PublishedAlbumsController>(
      PublishedAlbumsController
    );
  });

  it.only("should be defined", () => {
    expect(publishedAlbumsController).toBeDefined();
  });

  describe("findAllPublishedAlbums", () => {
    it("公開済みのアルバムを全件取得する", async () => {
      const { albums } =
        await publishedAlbumsController.findAllPublishedAlbums();
      expect(albums).toHaveLength(1);
    });
  });

  describe("findAlbumAndSummary", () => {
    it("IDと一致するアルバムが存在する場合、該当するアルバムと楽曲の概要を返す", async () => {
      const response = await publishedAlbumsController.findAlbumAndSummary(
        "published01"
      );

      const album = response.albums[0];
      const info = response.info;
      expect(album.id).toBe("published01");
      expect(info.songSummaries).toHaveLength(2);
    });

    it("IDと一致するアルバムが存在しない場合、エラーを発生させること", async () => {
      await expect(
        publishedAlbumsController.findAlbumAndSummary("test999")
      ).rejects.toThrow(/IDと一致するアルバムは存在しません。/);
    });
  });

  describe("findPublishedAlbumById", () => {
    it("IDと一致するアルバムが存在しない場合、エラーを発生させること", async () => {
      await expect(
        publishedAlbumsController.findPublishedAlbumById("test999")
      ).rejects.toThrow(/IDと一致するアルバムは存在しません。/);
    });
  });
});
