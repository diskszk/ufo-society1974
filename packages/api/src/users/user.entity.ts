import { ApiProperty } from "@nestjs/swagger";
import { RoleType } from "../types";

export class User {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: RoleType;

  @ApiProperty()
  username: string;

  @ApiProperty()
  isDeleted: boolean;
}
