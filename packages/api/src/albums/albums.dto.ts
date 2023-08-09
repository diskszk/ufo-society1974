import { Album } from "./album.entity";
import { OmitType } from "@nestjs/swagger";

// クライアントから受け取るデータの型チェックを行う
// idはfirestoreで生成するため含めない
export class CreateAlbumDTO extends OmitType(Album, [
  "id",
  "published",
] as const) {}

export class UpdateAlbumDTO extends OmitType(Album, ["published"] as const) {}
