import { Song } from "./song.entity";
import { OmitType } from "@nestjs/swagger";

export class CreateSongDTO extends OmitType(Song, ["id"] as const) {}

export class UpdateSongDTO extends OmitType(Song, [] as const) {}
