import { ApiProperty } from "@nestjs/swagger";

export class Album {
  @ApiProperty()
  id: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  publishedDate: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  published: boolean;
}
