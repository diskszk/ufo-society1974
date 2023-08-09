import { ApiProperty } from "@nestjs/swagger";

export class Song {
  @ApiProperty()
  id: string;

  @ApiProperty()
  lyric: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  wordsRights: string;

  @ApiProperty()
  musicRights: string;
}
