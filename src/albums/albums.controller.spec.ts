import { Test, TestingModule } from "@nestjs/testing";
import { AlbumsService } from "./albums.service";
import { mockData } from "../mock";
import { AlbumsController } from "./albums.controller";
import { SongSummary } from "../types";
import { SongsService } from "../songs/songs.service";
import { CreateAlbumDTO, UpdateAlbumDTO } from "./albums.dto";
import { DraftAlbumsService } from "../draft-albums/draft-albums.service";

export class DummyAlbumsService {
  async isExist(id: string): Promise<boolean> {
    return mockData.albums.find((album) => album.id === id) ? true : false;
  }

  async findAll() {
    return mockData.albums;
  }

  async findById(id: string) {
    const album = mockData.albums.find((album) => album.id === id) || null;
    return album;
  }

  async create(
    albumDTO: CreateAlbumDTO
  ): Promise<FirebaseFirestore.DocumentReference<CreateAlbumDTO>> {
    return null;
  }

  async update(
    albumDTO: UpdateAlbumDTO
  ): Promise<FirebaseFirestore.WriteResult> {
    return null;
  }

  async delete(albumId: string): Promise<FirebaseFirestore.WriteResult> {
    return null;
  }
}

export class DummySongsService {
  async findAllSongSummariesByAlbumId(albumId: string) {
    const songSummaries: SongSummary[] = [...mockData.songs];
    return songSummaries;
  }
}

class DummyDraftAlbumsService {
  async findById(id: string) {
    return mockData.albums.find((album) => album.id === id) || null;
  }

  async create(
    albumDTO: CreateAlbumDTO
  ): Promise<FirebaseFirestore.DocumentReference<CreateAlbumDTO>> {
    return null;
  }
}

describe("AlbumsController", () => {
  let albumsController: AlbumsController;
  let albumsService: AlbumsService;
  let songsService: SongsService;
  let draftAlbumsService: DraftAlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AlbumsService, SongsService, DraftAlbumsService],
    })
      .overrideProvider(AlbumsService)
      .useClass(DummyAlbumsService)
      .overrideProvider(SongsService)
      .useClass(DummySongsService)
      .overrideProvider(DraftAlbumsService)
      .useClass(DummyDraftAlbumsService)
      .compile();

    albumsService = module.get<AlbumsService>(AlbumsService);
    songsService = module.get<SongsService>(SongsService);
    draftAlbumsService = module.get<DraftAlbumsService>(DraftAlbumsService);

    albumsController = new AlbumsController(
      albumsService,
      songsService,
      draftAlbumsService
    );
  });

  it("should be defined", () => {
    expect(albumsController).toBeDefined();
  });

  describe("findAllPublishedAlbums", () => {
    it("公開済みのアルバムを全件取得する", async () => {
      const { albums } = await albumsController.findAllPublishedAlbums();
      expect(albums).toHaveLength(3);
    });
  });

  describe("findAlbumAndSummary", () => {
    it("IDと一致するアルバムが存在する場合、該当するアルバムと楽曲の概要を返す", async () => {
      const response = await albumsController.findAlbumAndSummary("sample01");

      const album = response.albums[0];
      const info = response.info;
      expect(album.id).toBe("sample01");
      expect(info.songSummaries).toHaveLength(2);
    });

    it("IDと一致するアルバムが存在しない場合、エラーを発生させること", async () => {
      await expect(
        albumsController.findAlbumAndSummary("test999")
      ).rejects.toThrow(/IDと一致するアルバムは存在しません。/);
    });
  });

  describe("findPublishedAlbumById", () => {
    it("IDと一致するアルバムが存在しない場合、エラーを発生させること", async () => {
      await expect(
        albumsController.findPublishedAlbumById("test999")
      ).rejects.toThrow(/IDと一致するアルバムは存在しません。/);
    });
  });
});
