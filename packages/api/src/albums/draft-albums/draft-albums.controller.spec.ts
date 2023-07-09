import { Test, TestingModule } from "@nestjs/testing";
import { CreateAlbumDTO, UpdateAlbumDTO } from "../albums.dto";
import { mockData } from "../../mock";
import { DraftAlbumsController } from "./draft-albums.controller";
import { DraftAlbumsService } from "./draft-albums.service";
import { DraftAlbumsModule } from "./draft-albums.module";

class DummyDraftAlbumsService {
  async isExist(id: string): Promise<boolean> {
    return mockData.draftAlbums.find((album) => album.id === id) ? true : false;
  }

  async findAll() {
    return mockData.draftAlbums;
  }

  async findById(id: string) {
    return mockData.draftAlbums.find((album) => album.id === id) || null;
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

describe("DraftAlbumsController", () => {
  let draftAlbumsController: DraftAlbumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DraftAlbumsModule],
    })
      .overrideProvider(DraftAlbumsService)
      .useClass(DummyDraftAlbumsService)
      .compile();

    draftAlbumsController = module.get<DraftAlbumsController>(
      DraftAlbumsController
    );
  });

  it("should be defined", () => {
    expect(draftAlbumsController).toBeDefined();
  });

  describe("findAllDraftAlbums", () => {
    it("下書きのアルバムを全件取得する", async () => {
      const { albums } = await draftAlbumsController.findAllDraftAlbums();
      expect(albums).toHaveLength(3);
    });
  });

  describe("findDraftAlbumById", () => {
    it("IDと一致するアルバムが存在する場合、該当するアルバムを返す", async () => {
      const response = await draftAlbumsController.findDraftAlbumById(
        "sample01"
      );
      const draftAlbum = response.albums[0];
      expect(draftAlbum.id).toBe("sample01");
      expect(draftAlbum.title).toBe("test title 1");
    });
  });

  describe("updateDraftAlbum", () => {
    it("IDと一致するアルバムが存在しない場合、エラーを発生させること", async () => {
      await expect(
        // TODO: updateに直す
        draftAlbumsController.deleteDraftAlbum("test999")
      ).rejects.toThrow(/IDと一致するアルバムは存在しません。/);
    });
  });

  describe("deleteDraftAlbum", () => {
    it("IDと一致するアルバムが存在しない場合、エラーを発生させること", async () => {
      await expect(
        draftAlbumsController.deleteDraftAlbum("test999")
      ).rejects.toThrow(/IDと一致するアルバムは存在しません。/);
    });
  });

  describe("publishDraftAlbum", () => {
    it("IDと一致するアルバムが存在しない場合、エラーを発生させること", async () => {
      await expect(
        draftAlbumsController.publishDraftAlbum("test999")
      ).rejects.toThrow(/IDと一致するアルバムは存在しません。/);
    });
  });
});
